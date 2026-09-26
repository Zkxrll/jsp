"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";

const FAQ_ITEMS = [
  {
    question: "How do I get a key?",
    answer:
      "Click Get Key, open the Zkx Hub Discord invite, then continue to the key system. The key system issues your key; paste it into the script when it asks.",
  },
  {
    question: "Is Premium lifetime?",
    answer:
      "Yes. Premium is a single payment for lifetime access with every future update included. There is no subscription and nothing renews.",
  },
  {
    question: "My key stopped working. What now?",
    answer:
      "Get a fresh one through Get Key. If a new key still fails, ask in the Discord and include which executor you are using so the team can reproduce it.",
  },
  {
    question: "How often is Zkx Hub updated?",
    answer:
      "Whenever a Rivals update breaks something, and when new features are ready. Fixed builds are posted in the Discord first, and the latest changes are listed in Updates above.",
  },
  {
    question: "Where do I get support?",
    answer:
      "In the Discord. Keys, update announcements, and support all run through the same server.",
  },
] as const;

/** An inset grouped list: one surface, rows separated by hairlines. */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="card faq-group">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question} className={`faq-item ${isOpen ? "faq-item-open" : ""}`}>
            <h3 className="text-base">
              <button
                id={buttonId}
                type="button"
                className="faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              >
                <span>{item.question}</span>
                <ChevronDownIcon className="faq-chevron" />
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-panel" inert={!isOpen}>
              <div className="faq-answer">
                <p className="faq-answer-inner">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
