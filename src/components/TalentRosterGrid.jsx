import React from "react";
import sampleImg from "../assets/images.jpg";

/* SECTION 1 */
const section1 = [
  { name: "johnny ramirez", handle: "@johnnyramirez" },
  { name: "leysa carrillo", handle: "@leysahairandmakeup" },
  { name: "sonna brado", handle: "@sonnabrado" },
  { name: "wes palmer", handle: "@wesdoeshair" },
  { name: "jessica scott santo", handle: "@jessicascotthair" },
  { name: "jack howard", handle: "@jackhowardcolor" },

  { name: "min kim", handle: "@minkimcolorist" },
  { name: "michelle o'connor", handle: "@michelleoconnorbeauty" },
  { name: "ira pope sage", handle: "@irapopesage" },
  { name: "tippi shorter", handle: "@tippishorter" },
  { name: "lisa giles", handle: "@lifeoflisag" },
  { name: "savvy hicks", handle: "@thesavvytouch" },
];

/* SECTION 2 */
const section2 = [
  { name: "gina bianca", handle: "@itsginabianca" },
  { name: "pekela riley", handle: "@pekelariley" },
  { name: "j ladner", handle: "@itsmrjladner" },
  { name: "chita beseau", handle: "@chitabeseau" },
  { name: "ethan king", handle: "@slickback_buttahtoast" },
  { name: "laura gibson", handle: "@lgibsoncolorist" },

  { name: "rolando aqui", handle: "@rolandoaqui" },
  { name: "jay mahmood", handle: "@jaymahmood" },
  { name: "whitney vermeer", handle: "@whitneyvermeer" },
  { name: "greg gilmore", handle: "@greg_gilmore" },
  { name: "jorge x", handle: "@xpresioncreativos spain" },
  { name: "tyler mascio", handle: "@mac_daddybeauty" },
];

/* REUSABLE GRID */
function Grid({ data }) {
  return (
    <div className="roster-grid">
      {data.map((item, i) => (
        <div className="roster-item" key={i}>
          <div className="img-wrap">
            <img src={sampleImg} alt={item.name} />
          </div>

          <h4>{item.name}</h4>
          <p>{item.handle}</p>
        </div>
      ))}
    </div>
  );
}

export default function TalentRosterGrid() {
  return (
    <>
      {/* SECTION 1 */}
      <section className="roster">
        <div className="roster-top">
          <div className="left">
            social art group <span>where art meets strategy</span>
          </div>

          <div className="center">talent roster</div>

          <div className="right">2026</div>
        </div>

        <Grid data={section1} />
      </section>

      {/* SECTION 2 */}
      <section className="roster">
        <div className="roster-top">
          <div className="left">
            social art group <span>where art meets strategy</span>
          </div>

          <div className="center">talent roster</div>

          <div className="right">2026</div>
        </div>

        <Grid data={section2} />
      </section>
    </>
  );
}