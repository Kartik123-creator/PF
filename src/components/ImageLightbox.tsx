"use client";

import { useRef } from "react";
import { Maximize2, X } from "lucide-react";

/**
 * Wraps a card image in a link to the full-size file.
 * Desktop (≥ 768px): a plain click opens a lightbox (<dialog>: Esc, focus and the top layer come free).
 * Mobile, modified clicks (ctrl/cmd/shift/middle) and no-JS: the link opens the raw image in a new tab.
 */
export default function ImageLightbox({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  function open(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!window.matchMedia("(min-width: 768px)").matches || !dialog.current?.showModal) return;
    e.preventDefault();
    dialog.current.showModal();
  }

  return (
    <>
      <a href={src} target="_blank" rel="noopener" onClick={open} className="group relative block cursor-zoom-in">
        {children}
        <span className="sr-only">(opens full size)</span>
        <span
          aria-hidden="true"
          className="absolute right-2.5 top-2.5 rounded-full bg-black/50 p-1.5 text-white/85 transition group-hover:bg-black/70 group-hover:text-white"
        >
          <Maximize2 size={14} />
        </span>
      </a>

      <dialog
        ref={dialog}
        aria-label={alt}
        // a click on the backdrop lands on the <dialog> itself, not its content
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/85"
      >
        {/* full-size original; a closed dialog isn't rendered, so this loads only when opened */}
        <img src={src} alt={alt} width={1600} height={1200} loading="lazy" className="block h-auto max-h-[90vh] w-auto max-w-[92vw] rounded-lg" />
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close"
          className="absolute -right-3 -top-3 rounded-full bg-white p-1.5 text-black shadow-lg transition hover:scale-105"
        >
          <X size={18} />
        </button>
      </dialog>
    </>
  );
}
