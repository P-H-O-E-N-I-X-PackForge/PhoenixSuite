import { Route, Routes } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [palette, setPalette] = useState(
    () => localStorage.getItem("phoenix-suite-palette") || "sakura",
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette);
    localStorage.setItem("phoenix-suite-palette", palette);
  }, [palette]);
  return (
    <>
      <header class="site-header">
        <div class="wrap header-inner">
          <a class="brand" to={`${import.meta.env.BASE_URL}#top`}>
            <img
              src={`${import.meta.env.BASE_URL}phoenix_logo.png`}
              alt="Phoenix Suite Logo"
              class="brand-mark"
            />
            <span class="brand-text" id="brandText">
              Phoenix Suite
            </span>
          </a>

          <nav class="site-nav">
            <a href={`${import.meta.env.BASE_URL}#projects`} id="navProjects">
              Projects
            </a>
            <a href={`${import.meta.env.BASE_URL}#showcase`} id="navShowcase">
              How it fits
            </a>
            <a
              href={`${import.meta.env.BASE_URL}wiki/`}
              class="nav-cta"
              id="navWiki"
            >
              Wiki
            </a>
          </nav>
          <div class="header-controls">
            <div
              className="palette-picker"
              role="group"
              aria-label="Color theme"
            >
              {[
                {
                  id: "sakura",
                  title: "Sakura (purple + pink)",
                  label: "Sakura palette",
                },
                {
                  id: "ember",
                  title: "Ember (purple + orange)",
                  label: "Ember palette",
                },
                {
                  id: "void",
                  title: "Void (purple + cyan)",
                  label: "Void palette",
                },
              ].map((p) => (
                <button
                  key={p.id}
                  className={`palette-swatch ${p.id === palette ? "is-active" : ""}`}
                  data-palette={p.id}
                  title={p.title}
                  aria-label={p.label}
                  onClick={() => setPalette(p.id)}
                />
              ))}
            </div>
            <button
              class="theme-toggle"
              id="themeToggle"
              aria-label="Toggle light/dark mode"
              title="Toggle light/dark mode"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <span className="icon-moon">🌙</span>
              ) : (
                <span className="icon-sun">☀️</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <footer class="site-footer">
        <div class="wrap footer-inner">
          <span id="footerText">
            Phoenix Suite — a solo project by Phoenixvine.
          </span>
          <a href={`${import.meta.env.BASE_URL}wiki/`} id="footerWikiText">
            Wiki
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
