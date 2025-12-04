import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import logoSmall from "../assets/logo-small.png"; 

// Temporary debug — remove after verification
console.log("EmailJS env:",
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

// keep the top-left logo for this card
export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error" | "env-missing"
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setStatus("env-missing");
      setErrorMsg("EmailJS env vars missing. See README or .env");
      return;
    }

    try {
      await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      setStatus("sent");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS send error:", err);
      setStatus("error");
      setErrorMsg(err?.text || "Unable to send — check console for details.");
    }
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact">
      <div className="contact-inner">
        {/* topbar: left logo + social on right (keeps visual consistency) */}
        <div className="contact-topbar">
          <a className="contact-topbar-logo" href="#hero" aria-label="Home">
            <img src={logoSmall} alt="Social Art Group" />
          </a>

          <div className="contact-topbar-socials">
            <a href="https://instagram.com/yourhandle" aria-label="Instagram" target="_blank" rel="noreferrer" className="social-link">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.6-3.4a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
            </a>
          </div>
        </div>

        {/* content grid: left rotated heading, right form */}
        <div className="contact-grid">
          <div className="contact-left">
            <h2 className="contact-display">contact<br/>us.</h2>
          </div>

          <div className="contact-right">
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              <label className="field">
                <input name="user_name" placeholder="name" required />
              </label>

              <label className="field">
                <input name="user_email" type="email" placeholder="email*" required />
              </label>

              <label className="field">
                <textarea name="message" placeholder="message" rows="8" required />
              </label>

              <div className="form-row">
                <button type="submit" className="btn" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send"}
                </button>

                {/* small status messages */}
                <div className="status">
                  {status === "sent" && <span className="ok">Thanks — message sent!</span>}
                  {status === "error" && <span className="err">Error sending. Try again.</span>}
                  {status === "env-missing" && <span className="err">Email config missing.</span>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
