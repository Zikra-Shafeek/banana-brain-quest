
import { useState } from "react";
import "./ChallengePage.css";
import factoryBackground from "./assets/factory-background.png";
import minionImage from "./assets/minLogin-transparent.png";

const difficulties = [
  {
    id: "easy",
    name: "EASY",
    icon: "🌿",
    color: "easy",
    timer: "40s timer",
    lives: "3 lives",
    description: "Perfect for beginners",
  },
  {
    id: "medium",
    name: "MEDIUM",
    icon: "🔥",
    color: "medium",
    timer: "30s timer",
    lives: "3 lives",
    description: "Ready for a challenge?",
  },
  {
    id: "hard",
    name: "HARD",
    icon: "💀",
    color: "hard",
    timer: "10s timer",
    lives: "2 lives",
    description: "For banana brain masters",
  },
];

<main
  className="challenge-page"
  style={{ "--factory-background": `url("${factoryBackground}")` }}
></main>

function ChallengePage({ username = "Player", onNavigate }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");

  function chooseDifficulty(difficulty) {
    setSelectedDifficulty(difficulty);
  }

  function startChallenge() {
    console.log("Start Challenge clicked!");
    console.log("Selected difficulty:", selectedDifficulty);

    if (typeof onNavigate === "function") {
      onNavigate("game", selectedDifficulty);
    } else {
      console.error("onNavigate was not passed from App.jsx");
    }
  }

  return (
    <main
      className="challenge-page"
      style={{ "--factory-background": `url("${factoryBackground}")` }}
    >
      <header className="challenge-navbar">
        <button
          type="button"
          className="challenge-brand"
          onClick={() => onNavigate?.("welcome")}
          aria-label="Go to home"
        >
          <span className="brand-banana">🍌</span>
          <span className="brand-title">
            <strong>Banana Brain</strong>
            <small>Q U E S T</small>
          </span>
        </button>

        <nav className="challenge-nav" aria-label="Main navigation">
          <button
            type="button"
            className="challenge-nav-link active"
            onClick={() => onNavigate?.("challenge")}
          >
            Game
          </button>

          <button
            type="button"
            className="challenge-nav-link"
            onClick={() => onNavigate?.("history")}
          >
            History
          </button>

          <button
            type="button"
            className="challenge-nav-link"
            onClick={() => onNavigate?.("leaderboard")}
          >
            Leaderboard
          </button>

          <button
            type="button"
            className="challenge-profile"
            aria-label={`Player profile: ${username}`}
            onClick={() => onNavigate?.("profile")}
          >
            <span className="profile-head" />
            <span className="profile-body" />
          </button>

          <span className="challenge-username">{username}</span>
        </nav>
      </header>

      <section className="challenge-stage">
        <div className="factory-shade" />

        <img
          className="challenge-minion"
          src={minionImage}
          alt="Banana Brain Quest Minion"
        />

        <div className="challenge-content">
          <div className="challenge-title">
            <h1>
              <span>🍌</span> Banana Brain Quest <span>🍌</span>
            </h1>
            <p>CHOOSE YOUR CHALLENGE</p>
          </div>

          <div className="difficulty-grid">
            {difficulties.map((difficulty) => (
              <button
                type="button"
                key={difficulty.id}
                className={`difficulty-card ${difficulty.color} ${
                  selectedDifficulty === difficulty.id ? "chosen" : ""
                }`}
                onClick={() => chooseDifficulty(difficulty.id)}
                aria-pressed={selectedDifficulty === difficulty.id}
              >
                <span className="difficulty-icon">{difficulty.icon}</span>

                <span className="difficulty-name">{difficulty.name}</span>

                <span className="difficulty-details">
                  <span>◷ {difficulty.timer}</span>
                  <span>♡ {difficulty.lives}</span>
                </span>

                <span className="difficulty-description">
                  {difficulty.description}
                </span>

                {selectedDifficulty === difficulty.id && (
                  <span className="selected-label">✓ SELECTED</span>
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="start-challenge-button"
            onClick={startChallenge}
          >
            START CHALLENGE <span>➜</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default ChallengePage;
