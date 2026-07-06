import React from "react";
import sampleImg from "../assets/images.jpg";
import johnny from '../assets/talent/3 2.png';
import leysa from '../assets/talent/3 5.png';
import sonna from '../assets/talent/3 6.png';
import wes from '../assets/talent/3 8.png';
import jes from '../assets/talent/3 10.png';
import jack from '../assets/talent/3 13.png';
import min from '../assets/talent/3 3.png';
import mic from '../assets/talent/3 4.png';
import ira from '../assets/talent/3 7.png';
import tip from '../assets/talent/3 9.png';
import lisa from '../assets/talent/3 11.png';
import sav from '../assets/talent/3 12.png';

import gina from '../assets/talent/4 3.png';
import pekela from '../assets/talent/4 7.png';
import jlad from '../assets/talent/4 10.png';
import chita from '../assets/talent/4 9.png';
import ethan from '../assets/talent/4 13.png';
import laura from '../assets/talent/4 14.png';
import rol from '../assets/talent/4 5.png';
import jay from '../assets/talent/4 6.png';
import whit from '../assets/talent/4 8.png';
import greg from '../assets/talent/4 11.png';
import jorge from '../assets/talent/4 12.png';
import tyler from '../assets/talent/4 15.png' 
import erin from "../assets/talent/erin-1.jpg";
import danielle from "../assets/talent/danielle-1.jpg";

/* SECTION 1 */
const section1 = [
  { name: "johnny ramirez", handle: "@johnnyramirez", img: johnny },
  { name: "leysa carrillo", handle: "@leysahairandmakeup", img: leysa },
  { name: "sonna brado", handle: "@sonnabrado", img: sonna },
  { name: "wes palmer", handle: "@wesdoeshair", img: wes },
  { name: "jessica scott santo", handle: "@jessicascotthair", img: jes },
  { name: "jack howard", handle: "@jackhowardcolor", img: jack },

  { name: "min kim", handle: "@minkimcolorist", img: min },
  { name: "michelle o'connor", handle: "@michelleoconnorbeauty", img: mic },
  { name: "ira pope sage", handle: "@irapopesage", img: ira },
  { name: "tippi shorter", handle: "@tippishorter", img: tip },
  { name: "lisa giles", handle: "@lifeoflisag", img: lisa },
  { name: "savvy hicks", handle: "@thesavvytouch", img: sav },
];

/* SECTION 2 */
const section2 = [
  { name: "gina bianca", handle: "@itsginabianca", img: gina },
  { name: "pekela riley", handle: "@pekelariley", img: pekela },
  { name: "j ladner", handle: "@itsmrjladner", img: jlad },
  { name: "chita beseau", handle: "@chitabeseau", img: chita },
  { name: "ethan king", handle: "@slickback_buttahtoast", img: ethan },
  { name: "laura gibson", handle: "@lgibsoncolorist", img: laura },

  { name: "rolando aqui", handle: "@rolandoaqui", img: rol },
  { name: "jay mahmood", handle: "@jaymahmood", img: jay },
  { name: "whitney vermeer", handle: "@whitneyvermeer", img: whit },
  { name: "greg gilmore", handle: "@greg_gilmore", img: greg },
  { name: "jorge x", handle: "@xpresioncreativos spain", img: jorge },
  { name: "Erin Ray", handle: "@erinrayhair", img: erin },
  { name: "Danielle Fusco", handle: "@_danielledoeshair", img: danielle },
  // { name: "tyler mascio", handle: "@mac_daddybeauty", img: tyler },
];

/* REUSABLE GRID */
function Grid({ data }) {
  return (
    <div className="roster-grid">
      {data.map((item, i) => (
        <div className="roster-item" key={i}>
          <div className="img-wrap">
            <img src={item.img || sampleImg} alt={item.name} />
          </div>

          <h4>{item.name}</h4>

          <p>
            <a 
              href={`https://instagram.com/${item.handle.replace('@', '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {item.handle}
            </a>
          </p>

          
        </div>
      ))}
    </div>
  );
}

export default function TalentRosterGrid() {
  return (
    <section id="talent-roster" className="roster-section">
      {/* SECTION 1 */}
      <div className="roster">
        <div className="roster-top">
          <div className="left">
            social art group <span>where art meets strategy</span>
          </div>

          <div className="center">talent roster</div>

          <div className="right">2026</div>
        </div>

        <Grid data={section1} />
      </div>

      {/* SECTION 2 */}
      <div className="roster">
        <Grid data={section2} />
      </div>
    </section>
  );
}