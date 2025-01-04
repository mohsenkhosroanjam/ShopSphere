import cors from 'cors';

const allowedOrigins = ['https://shop-sphere-2n6k.vercel.app','http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

export const useCors = (app) => {
  app.use(cors(corsOptions));
};

export default corsOptions;
