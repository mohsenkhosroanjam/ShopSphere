import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateById,
  googleSignIn,
  googleLogin,
  createDistributor,
  loginDistributor,
  requestAccountDeletion,
  confirmAccountDeletion,
  forgotPassword,
  resetPassword
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router.post("/google-signin", googleSignIn);
router.post("/google-login", googleLogin);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router.route("/:id").delete(authenticate, authorizeAdmin, deleteUserById).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateById);

router.post("/distributor/signup", createDistributor);
router.post("/distributor/login", loginDistributor);

router.post('/request-deletion', authenticate, requestAccountDeletion);
router.post('/confirm-deletion/:token', confirmAccountDeletion);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
