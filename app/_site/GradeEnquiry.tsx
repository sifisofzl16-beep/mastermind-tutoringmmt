"use client";

import { useState } from "react";
import Link from "next/link";
import { BOOK } from "@/lib/site";
import Icon from "./Icons";

const GRADES = ["Grade 12", "Grade 11", "Grade 10"];
const SUBJECTS = ["Mathematics", "Physical Sciences", "Both"];
const MODES = ["Online", "In person", "Not sure yet"];

/** Lets a parent say what they need in three taps, then opens WhatsApp with the message written for them. */
export default function GradeEnquiry() {
  const [grade, setGrade] = useState(GRADES[0]);
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [mode, setMode] = useState(MODES[0]);


  return (
    <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgb(13_27_42/0.45)] ring-1 ring-navy/10 sm:p-8">
      <p className="font-hand text-2xl font-bold text-amber">Find a tutor in three taps</p>
      <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">What does your child need?</h2>

      <Choice label="Grade" options={GRADES} value={grade} onChange={setGrade} />
      <Choice label="Subject" options={SUBJECTS} value={subject} onChange={setSubject} />
      <Choice label="Sessions" options={MODES} value={mode} onChange={setMode} />

      <Link
        href={BOOK.schoolWith({ grade, subject, mode })}
        className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-navy shadow-[0_5px_0_0_var(--color-navy)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_0_var(--color-navy)]"
      >
        Continue to booking <Icon name="arrow" className="h-5 w-5" />
      </Link>
      <p className="mt-3 text-center text-sm text-navy/60">Next: a few details, then it goes to us on WhatsApp.</p>
    </div>
  );
}

function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-semibold text-navy/70">{label}</legend>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {options.map((o) => {
          const on = o === value;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={`min-h-11 rounded-xl px-2 py-2 text-sm font-semibold leading-tight outline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                on ? "bg-navy text-white" : "bg-cream text-navy ring-1 ring-navy/10 hover:ring-navy/40"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
