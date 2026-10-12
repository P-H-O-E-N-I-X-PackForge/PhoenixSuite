
import "../style.css";
import { useState, useEffect } from "react";

export const PROJECTS = [
  {
    name: "PhoenixCore",
    status: "active",
    desc: "The Core-mod for the pack Phoenix Forge Technologies",
    githubUrl: "https://github.com/Omicron-Industries/PhoenixCore",
    cfUrl: null,
  },
  {
    name: "Phoenix Forge Technologies",
    status: "active",
    desc: "The main Forge modpack built using the PhoenixSuite.",
    githubUrl:
      "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Forge-Technologies",
    cfUrl: null,
  },
  {
    name: "Phoenix Chronicles",
    status: "active",
    desc: "A modern quest/progression system with FTB Quests import support. Bug fixes.",
    githubUrl: "https://github.com/Omicron-Industries/PhoenixChronicles",
    cfUrl: null,
  },
  {
    name: "Phoenix's Fission",
    status: "active",
    desc: "API is stable - bug fixes land as MoniLabs adopts it.",
    githubUrl: "https://github.com/Omicron-Industries/Phoenix_Fission",
    cfUrl: null,
  },
  {
    name: "Phoenix Tesla Network",
    status: "active",
    desc: "Small bugs outstanding, needs recipes.",
    githubUrl:
      "https://github.com/P-H-O-E-N-I-X-PackForge/Phoenix-Tesla-Network",
    cfUrl: null,
  },
  {
    name: "Phoenix Guilds",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Omicron-Industries/Phoenix-Guilds",
    cfUrl: null,
  },
  {
    name: "Phoenix Domains",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Omicron-Industries/Phoenix-Domains",
    cfUrl: null,
  },
  {
    name: "Solaris",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Omicron-Industries/Solaris",
    cfUrl: null,
  },
  {
    name: "Phoenix Ultimine",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: null,
    cfUrl: null,
  },
  {
    name: "Phoenix Essentials",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Phoenixvine32908/PhoenixEssentials",
    cfUrl: null,
  },
  {
    name: "Phoenix Archive",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Phoenixvine32908/Phoenix-Archive",
    cfUrl: null,
  },
  {
    name: "Phoenix Chromatic Codes",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/Omicron-Industries/PhoenixChromaticCodes",
    cfUrl: null,
  },
  {
    name: "Phantasia",
    status: "maintenance",
    desc: "Maintenance mode.",
    githubUrl: "https://github.com/P-H-O-E-N-I-X-PackForge/Phantasia",
    cfUrl: null,
  },
  {
    name: "Phoenix Gregic Additions",
    status: "limbo",
    desc: "Mostly abandoned - updated on request (Sky of Grind).",
    githubUrl: null,
    cfUrl: null,
  },
  {
    name: "Oculus Unofficial",
    status: "limbo",
    desc: "In limbo, no current plans to work on it.",
    githubUrl: null,
    cfUrl: null,
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
