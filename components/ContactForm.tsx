"use client";

import { useRef, useState, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>({ kind: "idle" });

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get("name") ?? "").trim()) e.name = "Enter your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) e.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email)) e.email = "Enter an email address in the format name@example.com.";
    if (!String(data.get("message") ?? "").trim()) e.message = "Tell us a little about your project.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (state.kind === "sending") return;
    const data = new FormData(ev.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      setState({ kind: "idle" });
      // Move focus to the error summary so screen-reader users hear what went wrong (WCAG 3.3.1).
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong.");
      }
      setState({ kind: "sent" });
      formRef.current?.reset();
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const errorEntries = Object.entries(errors) as [keyof Errors, string][];
  const sending = state.kind === "sending";

  if (state.kind === "sent") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="form-status">
        <h2>Thank you</h2>
        <p>Your message has been sent. A member of the S95 team will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form" aria-describedby="form-note">
      {(errorEntries.length > 0 || state.kind === "error") && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="form-status form-status--error">
          {state.kind === "error" ? (
            <>
              <h2>We couldn’t send your message</h2>
              <p>
                {state.message} Please try again, or email us directly.
              </p>
            </>
          ) : (
            <>
              <h2>Please correct the following</h2>
              <ul>
                {errorEntries.map(([key, msg]) => (
                  <li key={key}>
                    <a href={`#field-${key}`}>{msg}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <p id="form-note" className="form-note">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="field">
        <label htmlFor="field-name">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="field-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "err-name" : undefined}
        />
        {errors.name && (
          <p id="err-name" className="field__error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="field-company">
          Company <span className="opt">(optional)</span>
        </label>
        <input id="field-company" name="company" type="text" autoComplete="organization" />
      </div>

      <div className="field">
        <label htmlFor="field-email">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="field-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "err-email" : undefined}
        />
        {errors.email && (
          <p id="err-email" className="field__error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="field-message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message && (
          <p id="err-message" className="field__error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people and assistive tech, bots tend to fill it. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="field-website">Leave this field empty</label>
        <input id="field-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button type="submit" className="btn" aria-disabled={sending} disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {sending ? "Sending your message" : ""}
      </p>
    </form>
  );
}
