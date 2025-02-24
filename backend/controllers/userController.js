import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';
import Blog from "../models/blogModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";  

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    const token = generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: token
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser.isDistributor) {
    return res.status(401).json({
      message: "Please Login As Distributor"
    })
  }

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      const token = generateToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token: token
      });
      return;
    }
    res.status(401)
    throw new Error("Wrong Password")
  }
  res.status(404)
  throw new Error("Please register the email address")
});
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  }
  else {
    res.status(400);
    throw new Error("User not found");
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  }
  else {
    res.status(400);
    throw new Error("User not found");
  }
});

const googleSignIn = asyncHandler(async (req, res) => {
  const { googleId, email, username, photoURL } = req.body;

  if (!googleId || !email) {
    res.status(400);
    throw new Error("Google authentication data missing");
  }

  let existingUser = await User.findOne({ googleId });

  if (!existingUser) {
    existingUser = await User.findOne({ email });
  }

  if (existingUser) {
    existingUser.googleId = googleId;
    existingUser.photoURL = existingUser?.photoURL || photoURL;
    await existingUser.save();

    generateToken(res, existingUser._id);
    res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      photoURL: existingUser.photoURL
    });
    return;
  }

  const newUser = new User({
    username,
    email,
    googleId,
    photoURL,
    password: 'google-password'
  });

  try {
    await newUser.save();
    const token = generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      photoURL: newUser.photoURL,
      token: token
    });
  } catch (error) {
    res.status(400);
    throw new Error("Error creating user with Google authentication");
  }
});

const googleLogin = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { googleId, email, username, photoURL } = req.body;

  if (!googleId || !email) {
    res.status(400);
    throw new Error("Google authentication data missing");
  }

  let existingUser = await User.findOne({ googleId });

  if (!existingUser) {
    existingUser = new User({
      username,
      email,
      googleId,
      photoURL,
      password: "google-password"
    });

    try {
      await existingUser.save();
    } catch (error) {
      res.status(400);
      console.log(error);
      throw new Error("Error creating new user during Google login");
    }
  }

  try {
    const token = generateToken(res, existingUser._id);
    res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      photoURL: existingUser.photoURL,
      token: token
    });
  } catch (error) {
    res.status(400);
    throw new Error("Error logging in with Google");
  }
});

const createDistributor = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    isDistributor,
    businessName,
    contactNumber,
    city,
    state,
  } = req.body;

  if (!username || !email || !password || !businessName || !contactNumber || !isDistributor || !city || !state) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newDistributor = new User({
    username,
    email,
    password: hashedPassword,
    isDistributor: true,
    distributorDetails: {
      businessName,
      contactNumber,
      city,
      state,
    }
  });

  try {
    await newDistributor.save();
    const token = generateToken(res, newDistributor._id);
    res.status(201).json({
      _id: newDistributor._id,
      username: newDistributor.username,
      email: newDistributor.email,
      isDistributor: newDistributor.isDistributor,
      distributorDetails: newDistributor.distributorDetails,
      token: token
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid distributor data");
  }
});

const loginDistributor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const distributor = await User.findOne({ email, isDistributor: true });

  if (!distributor) {
    res.status(401);
    throw new Error("Not registered as a distributor");
  }

  const isPasswordValid = await bcrypt.compare(password, distributor.password);

  if (isPasswordValid) {
    const token = generateToken(res, distributor._id);
    res.status(200).json({
      _id: distributor._id,
      username: distributor.username,
      email: distributor.email,
      isDistributor: distributor.isDistributor,
      distributorDetails: distributor.distributorDetails,
      token: token
    });
  } else {
    res.status(401);
    throw new Error("Invalid password");
  }
});

const requestAccountDeletion = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate deletion token
  const deleteToken = crypto.randomBytes(32).toString('hex');
  user.deleteToken = deleteToken;
  user.deleteTokenExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Create verification link
  const verificationLink = `${process.env.FRONTEND_URL}/verify-deletion/${deleteToken}`;

  // Send verification email
  await sendEmail(
    user.email,
    "Account Deletion Request",
    `Are you sure you want to delete your account? This action cannot be undone.\n\n` +
    `Click the following link to confirm deletion: ${verificationLink}\n\n` +
    `If you did not request this, please ignore this email.\n` +
    `The link will expire in 1 hour.`
  );

  res.status(200).json({ message: "Deletion verification email sent" });
});

const confirmAccountDeletion = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    const user = await User.findOne({
      deleteToken: token,
      deleteTokenExpires: { $gt: Date.now() }
    });
    console.log(user);
    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired deletion token");
    }

    // Delete user's blogs
    await Blog.deleteMany({ author: user._id });

    // Delete user's products
    await Product.deleteMany({ distributor: user._id });

    // Delete user's cart
    await Cart.deleteMany({ userId: user._id });

    // Remove user's likes from blogs
    await Blog.updateMany(
      { likes: user._id },
      { $pull: { likes: user._id } }
    );

    // Delete the user account
    await User.deleteOne({ _id: user._id });

    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    console.log("Account successfully deleted");
    res.status(200).json({ message: "Account successfully deleted" });
  } catch (err) {
    res.status(400);
    throw new Error("Error deleting account");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time - 10 minutes
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  // Create reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await sendEmail(
      user.email,
      "Password Reset Request",
      `You requested a password reset. Please click the following link to reset your password:\n\n${resetUrl}\n\n` +
      `If you didn't request this, please ignore this email.\n` +
      `This link will expire in 10 minutes.`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(500);
    throw new Error("Email could not be sent");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  // Validate password
  if (!req.body.password || req.body.password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Set new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token
  });
});

export {
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
  resetPassword,
};
