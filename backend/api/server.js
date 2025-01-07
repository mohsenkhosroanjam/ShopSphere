import app from "../index.js";

export default function handler(req, res) {
  app(req, res); // Pass requests to your Express app
}
