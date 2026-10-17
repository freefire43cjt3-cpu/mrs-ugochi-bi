import React from "react";
import Header from "./components/Header";
import Questionnaire from "./components/Questionnarie";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <section className="intro">
          <p className="eyebrow">A PERSONALIZED WEBSITE EXPERIENCE</p>
          <h1>
            Let's build something
            <span> beautiful.</span>
          </h1>
          <p>
            Tell me about your boutique, your vision, and the experience
            you want your customers to have online.
          </p>
          <div className="intro-note">
            <span>✦</span> Your vision. Your brand. Your website.
          </div>
        </section>

        <Questionnaire />

        <footer className="site-footer">
          <p>RAY ⚡ WEB DEVELOPMENT</p>
          <span>Thoughtfully designed. Built for your business.</span>
        </footer>
      </main>
    </div>
  );
}