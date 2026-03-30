// Vite uses import.meta.env (NOT process.env) for frontend env variables.
// All frontend env vars MUST be prefixed with VITE_ in your .env file.
const config = {
    API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001'
};

export default config;
