import "../style.css";
import { useState, useEffect } from "react";

export const PROJECTS = [
  {
    name: "PhoenixCore",
    status: "active",
    desc: "The Core-mod for the pack Phoenix Forge Technologies",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/PhoenixCore",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenixcore",
  },
  {
    name: "Phoenix Forge Technologies",
    status: "active",
    desc: "The main modpack built using the PhoenixSuite.",
    githubUrl:
      "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Forge-Technologies",
    cfUrl: "https://www.curseforge.com/minecraft/modpacks/phoenix-forge-technologies",
  },
  {
    name: "Phoenix Chronicles",
    status: "active",
    desc: "A modern quest/progression system with FTB Quests import support.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/PhoenixChronicles",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenix-chronicles-quests",
  },
  {
    name: "PhoenixContinuum",
    status: "active",
    desc: "Continuum is a space exploration mod with a focus on planetary bodies as the central point instead of dimensions.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/PhoenixContinuum",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/continuum-space",
  },
  {
    name: "Phoenix's Fission",
    status: "active",
    desc: "A configurable and powerful GT:M fission addon.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix_Fission",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenixs-fission",
  },
  {
    name: "Phoenix Tesla Network",
    status: "active",
    desc: "A wireless eu GT:M addon with a lot of configurability.",
    githubUrl:
      "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Tesla-Network",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenix-tesla-network",
  },
  {
    name: "Phoenix Guilds",
    status: "maintenance",
    desc: "Guilds is a simple and easy to use teams mod.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Guilds",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenix-guilds",
  },
  {
    name: "Phoenix Domains",
    status: "maintenance",
    desc: "A simple claiming mod with support for Solaris, Journeymap, and Xearos",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Domains",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenix-domains",
  },
  {
    name: "Solaris",
    status: "maintenance",
    desc: "A beautiful and configurable map mod",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Solaris",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/solaris-map",
  },
  {
    name: "Phoenix Excavate",
    status: "maintenance",
    desc: "A vein mine/replace/place mod with a solid api and usability.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/PhoenixExcavate",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenix-excavate",
  },
  {
    name: "Phoenix Essentials",
    status: "maintenance",
    desc: "An essential commaands mod with decent api.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/PhoenixEssentials",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenix-essentials",
  },
  {
    name: "Phoenix Archive",
    status: "maintenance",
    desc: "A lore codex mod with good api and powerful GUI based events.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Archive",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenixs-archives",
  },
  {
    name: "Phoenix Chromatic Codes",
    status: "maintenance",
    desc: "A powerful and pretty custom color/effects using base minecraft formatting.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/PhoenixChromaticCodes",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenixs-chromatic-colors",
  },
  {
    name: "Phantasia",
    status: "maintenance",
    desc: "A 3d/2d tutorials mod with support for GT:M and a bunch of other mods",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phantasia",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phantasia",
  },
  {
    name: "Phoenix Gregic Additions",
    status: "limbo",
    desc: "A bunch of random additions to GT:M. Gets ported to newer gtm versions but thats it.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix_Gregic_Additons",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/phoenix-gregic-additons",
  },
  {
    name: "Oculus Unofficial",
    status: "limbo",
    desc: "A fork of oculus designed to make it easier to handle shaders in PFT. Currently in limbo due to difficulties.",
    githubUrl: "https://github.com/Phoenixvine32908/Oculus",
    cfUrl: "https://www.curseforge.com/minecraft/mc-mods/oculus-unofficial",
  },
];

export const STATUS_LABEL = {
  active: "Active",
  maintenance: "Maintenance",
  limbo: "Limbo",
};

const githubStatsCache = new Map();

function parseGithubRepo(url) {
  if (!url) return null;
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  return m ? `${m[1]}/${m[2]}` : null;
}

function timeAgo(isoDate) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function Stats({ repo, flipped }) {
  const [fetched, setFetched] = useState(null);
  const [failed, setFailed] = useState(false);
  const info = githubStatsCache.get(repo) ?? fetched;

  useEffect(() => {
    if (!flipped || !repo || info || failed) return;
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        const result = {
          stars: data.stargazers_count,
          updated: data.pushed_at,
        };
        githubStatsCache.set(repo, result);
        if (!cancelled) setFetched(result);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [flipped, repo, info, failed]);

  if (!repo) return <p class="project-stats is-error">no GitHub repo linked</p>;
  if (info)
    return (
      <p class="project-stats" data-loaded="true">
        <span class="stat-stars">★ {info.stars}</span>
        <span class="stat-updated">updated {timeAgo(info.updated)}</span>
      </p>
    );
  if (failed)
    return (
      <p class="project-stats is-error">GitHub stats unavailable right now</p>
    );
  if (flipped)
    return <p class="project-stats is-loading">loading GitHub stats…</p>;
  return <p class="project-stats" data-loaded="false"></p>;
}

export default function ProjectCard({ p }) {
  const [flipped, setFlipped] = useState(false);
  const repo = parseGithubRepo(p.githubUrl);
  const frontTab = flipped ? -1 : 0;
  const backTab = flipped ? 0 : -1;

  const github = p.githubUrl ? (
    <a href={p.githubUrl} target="_blank" rel="noopener" tabIndex={backTab}>
      GitHub
    </a>
  ) : (
    <span class="link-disabled">GitHub</span>
  );
  const cf = p.cfUrl ? (
    <a href={p.cfUrl} target="_blank" rel="noopener" tabIndex={backTab}>
      CurseForge
    </a>
  ) : (
    <span class="link-disabled">CurseForge</span>
  );

  return (
    <div
      class={`project-card-flip${flipped ? " is-flipped" : ""}`}
      data-status={p.status}
      data-repo={repo || undefined}
    >
      <div class="project-card-inner">
        <div
          class="project-card-face is-front"
          aria-hidden={flipped ? "true" : "false"}
        >
          <div class="project-card-head">
            <span class="project-name">{p.name}</span>
            <span class="status-tag">
              <span class={`status-dot status-${p.status}`}></span>
              {STATUS_LABEL[p.status] || p.status}
            </span>
          </div>
          <p class="project-desc">{p.desc}</p>
          <button
            class="flip-btn front"
            type="button"
            tabIndex={frontTab}
            aria-label={`Show links and GitHub stats for ${p.name}`}
            onClick={() => setFlipped(true)}
          >
            details &rarr;
          </button>
        </div>
        <div
          class="project-card-face is-back"
          aria-hidden={flipped ? "false" : "true"}
        >
          <div class="project-card-head">
            <span class="project-name">{p.name}</span>
            <span class="card-id">{p.catalogId || ""}</span>
          </div>
          <div class="project-links">
            {cf}
            {github}
          </div>
          <Stats repo={repo} flipped={flipped} />
          <button
            class="flip-btn back"
            type="button"
            tabIndex={backTab}
            aria-label={`Back to ${p.name} overview`}
            onClick={() => setFlipped(false)}
          >
            &larr; back
          </button>
        </div>
      </div>
    </div>
  );
}
