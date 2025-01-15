import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductsById,
  fetchAllProducts,
  createProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";
import multer from "multer";


const upload = multer({storage:multer.memoryStorage()})

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), upload.single('image'), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, checkId, createProductReview);

router.get("/top",(req, res) => console.log("top products"));
router.get("/new", fetchNewProducts);
router
  .route("/:id")
  .get(fetchProductsById)
  .put(authenticate, authorizeAdmin, formidable(), upload.single('image'), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
