import { createSign } from "node:crypto";

const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_API_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const REQUEST_TIMEOUT_MS = 10_000;
const CONTACT_SHEET_HEADERS = [
  "submittedAt",
  "name",
  "email",
  "company",
  "reason",
  "subject",
  "message",
  "path",
] as const;

type ContactRow = {
  company: string;
  email: string;
  message: string;
  name: string;
  path: string;
  reason: string;
  subject: string;
  submittedAt: string;
};

type GoogleSheetsConfig = {
  serviceAccountEmail: string;
  serviceAccountPrivateKey: string;
  sheetId: string;
  sheetName: string;
};

const toBase64Url = (value: string | Uint8Array) =>
  Buffer.from(value)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");

const fetchWithTimeout = async (input: string, init: RequestInit = {}) => {
  try {
    return await fetch(input, {
      ...init,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Google Sheets request failed. ${error.message}`);
    }

    throw error;
  }
};

const encodeSheetRange = (sheetName: string, range: string) =>
  encodeURIComponent(`${sheetName}!${range}`);

const getGoogleSheetsConfig = (config?: {
  serviceAccountEmail?: string;
  serviceAccountPrivateKey?: string;
  sheetId?: string;
  sheetName?: string;
}): GoogleSheetsConfig => {
  const serviceAccountEmail =
    config?.serviceAccountEmail ?? import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountPrivateKey =
    config?.serviceAccountPrivateKey ?? import.meta.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const sheetId = config?.sheetId ?? import.meta.env.GOOGLE_SHEET_ID;
  const sheetName = config?.sheetName ?? import.meta.env.GOOGLE_SHEET_NAME ?? "Contact";

  if (!serviceAccountEmail || !serviceAccountPrivateKey || !sheetId) {
    throw new Error("Google Sheets is not configured.");
  }

  return {
    serviceAccountEmail,
    serviceAccountPrivateKey,
    sheetId,
    sheetName,
  };
};

const createSignedJwt = ({
  clientEmail,
  privateKey,
}: {
  clientEmail: string;
  privateKey: string;
}) => {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + 3600;

  const header = toBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = toBase64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: GOOGLE_SHEETS_SCOPE,
      aud: GOOGLE_OAUTH_TOKEN_URL,
      exp: expiresAt,
      iat: issuedAt,
    }),
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  signer.end();

  return `${header}.${payload}.${toBase64Url(signer.sign(privateKey))}`;
};

const getAccessToken = async ({
  clientEmail,
  privateKey,
}: {
  clientEmail: string;
  privateKey: string;
}) => {
  const response = await fetchWithTimeout(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createSignedJwt({ clientEmail, privateKey }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to obtain a Google access token. ${errorText}`);
  }

  const data = (await response.json()) as { access_token?: string };

  if (!data.access_token) {
    throw new Error("Google did not return an access token.");
  }

  return data.access_token;
};

const ensureSheetHeaders = async ({
  accessToken,
  sheetId,
  sheetName,
}: {
  accessToken: string;
  sheetId: string;
  sheetName: string;
}) => {
  const headerRange = encodeSheetRange(sheetName, "A1:H1");
  const readResponse = await fetchWithTimeout(
    `${GOOGLE_SHEETS_API_BASE_URL}/${sheetId}/values/${headerRange}`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!readResponse.ok) {
    const errorText = await readResponse.text();
    throw new Error(`Failed to read Google Sheets headers. ${errorText}`);
  }

  const data = (await readResponse.json()) as { values?: string[][] };
  const existingHeaders = data.values?.[0] ?? [];
  const hasExpectedHeaders =
    existingHeaders.length === CONTACT_SHEET_HEADERS.length &&
    CONTACT_SHEET_HEADERS.every((header, index) => existingHeaders[index] === header);

  if (hasExpectedHeaders) {
    return;
  }

  if (existingHeaders.length > 0) {
    throw new Error(
      `The sheet "${sheetName}" already contains a different header row. Expected: ${CONTACT_SHEET_HEADERS.join(", ")}.`,
    );
  }

  const writeResponse = await fetchWithTimeout(
    `${GOOGLE_SHEETS_API_BASE_URL}/${sheetId}/values/${headerRange}?valueInputOption=RAW`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        majorDimension: "ROWS",
        values: [CONTACT_SHEET_HEADERS],
      }),
    },
  );

  if (!writeResponse.ok) {
    const errorText = await writeResponse.text();
    throw new Error(`Failed to initialize Google Sheets headers. ${errorText}`);
  }
};

export const appendContactSubmissionToSheet = async (
  row: ContactRow,
  config?: {
    serviceAccountEmail?: string;
    serviceAccountPrivateKey?: string;
    sheetId?: string;
    sheetName?: string;
  },
) => {
  const { serviceAccountEmail, serviceAccountPrivateKey, sheetId, sheetName } =
    getGoogleSheetsConfig(config);
  const accessToken = await getAccessToken({
    clientEmail: serviceAccountEmail,
    privateKey: serviceAccountPrivateKey.replaceAll("\\n", "\n"),
  });

  await ensureSheetHeaders({ accessToken, sheetId, sheetName });

  const appendRange = encodeSheetRange(sheetName, "A:H");
  const tableRange = encodeURIComponent(`${sheetName}!A1:H1`);
  const response = await fetchWithTimeout(
    `${GOOGLE_SHEETS_API_BASE_URL}/${sheetId}/values/${appendRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS&tableRange=${tableRange}`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        majorDimension: "ROWS",
        values: [
          [
            row.submittedAt,
            row.name,
            row.email,
            row.company || "-",
            row.reason,
            row.subject,
            row.message,
            row.path,
          ],
        ],
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to append the submission to Google Sheets. ${errorText}`);
  }
};
