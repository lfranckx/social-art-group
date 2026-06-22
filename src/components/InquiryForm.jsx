import React, { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/inquiry.css";
import {
  CATEGORIES,
  FLOWS,
  MEDIA_KIT_CATEGORIES,
  INTRO,
  CONFIRMATION,
} from "./inquiryConfig";

import { MEDIA_KIT_DROPBOX_URL } from "./inquiryConfig";

// In local dev we hit the standalone test server on :3001.
// In production this is empty, so it uses the same-origin /api path.
const API_BASE = import.meta.env.DEV ? "http://localhost:3001" : "";

// Build the initial empty value map for a given category's flow.
function blankValues(category) {
  const values = {};
  if (!category || !FLOWS[category]) return values;
  FLOWS[category].sections.forEach((section) => {
    section.fields.forEach((f) => {
      values[f.name] = f.type === "checkbox" ? [] : "";
    });
  });
  return values;
}

export default function InquiryForm() {
  const formRef = useRef();
  const [category, setCategory] = useState("");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  // media kit file
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  // submission lifecycle: idle | sending | sent | error
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const flow = category ? FLOWS[category] : null;
  const showMediaKit = MEDIA_KIT_CATEGORIES.includes(category);

  const categoryLabel = useMemo(
    () => CATEGORIES.find((c) => c.value === category)?.label || "",
    [category]
  );

  function chooseCategory(value) {
    // Agar wahi category dobara click hui, to deselect (toggle off)
    const nextCategory = value === category ? "" : value;
    setCategory(nextCategory);
    setValues(blankValues(nextCategory));
    setErrors({});
    setFile(null);
    setFileError("");
    setStatus("idle");
    setSubmitError("");
  }

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function toggleCheckbox(name, optionValue) {
    setValues((v) => {
      const current = v[name] || [];
      const next = current.includes(optionValue)
        ? current.filter((x) => x !== optionValue)
        : [...current, optionValue];
      return { ...v, [name]: next };
    });
  }

  function onFileChange(e) {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 10 * 1024 * 1024) {
      setFileError("Please keep the file under 10MB.");
      setFile(null);
      return;
    }
    setFileError("");
    setFile(f);
  }

  function validate() {
    const next = {};
    flow.sections.forEach((section) => {
      section.fields.forEach((f) => {
        if (!f.required) return;
        const val = values[f.name];
        const empty =
          f.type === "checkbox" ? !val || val.length === 0 : !String(val || "").trim();
        if (empty) next[f.name] = "This field is required.";
        if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          next[f.name] = "Please enter a valid email address.";
        }
      });
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) {
      const firstErr = document.querySelector("[data-error='true']");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("sending");
    setSubmitError("");

   try {
       // 1) If a media-kit file was chosen, upload it to Dropbox via our
      //    serverless function and get back a shareable link.
      let mediaKitUrl = "";
      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("applicant", values.name || values.company || "applicant");

        const uploadRes = await fetch(`${API_BASE}/api/upload-media-kit`, {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) {
          throw new Error("Media kit upload failed. Please try again.");
        }
        const uploadData = await uploadRes.json();
        mediaKitUrl = uploadData.url || "";
      }

      // 2) Flatten answers into a single readable block for the email body.
      const summaryRows = [];
      flow.sections.forEach((section) => {
        section.fields.forEach((f) => {
          const val = values[f.name];
          const printable = Array.isArray(val) ? val.join(", ") : val;
          if (printable && String(printable).trim()) {
            const label = f.emailLabel || f.label;
            summaryRows.push(`${label}: ${printable}`);
          }
        });
      });

      // 3) Build EmailJS template params.
       const templateParams = {
        inquiry_category: categoryLabel,
        user_name: values.name || values.company || "(no name)",
        user_email: values.email || "(no email)",
        summary: summaryRows.join("\n"),
        media_kit_url: mediaKitUrl
          ? mediaKitUrl
          : "No media kit uploaded.",
        submitted_at: new Date().toLocaleString(),
        page: typeof window !== "undefined" ? window.location.href : "",
        raw_json: JSON.stringify(
          { category: categoryLabel, ...values },
          null,
          2
        ),
      };

      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
        throw new Error("Email isn't configured yet (missing EmailJS env vars).");
      }

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("sent");
    } catch (err) {
      console.error("Inquiry submit error:", err);
      setStatus("error");
      setSubmitError(
        err?.message || err?.text || "Something went wrong. Please try again."
      );
    }
  }

  // ---------- CONFIRMATION STATE ----------
  if (status === "sent") {
    return (
      <section id="contact" className="inquiry-section inquiry-block" aria-label="Inquiry">
        <div className="inquiry-inner">
          <div className="inquiry-confirm" role="status">
            <h2 className="inquiry-confirm-title">{CONFIRMATION.title}</h2>
            <p className="inquiry-confirm-body">{CONFIRMATION.body}</p>
            <button
              type="button"
              className="btn inquiry-restart"
              onClick={() => chooseCategory("")}
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ---------- FORM ----------
  return (
    <section id="contact" className="inquiry-section inquiry-block" aria-label="Inquiry">
      <div className="inquiry-inner">
        <header className="inquiry-head">
          <h2 className="inquiry-title">{INTRO.title}</h2>
          <p className="inquiry-intro">{INTRO.body}</p>
        </header>

        {/* STEP 1 — category */}
        <fieldset className="inquiry-fieldset">
          <legend className="inquiry-legend">Who are you?</legend>
          <div className="inquiry-cats">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`inquiry-cat ${category === c.value ? "is-active" : ""}`}
                aria-pressed={category === c.value}
                onClick={() => chooseCategory(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* STEP 2 — conditional questions */}
        {flow && (
          <form ref={formRef} className="inquiry-form" onSubmit={handleSubmit} noValidate>
            {flow.sections.map((section) => (
              <fieldset key={section.title} className="inquiry-fieldset">
                <legend className="inquiry-legend">{section.title}</legend>
                {section.fields.map((f) => (
                  <Field
                    key={f.name}
                    field={f}
                    value={values[f.name]}
                    error={errors[f.name]}
                    onText={(val) => setField(f.name, val)}
                    onToggle={(opt) => toggleCheckbox(f.name, opt)}
                  />
                ))}
              </fieldset>
            ))}

            {/* Optional media kit — uploads to Dropbox via serverless fn */}
            {showMediaKit && (
              <fieldset className="inquiry-fieldset">
                <legend className="inquiry-legend">Media kit (optional)</legend>
                <p className="inquiry-help">
                  Share a deck, portfolio, or media kit — PDF, image, PPTX, or
                  ZIP, up to 10MB.
                </p>
                <label className="inquiry-file">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.pptx"
                    onChange={onFileChange}
                  />
                  <span className="inquiry-file-btn">Choose file</span>
                  <span className="inquiry-file-name">
                    {file ? file.name : "No file selected"}
                  </span>
                </label>
                {fileError && <p className="inquiry-err">{fileError}</p>}
              </fieldset>
            )}

            <div className="inquiry-actions">
              <button type="submit" className="btn" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Submit inquiry"}
              </button>
              {status === "error" && (
                <span className="inquiry-err" role="alert">
                  {submitError}
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// ---------- FIELD RENDERER ----------
function Field({ field, value, error, onText, onToggle }) {
  const { type, label, name, options, help } = field;
  const hasError = Boolean(error);

  if (type === "radio") {
    return (
      <div className="inquiry-field" data-error={hasError}>
        <span className="inquiry-label">{label}</span>
        <div className="inquiry-options">
          {options.map((opt) => (
            <label key={opt.value} className="inquiry-option">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onText(opt.value)}
              />
              <span>
                {opt.label}
                {opt.help && <small className="inquiry-option-help">{opt.help}</small>}
              </span>
            </label>
          ))}
        </div>
        {hasError && <p className="inquiry-err">{error}</p>}
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="inquiry-field" data-error={hasError}>
        <span className="inquiry-label">{label}</span>
        <div className="inquiry-options">
          {options.map((opt) => (
            <label key={opt.value} className="inquiry-option">
              <input
                type="checkbox"
                name={name}
                value={opt.value}
                checked={(value || []).includes(opt.value)}
                onChange={() => onToggle(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {hasError && <p className="inquiry-err">{error}</p>}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <label className="inquiry-field" data-error={hasError}>
        <span className="inquiry-label">
          {label}
          {field.required && <em className="inquiry-req"> *</em>}
        </span>
        <textarea
          name={name}
          rows={5}
          value={value || ""}
          onChange={(e) => onText(e.target.value)}
        />
        {help && <small className="inquiry-option-help">{help}</small>}
        {hasError && <p className="inquiry-err">{error}</p>}
      </label>
    );
  }

  // text / email
  return (
    <label className="inquiry-field" data-error={hasError}>
      <span className="inquiry-label">
        {label}
        {field.required && <em className="inquiry-req"> *</em>}
      </span>
      <input
        type={type === "email" ? "email" : "text"}
        name={name}
        value={value || ""}
        onChange={(e) => onText(e.target.value)}
      />
      {hasError && <p className="inquiry-err">{error}</p>}
    </label>
  );
}