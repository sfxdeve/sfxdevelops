import { ScrollTrigger } from "gsap/ScrollTrigger";

export const EASE = "power2.out";
export const CARD_FROM = { autoAlpha: 0, y: 24 };
export const CARD_TO = { autoAlpha: 1, y: 0, duration: 0.42, ease: EASE };
export const ITEM_FROM = { autoAlpha: 0, y: 12 };
export const ITEM_TO = { autoAlpha: 1, y: 0, duration: 0.26, ease: EASE };
export const ITEM_STAGGER = 0.05;
export const ACCENT_FROM = { scaleX: 0, transformOrigin: "left center" };
export const ACCENT_TO = { scaleX: 1, duration: 0.28, ease: EASE };

export const killScrollTriggersByPrefix = (prefix: string) => {
  ScrollTrigger.getAll().forEach((trigger) => {
    const id = trigger.vars.id;
    if (typeof id === "string" && id.startsWith(prefix)) {
      trigger.kill();
    }
  });
};

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const bindPageAnimationListeners = (
  key: string,
  onLoad: () => void,
  onBeforeSwap: () => void,
) => {
  if (document.documentElement.dataset[key] === "1") {
    return;
  }

  document.addEventListener("astro:page-load", onLoad);
  document.addEventListener("astro:before-swap", onBeforeSwap);
  document.documentElement.dataset[key] = "1";
};
