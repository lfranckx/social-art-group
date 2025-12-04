import React from "react";
import heroVideo from "../assets/SAG_Site_Video.mp4"; // ensure file exists
import logo from "../assets/Logo_Black-Square.png";

export default function Hero() {
  return (
    <section id="hero" className="hero-wrapper">
      <div className="hero-card" role="region" aria-roledescription="video hero">
        {/* video element: poster provides fallback visual if video fails */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={logo} /* small visible fallback */
        >
          {/* use both webm & mp4 if you have them */}
          <source src={heroVideo} type="video/mp4" />
          {/* <source src={heroVideoWebm} type="video/webm" /> */}
          Sorry, your browser doesn't support embedded videos.
        </video>

        <div className="hero-overlay" aria-hidden="true">
          <img src={logo} alt="Social Art Group" className="hero-logo" />
          <p className="hero-tagline">A new era of creative partnership is launching soon.</p>
        </div>
      </div>
    </section>
  );
}
