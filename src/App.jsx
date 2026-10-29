
import { useState } from "react";
import "./App.css";
import ChallengePage from "./ChallengePage";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const [welcomeUsername, setWelcomeUsername] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    setLoginError("");

    if (!username.trim() || !password) {
      setLoginError("Please enter your username and password.");
      return;
    }

    const savedAccount = JSON.parse(
      localStorage.getItem("bananaQuestAccount") || "null"
    );

    if (!savedAccount) {
      setLoginError("No account found. Please create an account first.");
      return;
    }

    const usernameMatches =
      savedAccount.username.toLowerCase() === username.trim().toLowerCase() ||
      savedAccount.email.toLowerCase() === username.trim().toLowerCase();

    if (!usernameMatches || savedAccount.password !== password) {
      setLoginError("Incorrect username/email or password.");
      return;
    }

    localStorage.setItem("bananaQuestUsername", savedAccount.username);

    if (rememberMe) {
      localStorage.setItem("bananaQuestRememberMe", "true");
    }

    setWelcomeUsername(savedAccount.username);
    setCurrentPage("welcome");
  }

  function handleRegistration(event) {
    event.preventDefault();
    setRegisterError("");

    if (
      !registerUsername.trim() ||
      !registerEmail.trim() ||
      !registerPassword ||
      !confirmPassword
    ) {
      setRegisterError("Please complete all the fields.");
      return;
    }

    if (registerUsername.trim().length < 3) {
      setRegisterError("Your username must contain at least 3 characters.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(registerEmail.trim())) {
      setRegisterError("Please enter a valid email address.");
      return;
    }

    if (registerPassword.length < 8) {
      setRegisterError("Your password must contain at least 8 characters.");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setRegisterError("Your passwords do not match.");
      return;
    }

   

    if (localStorage.getItem("bananaQuestAccount")) {
      const existingAccount = JSON.parse(
        localStorage.getItem("bananaQuestAccount")
      );

      if (
        existingAccount.username.toLowerCase() ===
          registerUsername.trim().toLowerCase() ||
        existingAccount.email.toLowerCase() ===
          registerEmail.trim().toLowerCase()
      ) {
        setRegisterError("That username or email is already registered.");
        return;
      }
    }

    const newAccount = {
      username: registerUsername.trim(),
      email: registerEmail.trim(),
      password: registerPassword,
    };

    localStorage.setItem("bananaQuestAccount", JSON.stringify(newAccount));
    localStorage.setItem("bananaQuestUsername", newAccount.username);

    setWelcomeUsername(newAccount.username);
    setCurrentPage("welcome");
  }

  function handleLogout() {
    setUsername("");
    setPassword("");
    setLoginError("");
    setCurrentPage("login");
  }

  /* =========================
     WELCOME PAGE
  ========================= */

  if (currentPage === "welcome") {
    return (
      <main className="welcome-screen">
        <div className="welcome-card">
          <div className="welcome-banana">🍌</div>

          <p className="welcome-eyebrow">MISSION STARTED</p>

          <h1>
            Welcome,
            <br />
            <span>{welcomeUsername}</span>!
          </h1>

          <p className="welcome-description">
            Your banana-powered adventure is waiting.
          </p>

          <button
            className="primary-button"
            onClick={() => setCurrentPage("challenge")}
          >
            LET'S PLAY! 🚀
          </button>

          <button className="back-button" onClick={handleLogout}>
            Back to Login
          </button>
        </div>
      </main>
    );
  }

  /* =========================
     REGISTRATION PAGE
  ========================= */

  if (currentPage === "register") {
    return (
      <main className="login-page">
        <div className="background-overlay"></div>

        <div className="floating-banana banana-one">🍌</div>
        <div className="floating-banana banana-two">🍌</div>
        <div className="floating-banana banana-three">✨</div>

        <section className="login-layout">
          <div className="hero-section">
            <div className="brand-label">
              <span className="brand-icon">🍌</span>
              <span>BANANA BRAIN QUEST</span>
            </div>

            <div className="hero-character">
              <div className="character-glow"></div>

              <img
                className="character-art"
                src="/assets/minLogin-transparent.png"
                alt="Banana Brain Quest adventurer"
              />

              <div className="banana-prop">🍌</div>
            </div>

            <div className="hero-copy">
              <h1>
                JOIN THE
                <br />
                <span>BANANA SQUAD!</span>
              </h1>

              <p>
                Create your player account, solve puzzles,
                collect bananas, and begin your adventure!
              </p>

              <div className="feature-badges">
                <span>🍌 Collect Bananas</span>
                <span>🏆 Earn Rewards</span>
                <span>🧠 Test Your Brain</span>
              </div>
            </div>
          </div>

          <div className="login-card register-card">
            

            <div className="login-heading">
              <div className="login-icon">🎮</div>

              <h2>CREATE ACCOUNT</h2>

              <p>Become a Banana Brain Quest player!</p>
            </div>

            <form onSubmit={handleRegistration}>
              <div className="form-group">
                <label htmlFor="register-username">USERNAME</label>

                <div className="input-wrapper">
                  <span className="input-icon">👤</span>

                  <input
                    id="register-username"
                    type="text"
                    placeholder="Choose a username"
                    autoComplete="username"
                    value={registerUsername}
                    onChange={(event) =>
                      setRegisterUsername(event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-email">EMAIL ADDRESS</label>

                <div className="input-wrapper">
                  <span className="input-icon">📧</span>

                  <input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={registerEmail}
                    onChange={(event) =>
                      setRegisterEmail(event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-password">PASSWORD</label>

                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>

                  <input
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    value={registerPassword}
                    onChange={(event) =>
                      setRegisterPassword(event.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    aria-label={
                      showRegisterPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showRegisterPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">CONFIRM PASSWORD</label>

                <div className="input-wrapper">
                  <span className="input-icon">🔐</span>

                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                  />
                </div>
              </div>

              

              {registerError && (
                <p className="error-message" role="alert">
                  {registerError}
                </p>
              )}

              <button
                type="submit"
                className="primary-button login-button"
              >
                CREATE ACCOUNT <span>➜</span>
              </button>
            </form>

            <div className="signup-section register-signin">
              <p>Already have an account?</p>

              <button
                type="button"
                className="text-button signup-button"
                onClick={() => {
                  setRegisterError("");
                  setCurrentPage("login");
                }}
              >
                LOGIN HERE
              </button>
            </div>

            <div className="card-footer">
              <span>🍌</span>
              BANANA BRAIN QUEST
              <span>🍌</span>
            </div>
          </div>
        </section>

        <footer className="page-footer">
          POWERED BY BANANAS. FUELLED BY BRAINS.
        </footer>
      </main>
    );
  }

  if (currentPage === "challenge") {
    return (
      <ChallengePage
        username={welcomeUsername}
        onNavigate={(page, difficulty) => {
          if (page === "game") {
            alert(
              `${difficulty.toUpperCase()} selected. The puzzle screen is next!`
            );
          } else if (page === "challenge") {
            setCurrentPage("challenge");
          } else {
            alert(`${page} page will be created next!`);
          }
        }}
      />
    );
  }

  /* =========================
     LOGIN PAGE
  ========================= */

  return (
    <main className="login-page">
      <div className="background-overlay"></div>

      <div className="floating-banana banana-one">🍌</div>
      <div className="floating-banana banana-two">🍌</div>
      <div className="floating-banana banana-three">✨</div>

      <section className="login-layout">
        <div className="hero-section">
          <div className="brand-label">
            <span className="brand-icon">🍌</span>
            <span>BANANA BRAIN QUEST</span>
          </div>

          <div className="hero-character">
            <div className="character-glow"></div>

            <img
              className="character-art"
              src="/assets/minLogin-transparent.png"
              alt="Banana Brain Quest adventurer"
            />

            <div className="banana-prop">🍌</div>
          </div>

          <div className="hero-copy">
            <h1>
              READY FOR A
              <br />
              <span>BANANA-POWERED</span>
              <br />
              ADVENTURE?
            </h1>

            <p>
              Solve puzzles, collect bananas, and become
              the ultimate Banana Brain!
            </p>

            <div className="feature-badges">
              <span>🍌 Collect Bananas</span>
              <span>🏆 Earn Rewards</span>
              <span>🧠 Test Your Brain</span>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="card-top-decoration">
            <span>🍌</span>
            <span>🍌</span>
            <span>🍌</span>
          </div>

          <div className="login-heading">
            <div className="login-icon">🔐</div>

            <h2>PLAYER LOGIN</h2>

            <p>Enter the factory and begin your mission!</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">USERNAME OR EMAIL</label>

              <div className="input-wrapper">
                <span className="input-icon">👤</span>

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="text-button"
                onClick={() => setCurrentPage("challenge")}
              >
                Forgot password?
              </button>
            </div>

            {loginError && (
              <p className="error-message" role="alert">
                {loginError}
              </p>
            )}

            <button type="submit" className="primary-button login-button">
              LOGIN <span>➜</span>
            </button>
          </form>

          <div className="signup-section">
            <p>New to the banana squad?</p>

            <button
              type="button"
              className="text-button signup-button"
              onClick={() => {
                setRegisterError("");
                setCurrentPage("register");
              }}
            >
              CREATE AN ACCOUNT
            </button>
          </div>

          <div className="card-footer">
            <span>🍌</span>
            BANANA BRAIN QUEST
            <span>🍌</span>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        POWERED BY BANANAS. FUELLED BY BRAINS.
      </footer>
    </main>
  );
}

export default App;
