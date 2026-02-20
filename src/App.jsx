import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
