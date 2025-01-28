import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import { addCart, fetchCart ,updateCart} from "../controllers/cartController.js";


router.route("/").post(authenticate, addCart);
router.route("/").get(authenticate, fetchCart);
router.route("/update").put(authenticate, updateCart);

export default router;
