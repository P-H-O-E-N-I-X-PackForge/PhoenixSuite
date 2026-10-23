import { useRef, useEffect } from "react";

const leaf = {
  wiki: "Shared foundation the rest of the suite builds on. Handles themeing, ingame wiki, and the hud buttons",
  guilds:
      "Coremod for PFT hosting all the pack specific wild ideas. Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
  solaris:
      "Coremod for PFT hosting all the pack specific wild ideas. Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
  domains:
      "Coremod for PFT hosting all the pack specific wild ideas. Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
  chronicles:
      "Questbook mod focused on dev power and configurability. Archives, PhoenixCore, and Domains depend on it.",
  "forge-technologies":
      "The flagship modpack all the mods were designed to fit into. Every PhoenixSuite mod is meant to fit nicely into PFT.",
  core: "Coremod for PFT hosting all the pack specific wild ideas.Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
  archives:
      "Coremod for PFT hosting all the pack specific wild ideas. Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
  excative:
      "Coremod for PFT hosting all the pack specific wild ideas. Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
  essentials:
      "Coremod for PFT hosting all the pack specific wild ideas. Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
  fission:
      "Coremod for PFT hosting all the pack specific wild ideas. Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
  phantasia:
      "Coremod for PFT hosting all the pack specific wild ideas. Chronicles has optional compatability into PhoenixCore's internal research system named Conflux of Research.",
};

const entries = Object.entries(leaf);

export default function Showcase() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const box = el.firstChild;
    const lis = [...box.firstChild.children];

    const init = () => {
      lis.forEach((li) => (li.style.height = ""));
      const h = Math.max(...lis.map((li) => li.offsetHeight));
      lis.forEach((li) => (li.style.height = `${h}px`));
      el.style.height = `${h * 5}px`;
      box.style.height = `${h * 5}px`;
      box.style.marginBottom = `${-h * 5}px`;
      [...el.children].slice(1).forEach((d) => (d.style.height = `${h}px`));
    };

    init();
    document.fonts.ready.then(init);
    window.addEventListener("resize", init);

    const handleScroll = () => {
      const h = lis[0].offsetHeight;
      const t = el.scrollTop / h;
      box.firstChild.style.transform = `translateY(${-Math.min(Math.max(t, 0), lis.length - 5) * h}px)`;
      lis.forEach((li, i) => {
        const d = Math.min(Math.abs(i - t), 1);
        li.style.opacity = 0.15 + 0.85 * (1 - d) ** 2;
        li.style.transform = `scale(${1 - d * 0.1})`;
      });
    };

    el.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", init);
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <div
          ref={ref}
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            scrollSnapType: "y mandatory",
            position: "relative",
          }}
      >
        <div style={{ position: "sticky", top: 0, overflow: "hidden" }}>
          <ul className="tree-list" style={{ margin: "0 0 0 32px" }}>
            {entries.map(([key, value]) => (
                <li key={key} style={{ scrollSnapAlign: "start", transformOrigin: "left center" }}>
                  <span className="tree-path">{key}</span>
                  <span className="tree-desc">{value}</span>
                </li>
            ))}
          </ul>
        </div>
        {entries.map((_, i) => (
            <div key={i} style={{ height: "50px", scrollSnapAlign: "start" }} />
        ))}
      </div>
  );
}