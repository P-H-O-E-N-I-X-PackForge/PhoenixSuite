import "../style.css";
import ProjectCard, { PROJECTS } from "../components/ProjectCard";
import { useState } from "react";
import Showcase from "../components/Showcase";

export default function Home() {
  const [filter, setFilter] = useState("All");
  return (
    <>
      <main>
        <img
          class="background-logo"
          src={`${import.meta.env.BASE_URL}phoenix_logo.png`}
        />
        <section class="hero" id="top">
          <div class="wrap hero-inner">
            <div class="hero-copy">
              <h1 id="heroHeading">The Phoenix Suite</h1>

              <p class="hero-meta">
                <span id="projectCount">15</span>{" "}
                <span id="heroMetaSuffix">
                  total mods. Built mostly solo with help from the community.
                </span>
              </p>
              <p class="hero-lede" id="heroLede">
                A suite of primarily 1.20.1 mods that started out for the
                purpose of making Phoenix Forge Technologies a consistent
                bespoke project. However, the focus has shifted onto making
                quality mods for the community since they have gotten more
                popularity. The three core values of the PhoenixSuite are
                configurability, documentation, and themability.
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
            <p className="tree-path" style={{ fontSize: "16px" }}>
              phoenix/
            </p>
            <Showcase />
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
