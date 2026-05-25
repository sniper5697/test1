"use client";

import { useRef, useState } from "react";

type FaqItemProps = {
  id: string;
  question: string;
  answer: string;
};

export function FaqItem({ id, question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${id}`;
  const triggerId = `faq-trigger-${id}`;
  const triggerRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "Escape" || !open) {
      return;
    }

    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }

  return (
    <article
      className="section-card"
      style={{ padding: 24, background: "#fff", borderRadius: 24 }}
    >
      <button
        id={triggerId}
        ref={triggerRef}
        className="faq-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-controls={panelId}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          border: 0,
          background: "transparent",
          padding: 0,
          color: "inherit",
          font: "inherit",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5 }}>{question}</span>
        <span aria-hidden="true" className="muted" style={{ fontWeight: 700 }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <p
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="muted"
          style={{ marginTop: 16, marginBottom: 0, lineHeight: 1.8 }}
        >
          {answer}
        </p>
      ) : null}
    </article>
  );
}
