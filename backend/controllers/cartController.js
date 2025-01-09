import Cart from "../models/cartModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
export const addCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }

  // Find or create the cart for the user
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId });
  }

  // Check if the product already exists in the cart
  const existingProduct = cart.products.find(
    (item) => item.productId.toString() === productId.toString()
  );

  if (existingProduct) {
    return res.json({
      message: "Product already in cart",
    });
  } else {
    // Add the product to the cart
    cart.products.push({ productId, quantity });
  }

  // Save the updated cart
  await cart.save();

  return res.json(cart);
});

export const fetchCart = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  // Find the cart for the user and populate product details
  const cart = await Cart.findOne({ userId }).populate("products.productId");

  if (!cart) {
    return res.status(404).json({ error: "Cart not found for this user" });
  }

  // Return populated products
  return res.json(cart.products);
});

export const updateCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Check if the product exists in the cart
  const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

  if (productIndex === -1) {
    res.status(404);
    throw new Error('Product not found in cart');
  }

  // Update the quantity or remove the product if quantity is 0
  if (quantity > 0) {
    cart.products[productIndex].quantity = quantity;
  } else {
    cart.products.splice(productIndex, 1);
  }

  // Save the updated cart
  await cart.save();

  res.status(200).json({
    message: 'Cart updated successfully',
    cart,
  });
});
