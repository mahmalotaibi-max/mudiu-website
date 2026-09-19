"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { presetQuestions, answerQuestion } from "@/lib/platform/askMudiu";
import { sampleOrganization } from "@/lib/platform/sampleData";

interface Turn {
  question: string;
  answer: string;
}

export function AskMudiu() {
  const [turns, setTurns] = useState<Turn[]>([]);

  function ask(question: string) {
    const answer = answerQuestion(question, sampleOrganization);
    setTurns((prev) => [...prev, { question, answer }]);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div>
        <p className="text-xs font-medium text-muted">Try asking</p>
        <div className="mt-3 flex flex-col gap-2">
          {presetQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              className="rounded-xl border border-line px-4 py-3 text-start text-sm text-ink transition-colors hover:border-ink hover:bg-paper-alt"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-80 rounded-2xl border border-line p-6">
        {turns.length === 0 ? (
          <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
            <Sparkles className="size-6 text-orange" aria-hidden />
            <p className="mt-3 max-w-sm text-sm text-muted">
              Ask MUDIU a question about this organization&apos;s diagnostic — pick one from the
              list to see how it works.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {turns.map((t, i) => (
              <div key={i} className="flex flex-col gap-3">
                <p className="ms-auto max-w-[85%] rounded-2xl rounded-ee-sm bg-ink px-4 py-2.5 text-sm text-paper">
                  {t.question}
                </p>
                <p
                  className={cn(
                    "max-w-[85%] rounded-2xl rounded-ss-sm border border-line bg-paper-alt px-4 py-3 text-sm leading-relaxed text-ink"
                  )}
                >
                  {t.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
