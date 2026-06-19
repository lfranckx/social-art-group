import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import InquiryForm from "./components/InquiryForm";
import Services from "./components/Services";
// import TalentRosterIntro from "./components/TalentRosterIntro";
import TalentRosterGrid from "./components/TalentRosterGrid";

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        {/* <TalentRosterIntro /> */}
        <TalentRosterGrid />
        <InquiryForm />
        <Contact />
        
      </main>
    </div>
  );
}
