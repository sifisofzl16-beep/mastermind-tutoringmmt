"use client";

import { useState, useTransition } from "react";
import { checkAnswer, type AnswerResult } from "./actions";

export type QuizQuestion = {
  id: string;
  section: string | null;
  prompt: string;
  options: string[];
};

type Verdict = Extract<AnswerResult, { ok: true }>;

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const finished = done;
  const score = results.filter(Boolean).length;
  const q = questions[index];

  function choose(i: number) {
    if (verdict || pending) return;
    setPicked(i);
    setFailed(false);
    startTransition(async () => {
      const res = await checkAnswer(q.id, i);
      if (!res.ok) {
        setPicked(null);
        setFailed(true);
        return;
      }
      setVerdict(res);
      setResults((r) => [...r, res.correct]);
    });
  }

  function next() {
    setPicked(null);
    setVerdict(null);
    setIndex((n) => n + 1);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setVerdict(null);
    setResults([]);
    setFailed(false);
    setDone(false);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-2xl bg-white p-6 ring-1 ring-[#0D1B2A]/10 sm:p-8">
        <h2 className="text-2xl font-semibold">
          You scored {score} out of {questions.length}
        </h2>
        <p className="mt-2 text-[#0D1B2A]/70">
          {pct >= 80
            ? "Strong work. This chapter is in good shape."
            : pct >= 50
              ? "Solid start. Revisit the sections you missed in the study guide, then try again."
              : "Go back through the videos and study guide, then try again. Every question has an explanation to learn from."}
        </p>
        <ol className="mt-6 flex flex-wrap gap-2" aria-label="Your answers">
          {results.map((ok, i) => (
            <li
              key={questions[i].id}
              className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${
                ok ? "bg-[#F4A024] text-[#0D1B2A]" : "bg-[#0D1B2A]/10 text-[#0D1B2A]/70"
              }`}
              title={`Question ${i + 1}: ${ok ? "correct" : "incorrect"}`}
            >
              {i + 1}
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={restart}
          className="mt-8 rounded-xl bg-[#0D1B2A] px-6 py-3 font-semibold text-white hover:bg-[#16293f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A024]"
        >
          Try again
        </button>
      </div>
    );
  }

  const isLast = index === questions.length - 1;

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-[#0D1B2A]/10 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#0D1B2A]/60">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        {q.section && <span>{q.section}</span>}
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#0D1B2A]/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={results.length}
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-[#F4A024] transition-[width] duration-300"
          style={{ width: `${(results.length / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold leading-snug">{q.prompt}</h2>

      <ul className="mt-5 space-y-3">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = verdict?.correctIndex === i;
          const isWrongPick = !!verdict && isPicked && !verdict.correct;
          let style = "bg-white ring-1 ring-[#0D1B2A]/20 hover:ring-2 hover:ring-[#F4A024]";
          if (verdict) {
            if (isCorrect) style = "bg-[#F4A024]/20 ring-2 ring-[#F4A024]";
            else if (isWrongPick) style = "bg-[#0D1B2A]/5 ring-2 ring-[#0D1B2A]/50";
            else style = "bg-white ring-1 ring-[#0D1B2A]/10 text-[#0D1B2A]/55";
          } else if (isPicked) {
            style = "bg-[#0D1B2A]/5 ring-2 ring-[#0D1B2A]";
          }
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => choose(i)}
                disabled={!!verdict || pending}
                className={`flex w-full items-start gap-4 rounded-xl px-4 py-3.5 text-left outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#F4A024] ${style}`}
              >
                <span
                  className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                    verdict && isCorrect
                      ? "bg-[#F4A024] text-[#0D1B2A]"
                      : "bg-[#0D1B2A]/10 text-[#0D1B2A]/70"
                  }`}
                  aria-hidden="true"
                >
                  {verdict && isCorrect ? "✓" : verdict && isWrongPick ? "✕" : LETTERS[i]}
                </span>
                <span className="pt-0.5">{opt}</span>
                {verdict && isCorrect && <span className="sr-only">Correct answer</span>}
                {isWrongPick && <span className="sr-only">Your answer, incorrect</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite">
        {pending && <p className="mt-5 text-sm text-[#0D1B2A]/60">Checking your answer...</p>}
        {failed && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            We could not check that answer. Check your connection and select it again.
          </p>
        )}
        {verdict && (
          <div className="mt-6 rounded-xl bg-[#F7F4EC] p-5">
            <p className="font-semibold">
              {verdict.correct ? "Correct." : "Not quite."}{" "}
              {!verdict.correct && (
                <span className="font-normal text-[#0D1B2A]/70">
                  The answer is {LETTERS[verdict.correctIndex]}.
                </span>
              )}
            </p>
            <p className="mt-2 text-[#0D1B2A]/80">{verdict.explanation}</p>
          </div>
        )}
      </div>

      {verdict && (
        <button
          type="button"
          onClick={isLast ? () => setDone(true) : next}
          className="mt-6 rounded-xl bg-[#0D1B2A] px-6 py-3 font-semibold text-white hover:bg-[#16293f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A024]"
        >
          {isLast ? "See your score" : "Next question"}
        </button>
      )}
    </div>
  );
}
