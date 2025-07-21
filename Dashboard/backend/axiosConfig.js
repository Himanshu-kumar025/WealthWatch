import axios from "axios";

// Define base URLs for different parts of the application
export const BASE_URL = "https://wealth-watch-backend.vercel.app";        // Backend server
export const WEBPAGE_URL = "https://wealth-watch-five.vercel.app";     // Frontend public-facing webpage
export const DASHBOARD_URL = "https://wealth-watch-dashboard-one.vercel.app";   // Frontend admin/user dashboard

// Create an Axios instance pre-configured with base settings
const clientServer = axios.create({
  baseURL: BASE_URL,  // Use the backend API base URL
  headers: {
    "Content-Type": "application/json" // Default content type for requests
  }
});

// Export the Axios instance for use across the application
export default clientServer;
