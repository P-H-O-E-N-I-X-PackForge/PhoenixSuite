import { Route, Routes } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";

function App() {
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
