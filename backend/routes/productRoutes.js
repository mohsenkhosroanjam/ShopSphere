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

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, addProduct);
//removed this formidable() in middlewRE

router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, checkId, createProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router
  .route("/:id")
  .get(fetchProductsById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
