import React from "react";

const SERVICES = [
  {
    title: "management +\nrepresentation",
    kicker: "for influencers, artists + creators",
    body:
      "we represent and manage talent with a long-term vision — aligning creators with brands, platforms, and opportunities that strengthen credibility, authority, and sustainable growth.",
    tone: "dark",
  },
  {
    title: "pro beauty corporate\ntalent placement",
    kicker: "strategic headhunting & industry alignment",
    body:
      "we identify and place high-level talent within leading beauty brands, distributors, and organizations — ensuring alignment in skillset, culture, and long-term vision.",
    tone: "dark",
  },
  {
    title: "sales strategy",
    kicker: "growth with alignment",
    body:
      "we help align your revenue model with your brand strategy — ensuring sales systems support sustainable growth without compromising values or clarity.",
    tone: "light",
  },
  {
    title: "brand & strategic\nfoundation",
    kicker: "we’re obsessed with strategy",
    body:
      "we help you define who you are, what you stand for, and where you’re headed — creating the strategic foundation that guides every decision, message, and move forward.",
    tone: "light",
  },
  {
    title: "creative direction +\nvisual identity",
    kicker: "strategy you can see",
    body:
      "we translate strategy into a cohesive creative vision and visual language that feels intentional, recognizable, and aligned across every touchpoint.",
    tone: "light",
  },
  {
    title: "education strategy +\ncurriculum design",
    kicker: "from expertise to impact",
    body:
      "we help turn knowledge into structured, scalable education — designing programs and curriculum that inform, empower, and create lasting value.",
    tone: "light",
  },
  {
    title: "digital strategy and\nplatform builds",
    kicker: "what you say, where you show up, and why it matters",
    body:
      "we help you define your voice, shape your narrative, and build the platforms that support it — from social ecosystems to owned digital spaces that centralize audience and growth.",
    tone: "light",
  },
  {
    title: "creative direction and\nproduction",
    kicker: "ideas carried through with care",
    body:
      "we guide creative from concept through execution, ensuring work is produced thoughtfully, consistently, and in service of the larger strategy.",
    tone: "dark",
  },
  {
    title: "events and activations",
    kicker: "experiences that connect",
    body:
      "we design and support events and activations that bring brands and communities together through meaningful, well-executed experiences.",
    tone: "dark",
  },
];

function ServiceCard({ title, kicker, body, tone }) {
  const lines = title.split("\n");

  return (
    <article className={`service-card ${tone === "dark" ? "is-dark" : "is-light"}`}>
      <h3 className="service-title">
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>

      <p className="service-kicker">{kicker}</p>
      <p className="service-body">{body}</p>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="services-section section" aria-label="Services">
      <div className="services-inner">
        {/* topbar */}
        <div className="services-topbar" role="toolbar" aria-label="Services toolbar">
          <a href="#hero" className="services-topbar-logo" aria-label="Home" />
          <div className="services-topbar-socials" aria-label="Social links">
            <a
              href="https://www.instagram.com/socialartgroup/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.6-3.4a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Title ABOVE the grid */}
        <div className="services-heading">
          <h2 className="services-display">
            services
          </h2>
        </div>

        {/* Grid FULL WIDTH */}
        <div className="services-cards" role="list">
          {SERVICES.map((svc, idx) => (
            <div key={`${svc.title}-${idx}`} role="listitem">
              <ServiceCard {...svc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}