"use client";

import { useEffect } from "react";

/** Suppresses the browser context menu site-wide (requested by the site owner). */
export default function DisableRightClick() {
  useEffect(() => {
    const handler = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  return null;
}
