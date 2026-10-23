import { Route, Routes } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
      <>
        <header className="site-header">
          <div className="wrap header-inner">
            <a className="brand" href={`${import.meta.env.BASE_URL}#top`}>
              <img
                  src={`${import.meta.env.BASE_URL}phoenix_logo.png`}
                  alt="Phoenix Suite Logo"
                  className="brand-mark"
              />
              <span className="brand-text" id="brandText">
              Phoenix Suite
            </span>
            </a>

            <nav className="site-nav">
              <a href={`${import.meta.env.BASE_URL}#projects`} id="navProjects">
                Projects
              </a>
              <a href={`${import.meta.env.BASE_URL}#showcase`} id="navShowcase">
                How it fits
              </a>
              <a
                  href={`${import.meta.env.BASE_URL}wiki/`}
                  className="nav-cta"
                  id="navWiki"
              >
                Wiki
              </a>
              <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label="Toggle dark/light mode"
                  type="button"
              >
                <span className="icon-sun">☀️</span>
                <span className="icon-moon">🌙</span>
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="wrap footer-inner">
          <span id="footerText">
            Phoenix Suite; project maintained by Phoenixvine and fueled by the community.
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