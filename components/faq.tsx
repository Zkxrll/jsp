"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How do I get a key?",
    answer:
      "Click Get Key on the homepage, join the Zkx Hub Discord, wait for the access check to finish, then continue to the key system.",
  },
  {
    question: "Is Premium lifetime?",
    answer:
      "Yes. Premium is a one-time purchase that gives you lifetime access. There is no recurring subscription.",
  },
  {
    question: "Where can I get support?",
    answer:
      "Join the Zkx Hub Discord for support, updates, announcements, and help with the key system.",
  },
  {
    question: "What should I do if my key does not work?",
    answer:
      "First make sure you are using the latest key flow. If the problem continues, contact the Zkx Hub team through Discord.",
  },
  {
    question: "How often is Zkx Hub updated?",
    answer:
      "Updates are released when needed to improve compatibility, fix issues, and add or improve features.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={item.question}
            className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
          >
            <button
              id={buttonId}
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpenIndex((current) =>
                  current === index ? null : index
                )
              }
            >
              <span>{item.question}</span>

              <span className="faq-icon" aria-hidden="true">
                +
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-panel"
            >
              <div className="faq-answer">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
