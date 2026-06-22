import React, { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/inquiry.css";

// Local dev mein API alag server (:3001) par chalta hai; production mein same-origin /api.
const API_BASE = import.meta.env.DEV ? "http://localhost:3001" : "";

/* ============================================================
   INQUIRY FORM CONFIG (sab kuch isi file mein)
   ============================================================ */
const CATEGORIES = [
  { value: "creator", label: "Creator, Artist, or Educator" },
  { value: "founder", label: "Founder or Leadership Team" },
  { value: "brand", label: "Brand" },
  { value: "education", label: "Education Platform or Experience Builder" },
  { value: "general", label: "General Inquiry" },
];

const WORKING_STYLE = {
  name: "working_style",
  label: "How would you like to work with us?",
  emailLabel: "Working style",
  type: "radio",
  options: [
    { value: "Thought Partner", label: "Thought Partner", help: "Strategic consulting and advisory support — we provide guidance, planning, structure, and expert recommendations while your team leads execution." },
    { value: "Team Extension", label: "Team Extension", help: "Strategic consulting + execution support — we act as an extension of your team across strategy, creative, content, education, partnerships, and experiences." },
    { value: "Not Sure Yet", label: "Not Sure Yet" },
  ],
};

const FLOWS = {
  creator: {
    sections: [
      { title: "Contact information", fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "social", label: "Instagram / TikTok / YouTube", type: "text" },
        { name: "specialty", label: "Primary specialty", emailLabel: "Specialty", type: "radio", options: ["Color","Cutting","Texture","Styling","Barbering","Business / Leadership","Other"].map((o)=>({value:o,label:o})) },
      ]},
      { title: "Experience", fields: [
        { name: "taught_before", label: "Have you taught professionally before?", emailLabel: "Taught before", type: "radio", options: [{value:"Yes",label:"Yes"},{value:"No",label:"No"}] },
        { name: "worked_with_brands", label: "Have you worked with brands before?", emailLabel: "Worked with brands", type: "radio", options: [{value:"Yes",label:"Yes"},{value:"No",label:"No"}] },
      ]},
      { title: "Support needed", fields: [
        { name: "support", label: "What are you looking for support with?", emailLabel: "Support needed", type: "checkbox", options: ["Representation & Management","Brand Partnership Opportunities","Education Opportunities","Speaking Opportunities","Career Positioning","Platform Growth","Long-Term Career Strategy","Not Sure Yet"].map((o)=>({value:o,label:o})) },
      ]},
      { title: "About you", fields: [
        { name: "about", label: "Tell us a little about yourself and your current goals.", emailLabel: "About", type: "textarea" },
      ]},
    ],
  },
  founder: {
    sections: [
      { title: "Contact information", fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "company", label: "Company", type: "text" },
        { name: "email", label: "Email", type: "email", required: true },
      ]},
      { title: "Support needed", fields: [
        { name: "support", label: "What are you looking for support with?", emailLabel: "Support needed", type: "checkbox", options: ["Strategic Planning & Growth Advisory","Brand Architecture","Offer Refinement","Sales Strategy","Brand Creative Direction","Digital Strategy","Not Sure Yet"].map((o)=>({value:o,label:o})) },
      ]},
      { title: "Project context", fields: [
        { name: "project_context", label: "What are you currently building, growing, or refining?", emailLabel: "Project", type: "textarea" },
      ]},
      { title: "Working style", fields: [WORKING_STYLE] },
    ],
  },
  brand: {
    sections: [
      { title: "Contact information", fields: [
        { name: "company", label: "Company name", type: "text", required: true },
        { name: "name", label: "Contact name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
      ]},
      { title: "Support needed", fields: [
        { name: "support", label: "What are you looking for support with?", emailLabel: "Support needed", type: "checkbox", options: ["Brand Strategy & Positioning","Creative Direction & Visual Identity","Digital Content Strategy","Education Development","Talent Partnerships","Event Activations","Production Support","Talent Placement","Not Sure Yet"].map((o)=>({value:o,label:o})) },
      ]},
      { title: "Project context", fields: [
        { name: "project_context", label: "Tell us about the project, campaign, or initiative.", emailLabel: "Project", type: "textarea" },
      ]},
      { title: "Timeline", fields: [
        { name: "timeline", label: "Timeline", type: "radio", options: ["ASAP","1–3 Months","3–6 Months","Flexible"].map((o)=>({value:o,label:o})) },
      ]},
      { title: "Investment range", fields: [
        { name: "investment", label: "Investment range", type: "radio", options: ["Under $5K","$5K–$10K","$10K–$25K","$25K+"].map((o)=>({value:o,label:o})) },
      ]},
      { title: "Working style", fields: [WORKING_STYLE] },
    ],
  },
  education: {
    sections: [
      { title: "Contact information", fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "company", label: "Company", type: "text" },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "website", label: "Website / Social links", type: "text" },
      ]},
      { title: "Support needed", fields: [
        { name: "support", label: "What are you looking for support with?", emailLabel: "Support needed", type: "checkbox", options: ["Education Strategy","Curriculum Design","Event Strategy","Experiential Programming","Production Oversight","Platform Development","Digital Strategy","Not Sure Yet"].map((o)=>({value:o,label:o})) },
      ]},
      { title: "Project context", fields: [
        { name: "project_context", label: "Tell us about your program, event, platform, or vision.", emailLabel: "Project", type: "textarea" },
      ]},
      { title: "Current stage", fields: [
        { name: "stage", label: "Current stage", type: "radio", options: ["Idea","Building","Launched","Scaling"].map((o)=>({value:o,label:o})) },
      ]},
      { title: "Working style", fields: [WORKING_STYLE] },
    ],
  },
  general: {
    sections: [
      { title: "Contact information", fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "company", label: "Company or social handle (optional)", type: "text" },
      ]},
      { title: "Your inquiry", fields: [
        { name: "regarding", label: "What are you reaching out regarding?", emailLabel: "Regarding", type: "textarea" },
        { name: "referral", label: "How did you hear about Social Art Group?", emailLabel: "Referral", type: "text" },
        { name: "anything_else", label: "Anything else you'd like us to know?", emailLabel: "Notes", type: "textarea" },
      ]},
    ],
  },
};

