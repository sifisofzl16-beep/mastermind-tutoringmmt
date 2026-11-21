"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PHONE_DISPLAY, whatsappLink } from "@/lib/contact";
import Icon from "./Icons";

type Who = "school" | "university";

const GRADES = ["Grade 12", "Grade 11", "Grade 10"];
const SCHOOL_SUBJECTS = ["Mathematics", "Physical Sciences", "Both"];
const UNIVERSITIES = ["Wits", "UJ", "Other"];
const YEARS = ["1st year", "2nd year", "3rd year", "4th year or more", "Postgraduate"];
const SERVICES = ["One-on-one tutoring", "Full Course", "Not sure yet"];
const MODES = ["Online", "In person", "Not sure yet"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["Mornings", "Afternoons", "Evenings"];
const SOURCES = ["Google", "TikTok", "WhatsApp group", "A friend or family member", "Other"];

function pick(value: string | null, options: string[], fallback = "") {
  return value && options.includes(value) ? value : fallback;
}

/**
 * The booking form. Nothing is stored on our side: on submit it writes a tidy
 * message and opens WhatsApp to Mastermind Tutoring with that message ready to send.
 */
export default function BookingForm() {
  const sp = useSearchParams();
  const [who, setWho] = useState<Who | null>(sp.get("for") === "university" ? "university" : sp.get("for") === "school" ? "school" : null);

  // Shared
  const [name, setName] = useState("");
  const [mode, setMode] = useState(pick(sp.get("mode"), MODES));
  const [area, setArea] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");

  // High school
  const [isParent, setIsParent] = useState(true);
  const [learner, setLearner] = useState("");
  const [grade, setGrade] = useState(pick(sp.get("grade"), GRADES));
  const [subject, setSubject] = useState(pick(sp.get("subject"), SCHOOL_SUBJECTS));
  const [school, setSchool] = useState("");

  // University
  const [uni, setUni] = useState("");
  const [uniOther, setUniOther] = useState("");
  const [year, setYear] = useState("");
  const [degree, setDegree] = useState("");
  const [service, setService] = useState(pick(sp.get("service"), SERVICES));
  const [modules, setModules] = useState(sp.get("module") ?? "");

  const [tried, setTried] = useState(false);
  const [sentLink, setSentLink] = useState<string | null>(null);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  function buildMessage() {
    const lines: string[] = ["Hi Mastermind Tutoring, I'd like to book.", ""];
    const when = [days.length ? days.join(", ") : "", times.length ? times.join(", ").toLowerCase() : ""].filter(Boolean).join(", ");
    if (who === "school") {
      lines.push("*High school*");
      lines.push(`${isParent ? "Parent" : "Learner"}: ${name.trim()}`);
      if (isParent && learner.trim()) lines.push(`Learner: ${learner.trim()}`);
      lines.push(`Grade: ${grade}`);
      lines.push(`Subject: ${subject === "Both" ? "Mathematics and Physical Sciences" : subject}`);
      if (school.trim()) lines.push(`School: ${school.trim()}`);
    } else {
      lines.push("*University*");
      lines.push(`Name: ${name.trim()}`);
      lines.push(`University: ${uni === "Other" ? uniOther.trim() || "Other" : uni}`);
      if (year) lines.push(`Year: ${year}`);
      if (degree.trim()) lines.push(`Degree: ${degree.trim()}`);
      lines.push(`Looking for: ${service}`);
      lines.push(`Module(s): ${modules.trim()}`);
    }
    lines.push(`Sessions: ${mode}${mode === "In person" && area.trim() ? ` (area: ${area.trim()})` : ""}`);
    if (when) lines.push(`Best times: ${when}`);
    if (notes.trim()) lines.push(`Help needed: ${notes.trim()}`);
    if (source) lines.push(`Found you through: ${source}`);
    return lines.join("\n");
  }

  function missingFields() {
    const missing: string[] = [];
    if (!name.trim()) missing.push("your name");
    if (who === "school") {
      if (!grade) missing.push("the grade");
      if (!subject) missing.push("the subject");
    } else {
      if (!uni) missing.push("your university");
      if (uni === "Other" && !uniOther.trim()) missing.push("the name of your university");
      if (!service) missing.push("what you are looking for");
      if (!modules.trim()) missing.push("the module or modules");
    }
    if (!mode) missing.push("online or in person");
    return missing;
  }
  // Only shown after the first attempt to send, then kept up to date as fields are filled in.
  const errors = tried ? missingFields() : [];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (missingFields().length) return;

    const link = whatsappLink(buildMessage());
    setSentLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (!who) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <WhoCard
          onClick={() => setWho("school")}
          kicker="Grades 10, 11 and 12"
          title="High school"
          text="Maths and Physical Sciences tutoring. For parents and learners."
        />
        <WhoCard
          onClick={() => setWho("university")}
          kicker="Wits, UJ and others"
          title="University"
          text="One-on-one tutoring for your modules, or a Full Course."
        />
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[1.75rem] bg-white p-5 ring-1 ring-navy/10 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-hand text-2xl font-bold text-amber">{who === "school" ? "High school booking" : "University booking"}</p>
        <button
          type="button"
          onClick={() => {
            setWho(who === "school" ? "university" : "school");
            setTried(false);
          }}
          className="text-sm font-semibold underline decoration-gold decoration-2 underline-offset-4"
        >
          Switch to {who === "school" ? "university" : "high school"}
        </button>
      </div>

      {who === "school" ? (
        <>
          <Section title="About you">
            <Chips label="I am the" options={["Parent", "Learner"]} value={isParent ? "Parent" : "Learner"} onChange={(v) => setIsParent(v === "Parent")} />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Your name" required value={name} onChange={setName} autoComplete="name" />
              {isParent && <Field id="learner" label="Your child's name (optional)" value={learner} onChange={setLearner} />}
            </div>
          </Section>
          <Section title="What they need">
            <Chips label="Grade" required options={GRADES} value={grade} onChange={setGrade} />
            <Chips label="Subject" required options={SCHOOL_SUBJECTS} value={subject} onChange={setSubject} />
            <div className="mt-4">
              <Field id="school" label="School (optional)" value={school} onChange={setSchool} />
            </div>
          </Section>
        </>
      ) : (
        <>
          <Section title="About you">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Your name" required value={name} onChange={setName} autoComplete="name" />
              <Field id="degree" label="Degree (optional)" placeholder="BSc Engineering, BCom..." value={degree} onChange={setDegree} />
            </div>
            <Chips label="University" required options={UNIVERSITIES} value={uni} onChange={setUni} />
            {uni === "Other" && (
              <div className="mt-3">
                <Field id="uni-other" label="Which university?" required value={uniOther} onChange={setUniOther} />
              </div>
            )}
            <Chips label="Year of study" options={YEARS} value={year} onChange={setYear} />
          </Section>
          <Section title="What you need">
            <Chips label="Looking for" required options={SERVICES} value={service} onChange={setService} />
            <div className="mt-4">
              <Field
                id="modules"
                label="Module or modules"
                required
                placeholder="e.g. MATH1042 Engineering Mathematics, Corporate Finance II"
                value={modules}
                onChange={setModules}
              />
            </div>
          </Section>
        </>
      )}

      <Section title="Sessions">
        <Chips label="Online or in person" required options={MODES} value={mode} onChange={setMode} />
        {mode === "In person" && (
          <div className="mt-4">
            <Field id="area" label="Your area in Johannesburg" placeholder="e.g. Braamfontein, Randburg, Soweto" value={area} onChange={setArea} />
          </div>
        )}
        <MultiChips label="Days that suit you (optional)" options={DAYS} values={days} onToggle={(v) => toggle(days, setDays, v)} compact />
        <MultiChips label="Times (optional)" options={TIMES} values={times} onToggle={(v) => toggle(times, setTimes, v)} />
      </Section>

      <Section title="Anything else">
        <label htmlFor="notes" className="text-sm font-semibold text-navy/70">
          {who === "school" ? "What is your child finding hard? (optional)" : "What are you struggling with? Any test dates? (optional)"}
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-base outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        <div className="mt-4">
          <label htmlFor="source" className="text-sm font-semibold text-navy/70">
            How did you hear about us? (optional)
          </label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="mt-2 min-h-12 w-full rounded-xl border border-navy/20 bg-white px-4 text-base outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
          >
            <option value="">Choose one</option>
            {SOURCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </Section>

      {errors.length > 0 && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          Please add {errors.join(", ")}.
        </p>
      )}

      <button
        type="submit"
        className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-navy shadow-[0_5px_0_0_var(--color-navy)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_0_var(--color-navy)]"
      >
        <Icon name="chat" className="h-5 w-5" /> Send booking on WhatsApp
      </button>

      {sentLink ? (
        <div className="mt-4 rounded-xl bg-gold/15 p-4 text-sm ring-1 ring-gold/40" role="status">
          WhatsApp should have opened with your booking written out. Tap <strong>send</strong> there to finish.{" "}
          <a href={sentLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
            WhatsApp did not open? Tap here.
          </a>
        </div>
      ) : (
        <p className="mt-3 text-center text-sm text-navy/60">
          This opens WhatsApp to {PHONE_DISPLAY} with your booking written out. Nothing is sent until you tap send.
        </p>
      )}
    </form>
  );
}

function WhoCard({ onClick, kicker, title, text }: { onClick: () => void; kicker: string; title: string; text: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-start rounded-3xl bg-white p-7 text-left ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:ring-2 hover:ring-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span className="font-hand text-2xl font-bold text-amber">{kicker}</span>
      <span className="mt-1 font-display text-3xl font-bold tracking-tight">{title}</span>
      <span className="mt-2 text-navy/70">{text}</span>
      <span className="mt-5 inline-flex items-center gap-2 font-semibold">
        Start <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-7 border-t border-navy/10 pt-6 first-of-type:mt-5">
      <legend className="float-left mb-3 w-full font-display text-lg font-semibold">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  required,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-navy/70">
        {label}
        {required && <span className="text-red-700"> *</span>}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 min-h-12 w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-base outline-none placeholder:text-navy/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="mt-4 first:mt-0" role="radiogroup" aria-label={label}>
      <p className="text-sm font-semibold text-navy/70">
        {label}
        {required && <span className="text-red-700"> *</span>}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o === value;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o)}
              className={`min-h-11 rounded-xl px-4 py-2 text-sm font-semibold outline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                on ? "bg-navy text-white" : "bg-cream text-navy ring-1 ring-navy/10 hover:ring-navy/40"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MultiChips({
  label,
  options,
  values,
  onToggle,
  compact,
}: {
  label: string;
  options: string[];
  values: string[];
  onToggle: (v: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="mt-4" role="group" aria-label={label}>
      <p className="text-sm font-semibold text-navy/70">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = values.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o)}
              className={`min-h-11 rounded-xl text-sm font-semibold outline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                compact ? "min-w-12 px-3" : "px-4"
              } py-2 ${on ? "bg-navy text-white" : "bg-cream text-navy ring-1 ring-navy/10 hover:ring-navy/40"}`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
