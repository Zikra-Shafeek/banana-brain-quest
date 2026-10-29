
import { useState } from "react";
import "./ChallengePage.css";

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

function ChallengePage({ username = "Player", onNavigate }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");

  function chooseDifficulty(difficulty) {
    setSelectedDifficulty(difficulty);
  }

  function startChallenge() {
    if (onNavigate) {
      onNavigate("game", selectedDifficulty);
    } else {
      alert(
        `${selectedDifficulty.toUpperCase()} challenge selected!`
      );
    }
  }

  return (
    <main className="challenge-page">
      <header className="challenge-navbar">
        <div className="challenge-brand">
          <span>🍌</span>
          <span>Banana Brain Quest</span>
          <span>🍌</span>
        </div>

        <nav className="challenge-nav" aria-label="Main navigation">
          <button
            className="challenge-nav-link active"
            onClick={() => onNavigate?.("challenge")}
          >
            Game
          </button>

          <button
            className="challenge-nav-link"
            onClick={() => onNavigate?.("history")}
          >
            History
          </button>

          <button
            className="challenge-nav-link"
            onClick={() => onNavigate?.("leaderboard")}
          >
            Leaderboard
          </button>

          <button
            className="challenge-profile"
            aria-label={`Player profile: ${username}`}
            onClick={() => onNavigate?.("profile")}
          >
            <span className="profile-head" />
            <span className="profile-body" />
          </button>
        </nav>
      </header>

      <section className="challenge-stage">
        <div className="factory-shade" />

        <img
          className="challenge-minion"
          src="/assets/minLogin-transparent.png"
          alt="Banana Brain Quest character"
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
                <span className="difficulty-icon">
                  {difficulty.icon}
                </span>

                <span className="difficulty-name">
                  {difficulty.name}
                </span>

                <span className="difficulty-details">
                  <span>◷ {difficulty.timer}</span>
                  <span>♡ {difficulty.lives}</span>
                </span>

                <span className="difficulty-description">
                  {difficulty.description}
                </span>

                {selectedDifficulty === difficulty.id && (
                  <span className="selected-label">
                    ✓ SELECTED
                  </span>
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