const MEDIA_KIT_CATEGORIES = ["creator", "founder", "brand", "education"];
const INTRO = { title: "Let's start the conversation", body: "Tell us a little about what you're building and how we can help. We'll review your inquiry and reach out if it feels like a good fit." };
const CONFIRMATION = { title: "Thank you for reaching out.", body: "Our team reviews every inquiry personally. If it feels like a strong fit, we'll be in touch with next steps." };

function blankValues(category) {
  const values = {};
  if (!category || !FLOWS[category]) return values;
  FLOWS[category].sections.forEach((s) => s.fields.forEach((f) => { values[f.name] = f.type === "checkbox" ? [] : ""; }));
  return values;
}

/* ============================================================
   COMPONENT
   ============================================================ */
export default function Contact() {
  const formRef = useRef();
  const [category, setCategory] = useState("");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const flow = category ? FLOWS[category] : null;
  const showMediaKit = MEDIA_KIT_CATEGORIES.includes(category);
  const categoryLabel = useMemo(() => CATEGORIES.find((c) => c.value === category)?.label || "", [category]);

  function chooseCategory(value) {
    // usi tab par dobara click = deselect (toggle)
    const next = value === category ? "" : value;
    setCategory(next);
    setValues(blankValues(next));
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
      const nextArr = current.includes(optionValue) ? current.filter((x) => x !== optionValue) : [...current, optionValue];
      return { ...v, [name]: nextArr };
    });
  }
  function onFileChange(e) {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 10 * 1024 * 1024) { setFileError("Please keep the file under 10MB."); setFile(null); return; }
    setFileError("");
    setFile(f);
  }
  function validate() {
    const next = {};
    flow.sections.forEach((s) => s.fields.forEach((f) => {
      if (!f.required) return;
      const val = values[f.name];
      const empty = f.type === "checkbox" ? !val || val.length === 0 : !String(val || "").trim();
      if (empty) next[f.name] = "This field is required.";
      if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) next[f.name] = "Please enter a valid email address.";
    }));
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) {
      document.querySelector("[data-error='true']")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("sending");
    setSubmitError("");
    try {
      let mediaKitUrl = "";
      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("applicant", values.name || values.company || "applicant");
        const uploadRes = await fetch(`${API_BASE}/api/upload-media-kit`, { method: "POST", body: fd });
        if (!uploadRes.ok) throw new Error("Media kit upload failed. Please try again.");
        const uploadData = await uploadRes.json();
        mediaKitUrl = uploadData.url || "";
      }
      const summaryRows = [];
      flow.sections.forEach((s) => s.fields.forEach((f) => {
        const val = values[f.name];
        const printable = Array.isArray(val) ? val.join(", ") : val;
        if (printable && String(printable).trim()) summaryRows.push(`${f.emailLabel || f.label}: ${printable}`);
      }));
      const templateParams = {
        inquiry_category: categoryLabel,
        user_name: values.name || values.company || "(no name)",
        user_email: values.email || "(no email)",
        summary: summaryRows.join("\n"),
        media_kit_url: mediaKitUrl || "No media kit uploaded.",
        submitted_at: new Date().toLocaleString(),
        page: typeof window !== "undefined" ? window.location.href : "",
        raw_json: JSON.stringify({ category: categoryLabel, ...values }, null, 2),
      };
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceID || !templateID || !publicKey) throw new Error("Email isn't configured yet (missing EmailJS env vars).");
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("sent");
    } catch (err) {
      console.error("Inquiry submit error:", err);
      setStatus("error");
      setSubmitError(err?.message || err?.text || "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="contact-section section" aria-label="Contact">
      <div className="contact-inner">
        <div className="contact-topbar">
          <div className="contact-topbar-socials">
            <a href="https://www.instagram.com/socialartgroup/" aria-label="Instagram" target="_blank" rel="noreferrer" className="social-link">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.6-3.4a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
            </a>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <h2 className="contact-display">contact<br />us.</h2>
          </div>

          <div className="contact-right">
            {/* ===== INQUIRY FORM ===== */}
            <div className="contact-inquiry inquiry-inner">
              {status === "sent" ? (
                <div className="inquiry-confirm" role="status">
                  <h2 className="inquiry-confirm-title">{CONFIRMATION.title}</h2>
                  <p className="inquiry-confirm-body">{CONFIRMATION.body}</p>
                  <button type="button" className="btn inquiry-restart" onClick={() => chooseCategory("")}>Submit another inquiry</button>
                </div>
              ) : (
                <>
                  <header className="inquiry-head">
                    <h2 className="inquiry-title">{INTRO.title}</h2>
                    <p className="inquiry-intro">{INTRO.body}</p>
                  </header>

                  <fieldset className="inquiry-fieldset">
                    <legend className="inquiry-legend">Who are you?</legend>
                    <div className="inquiry-cats">
                      {CATEGORIES.map((c) => (
                        <button key={c.value} type="button" className={`inquiry-cat ${category === c.value ? "is-active" : ""}`} aria-pressed={category === c.value} onClick={() => chooseCategory(c.value)}>{c.label}</button>
                      ))}
                    </div>
                  </fieldset>

                  {flow && (
                    <form ref={formRef} className="inquiry-form" onSubmit={handleSubmit} noValidate>
                      {flow.sections.map((section) => (
                        <fieldset key={section.title} className="inquiry-fieldset">
                          <legend className="inquiry-legend">{section.title}</legend>
                          {section.fields.map((f) => (
                            <Field key={f.name} field={f} value={values[f.name]} error={errors[f.name]} onText={(val) => setField(f.name, val)} onToggle={(opt) => toggleCheckbox(f.name, opt)} />
                          ))}
                        </fieldset>
                      ))}

                      {showMediaKit && (
                        <fieldset className="inquiry-fieldset">
                          <legend className="inquiry-legend">Media kit (optional)</legend>
                          <p className="inquiry-help">Share a deck, portfolio, or media kit — PDF, image, PPTX, or ZIP, up to 10MB.</p>
                          <label className="inquiry-file">
                            <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.pptx" onChange={onFileChange} />
                            <span className="inquiry-file-btn">Choose file</span>
                            <span className="inquiry-file-name">{file ? file.name : "No file selected"}</span>
                          </label>
                          {fileError && <p className="inquiry-err">{fileError}</p>}
                        </fieldset>
                      )}

                      <div className="inquiry-actions">
                        <button type="submit" className="btn" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit inquiry"}</button>
                        {status === "error" && <span className="inquiry-err" role="alert">{submitError}</span>}
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* ===== CONTACT INFO (form ke neeche) ===== */}
            <div className="contact-info">
              <div className="contact-row"><p className="label">email:</p><p className="value"><a href="mailto:marlene@socialartgroup.com">marlene@socialartgroup.com</a></p></div>
              <div className="contact-row"><p className="label">phone:</p><p className="value"><a href="tel:9175137555">+1 917 513 7555</a></p></div>
              <div className="contact-row"><p className="label">address:</p><p className="value">1070 norumbega dr. monrovia, ca 91016</p></div>
              <div className="contact-row"><p className="label">instagram:</p><p className="value"><a href="https://instagram.com/socialartgroup" target="_blank" rel="noreferrer">@socialartgroup</a></p></div>
              <div className="contact-row"><p className="label">website:</p><p className="value"><a href="https://socialartgroup.com">socialartgroup.com</a></p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
              <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => onText(opt.value)} />
              <span>{opt.label}{opt.help && <small className="inquiry-option-help">{opt.help}</small>}</span>
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
              <input type="checkbox" name={name} value={opt.value} checked={(value || []).includes(opt.value)} onChange={() => onToggle(opt.value)} />
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
        <span className="inquiry-label">{label}{field.required && <em className="inquiry-req"> *</em>}</span>
        <textarea name={name} rows={5} value={value || ""} onChange={(e) => onText(e.target.value)} />
        {help && <small className="inquiry-option-help">{help}</small>}
        {hasError && <p className="inquiry-err">{error}</p>}
      </label>
    );
  }
  return (
    <label className="inquiry-field" data-error={hasError}>
      <span className="inquiry-label">{label}{field.required && <em className="inquiry-req"> *</em>}</span>
      <input type={type === "email" ? "email" : "text"} name={name} value={value || ""} onChange={(e) => onText(e.target.value)} />
      {hasError && <p className="inquiry-err">{error}</p>}
    </label>
  );
}
