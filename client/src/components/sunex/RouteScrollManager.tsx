import React, { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const SCROLL_STATE_KEY = "__sunexScrollY";

function readStoredScrollY() {
  const storedScrollY = window.history.state?.[SCROLL_STATE_KEY];
  return typeof storedScrollY === "number" ? storedScrollY : 0;
}

function saveCurrentScrollY() {
  window.history.replaceState(
    { ...(window.history.state ?? {}), [SCROLL_STATE_KEY]: window.scrollY },
    "",
    window.location.href,
  );
}

function notifyScrollState() {
  window.requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
}

/**
 * Starts new page visits at the top while retaining expected scroll restoration
 * when visitors use browser Back or Forward. Hash targets remain available for
 * deliberate in-page navigation.
 */
export function RouteScrollManager() {
  const [location] = useLocation();
  const hasMounted = useRef(false);
  const restoredScrollY = useRef<number | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      restoredScrollY.current = readStoredScrollY();
    };

    window.addEventListener("scroll", saveCurrentScrollY, { passive: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("scroll", saveCurrentScrollY);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (restoredScrollY.current !== null) {
      window.scrollTo({ top: restoredScrollY.current, left: 0, behavior: "auto" });
      notifyScrollState();
      restoredScrollY.current = null;
      return;
    }

    const targetId = window.location.hash.slice(1);
    if (targetId) {
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(targetId))?.scrollIntoView({ block: "start" });
        notifyScrollState();
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    notifyScrollState();
  }, [location]);

  return null;
}
