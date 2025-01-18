import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import { addCart, fetchCart ,updateCart} from "../controllers/cartController.js";


router.route("/").post(authenticate,addCart);
router.route("/:id").get(fetchCart);
router.post('/update', updateCart);

export default router;
