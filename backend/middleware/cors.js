import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://shop-sphere-2n6k-ce6rt74a5-anwishtas-projects.vercel.app",
];

const corsMiddleware = cors({
  origin: function (origin, callback) {
    console.log("Request Origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies to be sent
});

export const useCors = (req, res, next) => {
  corsMiddleware(req, res, next);
};
