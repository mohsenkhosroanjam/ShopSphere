import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../components/CartContext';
import HeartIcon from '../Products/HeartIcon';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import { useAddCartMutation } from '../redux/api/cartSlice';
import { useSelector } from 'react-redux';

export default function ShopPage() {
  const { addToCart } = useCart();
  const { keyword } = useParams();
  const { data, isLoading: productsLoading, isError } = useGetProductsQuery({ keyword });
  const [products, setProducts] = useState([]);

  const [addCart, { isLoading: cartLoading }] = useAddCartMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [cart, setCartDetails] = useState({
    userId: '',
    productId: '',
    quantity: 1,
  });

  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong! Please try again.');
    }
  }, [isError]);

  const handleCart = async (product) => {
    if (!userInfo || !userInfo._id) {
      toast.error('Login to add product to cart!');
      return;
    }

   
    cart.userId=userInfo._id;
    cart.productId=product._id;


    if (cartLoading) return; // Prevent duplicate requests

    try {
      console.log(userInfo._id);
      const res = await addCart(cart).unwrap();
      if (res.message) {
        console.log(res.message);
        console.log(cart);
        toast.error(res.message);
        return;
      }
      toast.success('Product added to cart!');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add product to cart!');
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide mb-2">Shop</h1>
          <p className="text-lg text-gray-400 py-4">Explore our entire collection here!</p>
        </div>

        <Link
          to="/specialshop"
          className="absolute top-10 right-40 bg-gradient-to-r from-white to-pink-500 text-black font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Tap to explore exclusive products
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mx-16 my-16">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-pink-500 shadow-md rounded-lg p-4 transform hover:scale-105 hover:shadow-lg transition duration-300 relative"
              >
                <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
                <p className="text-lg text-white font-semibold mb-4">${product.price}</p>
                <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full"
                  />
                  <HeartIcon product={product} />
                </div>
                <button
                  onClick={() => handleCart(product)}
                  className="w-full mt-4 bg-white hover:bg-gray-100 text-pink-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg">
              {productsLoading ? 'Loading...' : 'No products found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
