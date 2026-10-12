import "../style.css";
import ProjectCard, { PROJECTS } from "../components/ProjectCard";
import { useState } from "react";


export default function Home() {
  const [filter, setFilter] = useState("All");
  return (
    <>
      <main>
        <section class="hero" id="top">
          <div class="wrap hero-inner">
            <div class="hero-copy">
              <h1 id="heroHeading">A suite of mods that all work together.</h1>
              <p class="hero-lede" id="heroLede">
                A suite of primarily 1.20.1 mods that started out for the
                purpose of making Phoenix Forge Technologies a consistent
                bespoke project. However, the focus has shifted onto making
                quality mods for the community since they have gotten more
                popularity. The three core values of the PhoenixSuite are
                configurability, documentation, and themability. Proudly part of
                Omicron Industries.
              </p>
              <div class="hero-actions">
                <a class="btn btn-primary" href={`${import.meta.env.BASE_URL}#projects`}id="btnPrimary">
                  Browse Projects
                </a>
                <a class="btn btn-secondary" href={`${import.meta.env.BASE_URL}wiki/`} id="btnSecondary">
                  Open the Wiki
                </a>
              </div>
              <p class="hero-meta">
                <span id="projectCount">15</span>{" "}
                <span id="heroMetaSuffix">
                  total mods. Built mostly solo with help from the community.
                </span>
              </p>
            </div>
          </div>
        </section>

        <section class="foundation" id="showcase">
          <div class="wrap">
            <h2 id="foundationHeading">How the pieces fit</h2>
            <p class="foundation-lede" id="foundationLede">
              PhoenixWiki sits under the entire PhoenixSuite providing a
              backbone to hopefully reduce duplicated code. Here's how all the
              mods connect together:
            </p>
            <ul class="tree-list" id="treeList">
              <li>
                <span class="tree-path">phoenix/wiki</span>
                <span class="tree-desc">
                  Shared foundation the rest of the suite builds on. Handles
                  themeing, ingame wiki, and the hud buttons
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/guilds</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/solaris</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/domains</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/chronicles</span>
                <span class="tree-desc">
                  Questbook mod focused on dev power and configurability.
                  Archives, PhoenixCore, and Domains depend on it.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/forge-technologies</span>
                <span class="tree-desc">
                  The flagship modpack all the mods were designed to fit into.
                  Every PhoenixSuite mod is meant to fit nicely into PFT.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/core</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/archives</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/excavate</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/essentials</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/fission</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/phantasia</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
              <li>
                <span class="tree-path">phoenix/core</span>
                <span class="tree-desc">
                  Coremod for PFT hosting all the pack specific wild ideas.
                  Chronicles has optional compatability into PhoenixCore's
                  internal research system named Conflux of Research.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section class="projects" id="projects">
          <div class="wrap">
            <div class="projects-head">
              <h2 id="projectsHeading">Projects</h2>
              <div
                class="filter-bar"
                role="group"
                aria-label="Filter projects by status"
              >
                {["All", "active", "maintenance", "limbo"].map((o) => (
                  <button
                    key={o}
                    class={`filter-chip ${filter === o ? "is-active" : ""}`}
                    onClick={() => setFilter(o)}
                  >
                    {o.toLocaleUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div class="project-grid">
              {PROJECTS.filter((p) =>
                filter === "All" ? true : filter === p.status,
              ).map((p) => (
                <ProjectCard key={p.name} p={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
