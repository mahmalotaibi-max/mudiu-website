"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { questionOrder, questionText, answerQuestion, type QuestionKey } from "@/lib/platform/askMudiu";
import type { Locale, OrganizationDataset } from "@/lib/platform/types";

interface Turn {
  question: string;
  answer: string;
}

const strings = {
  en: { tryAsking: "Try asking", empty: "Ask MUDIU a question about this organization's diagnostic - pick one from the list to see how it works." },
  ar: { tryAsking: "جرّب أن تسأل", empty: "اطرح على MUDIU سؤالًا حول تشخيص هذه المؤسسة - اختر أحد الأسئلة لترى كيف يعمل." },
};

export function AskMudiu({
  dataset,
  locale = "en",
}: {
  dataset: OrganizationDataset;
  locale?: Locale;
}) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const t = strings[locale];

  function ask(key: QuestionKey) {
    const question = questionText[locale][key];
    const answer = answerQuestion(key, dataset, locale);
    setTurns((prev) => [...prev, { question, answer }]);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div>
        <p className="text-xs font-medium text-muted">{t.tryAsking}</p>
        <div className="mt-3 flex flex-col gap-2">
          {questionOrder.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => ask(key)}
              className="rounded-xl border border-line px-4 py-3 text-start text-sm text-ink transition-colors hover:border-ink hover:bg-paper-alt"
            >
              {questionText[locale][key]}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-80 rounded-2xl border border-line p-6">
        {turns.length === 0 ? (
          <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
            <Sparkles className="size-6 text-orange" aria-hidden />
            <p className="mt-3 max-w-sm text-sm text-muted">{t.empty}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {turns.map((turn, i) => (
              <div key={i} className="flex flex-col gap-3">
                <p className="ms-auto max-w-[85%] rounded-2xl rounded-ee-sm bg-ink px-4 py-2.5 text-sm text-paper">
                  {turn.question}
                </p>
                <p
                  className={cn(
                    "max-w-[85%] rounded-2xl rounded-ss-sm border border-line bg-paper-alt px-4 py-3 text-sm leading-relaxed text-ink"
                  )}
                >
                  {turn.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
