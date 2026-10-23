import { useRef, useEffect } from "react";

const leaf = {
  wiki: "Shared foundation the rest of the suite builds on. Handles themeing, ingame wiki, and the hud buttons",
  guilds:
    "Simple teams mod that most player handling PhoenixSuite mods use.",
  solaris:
    "Map mod that handles quite a lot visually and a few mods rely on it.",
  domains:
    "Simple claiming mod that the world focused PhoenixSuite mods rely on.",
  chronicles:
    "Questbook mod focused on dev power and configurability. Archives, PhoenixCore, and Domains depend on it.",
  phoenix_forge_technologies:
    "The flagship modpack all the mods were designed to fit into. Every PhoenixSuite mod is meant to fit nicely into PFT.",
  core: "Coremod for PFT hosting all the pack specific wild ideas. Most PhoenixSuite mods have special behavior for it.",
  archives:
    "Simple lore codex mod that has support for Chronicles and vice versa.",
  excavate:
    "A vein mine/place/replace mod that nothing explicitly relies on.",
  essentials:
    "An essential commands mod that nothing relies on.",
  fission:
    "A powerful and configurable nuclear fission addon for GT:M. Phoenixcore relies on it.",
  tesla:
      "A powerful and configurable wireless eu addon for GT:M. Phoenixcore relies on it.",
  phantasia:
    "3d/2d tutorials mod with support for many mods. Has support for chronicles",
  continuum:
      "The PhoenixSuite's space mod. Phoenixcore relies on it.",
};

const entries = Object.entries(leaf);

const fit = (el, init) => {
  const box = el.firstChild;
  const lis = [...box.firstChild.children];
  if (init) {
    lis.forEach((li) => (li.style.height = ""));
    const h = Math.max(...lis.map((li) => li.offsetHeight));
    lis.forEach((li) => (li.style.height = `${h}px`));
    el.style.height = box.style.height = `${h * 5}px`;
    box.style.marginBottom = `${-h * 5}px`;
    [...el.children].slice(1).forEach((d) => (d.style.height = `${h}px`));
  }
  const h = lis[0].offsetHeight;
  const t = el.scrollTop / h;
  box.firstChild.style.transform = `translateY(${-Math.min(Math.max(t - 2, 0), lis.length - 5) * h}px)`;
  lis.forEach((li, i) => {
    const d = Math.min(Math.abs(i - t), 1);
    li.style.opacity = 0.15 + 0.85 * (1 - d) ** 2;
    li.style.transform = `scale(${1 - d * 0.1})`;
  });
};

export default function Showcase() {
  const ref = useRef(null);

  useEffect(() => {
    const init = () => fit(ref.current, true);
    init();
    document.fonts.ready.then(init);
    addEventListener("resize", init);
    return () => removeEventListener("resize", init);
  }, []);

  return (
    <div
      ref={ref}
      onScroll={(e) => fit(e.currentTarget)}
      style={{
        overflowY: "auto",
        scrollbarWidth: "none",
        scrollSnapType: "y mandatory",
      }}
    >
      <div style={{ position: "sticky", top: 0, overflow: "hidden" }}>
        <ul className="tree-list" style={{ margin: "0 0 0 32px" }}>
          {entries.map(([key, value]) => (
            <li key={key} style={{ transformOrigin: "left center" }}>
              <span className="tree-path">{key}</span>
              <span className="tree-desc">{value}</span>
            </li>
          ))}
        </ul>
      </div>
      {entries.concat([0, 0, 0, 0]).map((_, i) => (
        <div key={i} style={{ scrollSnapAlign: "start" }} />
      ))}
    </div>
  );
}
