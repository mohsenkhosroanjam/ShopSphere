import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"
import { useCart } from '../../components/CartContext';
import { useAddCartMutation } from "../redux/api/cartSlice";
import { useSelector } from 'react-redux';

const Product = ({ product }) => {
  const [addToCart] = useAddCartMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        userId: userInfo._id,
        productId: product._id,
        quantity: 1
      }).unwrap();
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-[30rem] rounded"/>
        <HeartIcon product={product} /> 
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">$ {product.price}</span>
          </h2>
        </Link>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md mt-2 w-full transition-all duration-300 transform hover:scale-105"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Product
