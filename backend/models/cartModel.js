import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
        default: 1,
      },
      
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  
});

cartSchema.pre('save', async function (next) {
  // Automatically calculate the total price before saving the cart
  const cart = this;
  const productPrices = await mongoose
    .model('Product')
    .find({ _id: { $in: cart.products.map((p) => p.productId) } })
    .select('price');

  const priceMap = new Map(productPrices.map((p) => [p._id.toString(), p.price]));

  cart.totalPrice = cart.products.reduce((total, item) => {
    const price = priceMap.get(item.productId.toString()) || 0;
    return total + price * item.quantity;
  }, 0);

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
