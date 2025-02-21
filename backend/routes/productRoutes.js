import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import { authenticate, authorizeAdmin, authorizeDistributorOrAdmin } from "../middleware/authMiddleware.js";
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
  fetchSimilarProducts,
} from "../controllers/productController.js";
import multer from "multer";

//this stores the image in server memory which is required for vercel or production environment
//now for adding and updating , have to use form/data instead of raw json data
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Increased to 10MB limit per file
  }
});

const multipleUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additionalImages', maxCount: 4 } // Allow up to 4 additional images
]);

router
  .route("/")
  .get(fetchProducts)

router.route("/add")
  .post(
    authenticate, 
    authorizeDistributorOrAdmin,
    multipleUpload,
    addProduct
  );

router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, checkId, createProductReview);

router.get("/top",(req, res) => console.log("top products"));
router.get("/new", fetchNewProducts);
router
  .route("/:id")
  .get(fetchProductsById)
  .put(
    authenticate, 
    authorizeAdmin, 
    multipleUpload,
    updateProductDetails
  )
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/:id/similar").get(fetchSimilarProducts);


export default router;
