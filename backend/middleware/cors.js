import cors from 'cors';

const allowedOrigins = [
  'https://shop-sphere-2n6k-ce6rt74a5-anwishtas-projects.vercel.app',
  'https://shop-sphere-liard.vercel.app',
  'https://shop-sphere-2n6k.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // During development, origin might be undefined when making requests from the same origin
    console.log('Incoming request from origin:', origin);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS policy:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // CORS preflight cache time in seconds
};

export const useCors = (app) => {
  // Enable pre-flight requests for all routes
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
};

export default corsOptions;