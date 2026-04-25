import React from "react";

import img1 from "../assets/t1.png";
import img2 from "../assets/t2.png";
import img3 from "../assets/t3.png";
import img4 from "../assets/t4.png";
import img5 from "../assets/t5.png";

export default function TalentRosterIntro() {
  return (
    <section id="talent-roster" className="talent-intro">

      <div className="talent-heading">
        <h2>talent roster</h2>
      </div>

      <div className="section-card">
        <div className="talent-grid">

          {/* TOP ROW */}
          <img src={img1} alt="" className="grid-item img1" />
          <img src={img2} alt="" className="grid-item img2" />
          <img src={img3} alt="" className="grid-item img3" />
          <img src={img4} alt="" className="grid-item img4" />

          {/* BOTTOM ROW */}
          <div className="grid-item text-block">
            <div className="text-inner">
              <h4>artists, educators & influencers</h4>

              <p>
                the <strong>social art group</strong> roster represents respected artists,
                educators, and influencers across all professional beauty disciplines.
              </p>

              <p>
                we partner with individuals who lead through expertise, credibility,
                and long-term influence collaborating with top brands worldwide.
              </p>
            </div>
          </div>

          <img src={img5} alt="" className="grid-item img5" />

          <div className="grid-item empty1"></div>
          <div className="grid-item empty2"></div>

        </div>
      </div>

    </section>
  );
}