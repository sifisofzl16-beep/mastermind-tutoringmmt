"use server";

import { createClient } from "@/lib/supabase/server";

export type AnswerResult =
  | { ok: true; correct: boolean; correctIndex: number; explanation: string }
  | { ok: false };

/**
 * Grades one quiz answer on the server. The answer key never reaches the
 * browser until the student has submitted a choice for that question.
 */
export async function checkAnswer(questionId: string, choice: number): Promise<AnswerResult> {
  if (typeof questionId !== "string" || !/^[0-9a-f-]{36}$/i.test(questionId)) return { ok: false };
  if (!Number.isInteger(choice) || choice < 0 || choice > 5) return { ok: false };

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("check_quiz_answer", {
    p_question: questionId,
    p_choice: choice,
  });
  const row = Array.isArray(data) ? data[0] : null;
  if (error || !row) return { ok: false };

  return {
    ok: true,
    correct: !!row.correct,
    correctIndex: Number(row.correct_index),
    explanation: String(row.explanation),
  };
}
