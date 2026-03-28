import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { appendContactSubmissionToSheet } from "../lib/google-sheets";

const contactReasonSchema = z.enum([
  "project-collaboration",
  "role-opportunity",
  "general-question",
  "other",
]);

const createTrimmedNullableField = () =>
  z.union([z.string(), z.null()]).transform((value) => value?.trim() ?? "");

const optionalTextField = createTrimmedNullableField();
const honeypotField = createTrimmedNullableField();

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      website: honeypotField,
      name: z.string().trim().min(2, "Please enter your full name.").max(80),
      email: z.email("Please enter a valid email address.").max(120),
      company: optionalTextField,
      reason: contactReasonSchema,
      subject: z.string().trim().min(3, "Please add a short subject.").max(120),
      message: z
        .string()
        .trim()
        .min(20, "Please include a bit more detail in your message.")
        .max(4000),
    }),
    handler: async (input, context) => {
      if (input.website) {
        return {
          message:
            "Thanks. Your inquiry was sent successfully. Expect a reply within one business day.",
        };
      }

      try {
        await appendContactSubmissionToSheet({
          name: input.name,
          email: input.email,
          company: input.company,
          reason: input.reason,
          subject: input.subject,
          message: input.message,
          path: context.url.pathname,
          submittedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Contact form submission failed:", error);

        const message =
          error instanceof Error ? error.message : "The submission could not be saved right now.";

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: import.meta.env.DEV
            ? message
            : "The submission could not be saved right now. Check your Google Sheets configuration and try again.",
        });
      }

      return {
        message:
          "Thanks. Your inquiry was sent successfully. Expect a reply within one business day.",
      };
    },
  }),
};
