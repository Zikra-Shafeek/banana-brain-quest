# Banana Brain Quest

Banana Brain Quest is a Minion-themed maths puzzle game built as a university software engineering project. Players create an account, enter the banana factory, and choose a challenge level for their puzzle adventure.

## Technologies

- React
- Vite
- JavaScript (ES modules)
- CSS
- React Router DOM (planned for further page navigation)
- Oxlint

## Development status

The project is in active development. The login, registration, welcome, challenge-selection, and live puzzle gameplay experience is currently implemented. History and leaderboard pages are still being developed.

## Implemented features

- Minion-themed login and registration screens
- Client-side form validation for account creation and login
- Demo account persistence using browser `localStorage`
- Welcome screen after successful registration or login
- Challenge selection page with Easy, Medium, and Hard difficulties
- Live maths puzzle loading from the Banana API
- Difficulty-specific countdown timers, lives, scoring, progress, and banana rewards
- Number keypad, answer validation, feedback, victory, and game-over states
- Responsive Minion-themed game page with factory background
- Responsive styling across the main screens
- React/Vite development and production build setup

## In progress

- History and leaderboard pages
- Player profile and persistent game progress
- Production-ready authentication and data storage
- Final UI polish, accessibility review, and testing

## Puzzle API

The game requests fresh puzzle images and numeric solutions from the University of Bedfordshire Banana API:

`https://marcconrad.com/uob/banana/api.php?out=json`

If a browser environment blocks the request because of CORS, configure a Vite development proxy and keep the API request on the development server.

## Installation and setup

1. Install Node.js (the current project uses a recent version compatible with Vite).
2. Clone this repository or download the project.
3. Open the project folder in VS Code.
4. Install dependencies:

   ```bash
   npm install
   ```

## Run locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Future screenshots

Screenshots of the login, registration, challenge-selection, and maths puzzle screens will be added here as development progresses.
