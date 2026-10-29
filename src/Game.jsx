
import { useCallback, useEffect, useState } from "react";
import "./Game.css";
import { fetchBananaPuzzle } from "./bananaApi";
import minionAvatar from "./assets/minLogin-transparent.png";
import minionImage from "./assets/minion.png";

const DIFFICULTIES = {
  easy: { label: "EASY", seconds: 40 },
  medium: { label: "MEDIUM", seconds: 30 },
  hard: { label: "HARD", seconds: 20 },
};

const TOTAL_PUZZLES = 5;

export default function Game({
  username = "Player",
  difficulty = "easy",
  onNavigate = () => {},
}) {
  const selectedDifficulty =
    DIFFICULTIES[difficulty] ? difficulty : "easy";

  const [puzzle, setPuzzle] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [bananas, setBananas] = useState(0);
  const [lives, setLives] = useState(3);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [seconds, setSeconds] = useState(
    DIFFICULTIES[selectedDifficulty].seconds
  );
  const [status, setStatus] = useState("loading");
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);

  const loadPuzzle = useCallback(async () => {
    setStatus("loading");
    setFeedback("");
    setAnswer("");
    setSeconds(DIFFICULTIES[selectedDifficulty].seconds);

    try {
      const nextPuzzle = await fetchBananaPuzzle();
      setPuzzle(nextPuzzle);
      setStatus("playing");
    } catch (error) {
      console.error("Banana API error:", error);
      setFeedback(
        "We couldn't load a puzzle. Check your connection and try again."
      );
      setStatus("error");
    }
  }, [selectedDifficulty]);

  useEffect(() => {
    loadPuzzle();
  }, [loadPuzzle]);

  const finishGame = useCallback((won) => {
    setStatus(won ? "victory" : "gameover");
  }, []);

  const advancePuzzle = useCallback(
    async (remainingLives) => {
      if (questionNumber >= TOTAL_PUZZLES) {
        finishGame(true);
        return;
      }

      if (remainingLives <= 0) {
        finishGame(false);
        return;
      }

      setQuestionNumber((number) => number + 1);
      await loadPuzzle();
    },
    [finishGame, loadPuzzle, questionNumber]
  );

  const submitAnswer = useCallback(async () => {
    if (status !== "playing" || busy || !puzzle || answer.trim() === "") {
      return;
    }

    setBusy(true);

    if (Number(answer) === puzzle.solution) {
      setScore((current) => current + 10);
      setBananas((current) => current + 1);
      setFeedback("Correct! You earned 10 points. 🍌");
      setStatus("feedback-correct");

      window.setTimeout(() => {
        setBusy(false);
        advancePuzzle(lives);
      }, 900);
    } else {
      const remainingLives = lives - 1;
      setLives(remainingLives);
      setFeedback("Not quite! The correct answer was " + puzzle.solution);
      setStatus("feedback-wrong");

      window.setTimeout(() => {
        setBusy(false);
        advancePuzzle(remainingLives);
      }, 1200);
    }
  }, [status, busy, puzzle, answer, lives, advancePuzzle]);

  useEffect(() => {
    if (status !== "playing") return;

    const timer = window.setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status, puzzle]);

  useEffect(() => {
    if (status !== "playing" || seconds > 0) return;

    const remainingLives = lives - 1;
    setLives(remainingLives);
    setFeedback("Time's up! Try the next puzzle.");
    setStatus("feedback-wrong");

    const timeout = window.setTimeout(() => {
      advancePuzzle(remainingLives);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [seconds, status, lives, advancePuzzle]);

  function addDigit(digit) {
    if (status !== "playing" || busy) return;
    setAnswer((current) => (current.length < 2 ? current + digit : current));
  }

  function restartGame() {
    setPuzzle(null);
    setAnswer("");
    setScore(0);
    setBananas(0);
    setLives(3);
    setQuestionNumber(1);
    setSeconds(DIFFICULTIES[selectedDifficulty].seconds);
    setBusy(false);
    loadPuzzle();
  }

  const progress = Math.round(
    (questionNumber / TOTAL_PUZZLES) * 100
  );

  return (
    <div className="banana-game">
      <header className="game-navbar">
        <button
          className="brand"
          onClick={() => onNavigate("welcome")}
          aria-label="Go to home"
        >
          <span className="brand-banana">🍌</span>
          <span className="brand-words">
            <strong>Banana Brain</strong>
            <small>Q U E S T</small>
          </span>
        </button>

        <nav className="game-nav-links">
          <button onClick={() => onNavigate("welcome")}>Home</button>
          <button className="active">Game</button>
          <button onClick={() => onNavigate("history")}>History</button>
          <button onClick={() => onNavigate("leaderboard")}>
            Leaderboard
          </button>
        </nav>

        <div className="nav-player">
          <span className="nav-player-icon">👤</span>
          <strong>{username}</strong>
        </div>
      </header>

      <main className="game-layout">
        <aside className="player-panel">
          <div className="profile-heading">
            <span>PLAYER PROFILE</span>
            <span className="difficulty-badge">
              {DIFFICULTIES[selectedDifficulty].label}
            </span>
          </div>

          <div className="avatar-ring">
            <img src={minionAvatar} alt="Minion player avatar" />
            <span className="level-tag">LVL 0</span>
          </div>

          <h2 className="player-name">{username}</h2>
          <p className="player-subtitle">Banana Brain trainee</p>

          <div className="stat-card">
            <span className="stat-icon">🏆</span>
            <div>
              <small>SCORE</small>
              <strong>{score}</strong>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🍌</span>
            <div>
              <small>BANANAS</small>
              <strong>{bananas}</strong>
            </div>
          </div>

          <div className="stat-card lives-card">
            <span className="stat-icon">❤️</span>
            <div>
              <small>REMAINING LIVES</small>
              <strong>{"❤️".repeat(lives) || "—"}</strong>
            </div>
          </div>

          <div className="mission-note">
            <span>⭐</span>
            <p>Think fast, solve puzzles and collect bananas!</p>
          </div>
        </aside>

        <section className="game-content">
          <div className="mission-row">
            <div>
              <span className="mission-label">
                MISSION {questionNumber}
              </span>
              <h1>Solve the Banana Puzzle!</h1>
              <p>Think fast, trainee. Your next banana is waiting.</p>
            </div>

            <div className={`timer-card ${seconds <= 5 ? "urgent" : ""}`}>
              <span className="timer-icon">⏱</span>
              <div>
                <strong>{seconds}s</strong>
                <small>TIME LEFT</small>
              </div>
            </div>
          </div>

          <div className="progress-heading">
            <strong>
              PUZZLE {Math.min(questionNumber, TOTAL_PUZZLES)} OF{" "}
              {TOTAL_PUZZLES}
            </strong>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="puzzle-card">
            <div className="puzzle-card-heading">
              <span className="puzzle-mini-icon">🧩</span>
              <div>
                <h2>Crack the Code</h2>
                <p>Study the puzzle and enter the missing answer.</p>
              </div>
            </div>

            <div className="puzzle-image-frame">
              {status === "loading" && (
                <div className="puzzle-message">
                  <span className="loading-spinner" />
                  <strong>Loading your puzzle...</strong>
                </div>
              )}

              {status === "error" && (
                <div className="puzzle-message error-message">
                  <strong>Oops! Puzzle unavailable.</strong>
                  <p>{feedback}</p>
                  <button className="retry-button" onClick={loadPuzzle}>
                    Retry puzzle
                  </button>
                </div>
              )}

              {puzzle && status !== "loading" && status !== "error" && (
                <img
                  className="api-puzzle-image"
                  src={puzzle.imageUrl}
                  alt={`Banana maths puzzle ${questionNumber}`}
                />
              )}
            </div>

            <div className="answer-column">
        <img
        src={minionImage}
        alt="Banana Brain helper"
        className="game-minion-helper"
        />
            <div className="answer-section">
              <label htmlFor="answer-input">YOUR ANSWER</label>
              <input
                id="answer-input"
                value={answer}
                onChange={(event) =>
                  setAnswer(event.target.value.replace(/\D/g, "").slice(0, 2))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitAnswer();
                }}
                inputMode="numeric"
                placeholder="?"
                maxLength={2}
                disabled={status !== "playing" || busy}
              />

              

              <button
                className="submit-answer"
                onClick={submitAnswer}
                disabled={status !== "playing" || busy || !answer}
              >
                SUBMIT ANSWER <span>➜</span>
              </button>

              {feedback && status !== "error" && (
                <p
                  className={`answer-feedback ${
                    status === "feedback-correct"
                      ? "feedback-good"
                      : "feedback-bad"
                  }`}
                  role="status"
                >
                  {feedback}
                </p>
              )}
            </div>
            </div>
          </div>
        </section>
      </main>

      {(status === "victory" || status === "gameover") && (
        <div className="game-modal-backdrop">
          <div className="game-modal">
            <div className="modal-emoji">
              {status === "victory" ? "🏆🍌" : "😵"}
            </div>
            <h2>
              {status === "victory" ? "Mission Complete!" : "Game Over!"}
            </h2>
            <p>
              {status === "victory"
                ? "Amazing work, trainee! You completed the mission."
                : "Don't give up! The factory needs your brainpower."}
            </p>
            <div className="final-score">
              <span>FINAL SCORE</span>
              <strong>{score}</strong>
              <small>🍌 {bananas} bananas collected</small>
            </div>
            <button className="submit-answer" onClick={restartGame}>
              PLAY AGAIN ↻
            </button>
            <button
              className="modal-secondary"
              onClick={() => onNavigate("challenge")}
            >
              BACK TO CHALLENGES
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
