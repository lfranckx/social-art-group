import React from "react";
import logoSmall from "../assets/logo-small.png"; // small header logo (from Canva)
export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">

        {/* top bar with logo left and socials right */}
        <div className="about-topbar" role="toolbar" aria-label="About toolbar">
          <a href="#hero" className="about-topbar-logo" aria-label="Home">
            <img src={logoSmall} alt="Social Art Group" />
          </a>

          <div className="about-topbar-socials" aria-label="Social links">
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.6-3.4a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
            </a>
          </div>
        </div>

        {/* main grid: left display + right copy */}
        <div className="about-content-grid">
          <div className="about-left">
            <h2 className="about-display">who we<br/>are.</h2>
          </div>

          <div className="about-right">
            <h3 className="about-headline">
              We’re not redefining the agency model — we’re replacing it.
            </h3>

            <div className="about-copy">
              <p>We don’t just represent talent; we elevate it.</p>

              <p>
                We merge creative services, strategic direction, and intentional career development into a unified powerhouse built for modern creators and culturally driven brands.
              </p>

              <p>
                Representation, strategy, and creative converge here to shape work that resonates, careers that rise, and partnerships that move culture forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
