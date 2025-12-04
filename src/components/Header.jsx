import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png"; // put your logo here

export default function Header() {
  const [visible, setVisible] = useState(false);    // header visible when true
  const [scrolledPastHero, setScrolledPastHero] = useState(false); // to add bg after hero
  const lastScroll = useRef(0);
  const heroHeight = useRef(0);

  useEffect(() => {
    // measure hero height (if exists)
    const heroEl = document.getElementById("hero");
    heroHeight.current = heroEl ? heroEl.getBoundingClientRect().height : 480;

    const onScroll = () => {
      const curr = window.pageYOffset;

      // if we are above hero bottom, we are "over" the hero; otherwise we've scrolled past it
      setScrolledPastHero(curr > heroHeight.current - 40); // 40px tolerance

      // show header only when user scrolls up, hide when scrolling down
      if (curr < lastScroll.current) {
        // scrolling up
        setVisible(true);
      } else if (curr > lastScroll.current) {
        // scrolling down
        setVisible(false);
      }

      // remember last
      lastScroll.current = curr;
    };

    // initial state: header hidden on load
    lastScroll.current = window.pageYOffset;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      heroHeight.current = heroEl ? heroEl.getBoundingClientRect().height : heroHeight.current;
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={[
        "site-header",
        visible ? "visible" : "hidden",
        scrolledPastHero ? "scrolled-past-hero" : "over-hero",
      ].join(" ")}
      aria-label="Main header"
    >
      <div className="header-inner">
        <div className="left">
          <a href="#hero" className="logo-link" aria-label="Home">
            <img src={logo} alt="Social Art Group" className="logo" />
          </a>
        </div>

        <nav className={`nav ${visible ? "nav-visible" : "nav-hidden"}`} aria-label="Primary">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
