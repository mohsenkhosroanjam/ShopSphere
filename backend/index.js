//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

<<<<<<< HEAD
const corsOptions = {
  origin: 'https://shop-sphere-2n6k.vercel.app'||"http:localhost:5173", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};
=======
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production'
//     ? 'https://shop-sphere-2n6k.vercel.app'
//     : 'http://localhost:5000',  
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// };
>>>>>>> 7b1c8df7979ad2266094ca10baf5185c3f980b89


// app.use(cors(corsOptions));


//Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
// app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.listen(port);
