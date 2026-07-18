// Uses Create React App's built-in env support.
// Set REACT_APP_BACKEND_URL in a .env file at frontend/ root to override.
// Defaults to local backend (matches backend/.env PORT=8080) for dev,
// and falls back to the deployed backend for production builds.
const IS_PROD = process.env.NODE_ENV === "production";

const server =
    process.env.REACT_APP_BACKEND_URL ||
    (IS_PROD
        ? "https://apnacollegebackend.onrender.com"
        : "http://localhost:8080");

export default server;