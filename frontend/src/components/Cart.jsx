import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useFetchCartQuery, useUpdateCartQuantityMutation } from "../../src/pages/redux/api/cartSlice";
import { useSelector } from "react-redux";
import Paypal from "./paypal";
import { toast } from "react-toastify";
import { useAddCartMutation } from "../pages/redux/api/cartSlice";
import { useTheme } from '../context/ThemeContext';
import { Link } from "react-router-dom";

const styles = `
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animate-fade-in-up.delay-2 {
  animation-delay: 0.2s;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 6s ease infinite;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function Cart() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: cartProducts, isLoading, error } = useFetchCartQuery(userInfo?._id);
  const [updateCartQuantity] = useUpdateCartQuantityMutation();
  const { isDarkMode } = useTheme();

  const [loadError, setLoadError] = useState("");
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);

  useEffect(() => {
    if (error) {
      setLoadError(error?.data?.message || error.error || "Failed to fetch cart");
    }
  }, [error]);

  if (isLoading)
    return (
      <p className="flex flex-col justify-center text-center text-5xl text-bold min-h-full items-center">
        Loading...
      </p>
    );
    
  const calculateTotal = () => {
    return (
      cartProducts?.reduce(
        (total, item) =>
          total + (item.productId.price || 0) * (item.quantity || 1),
        0
      )?.toFixed(2) || "0.00"
    );
  };

  const handleOnClickPay = () => {
    setIsPaymentStarted(true);
  };

  const updateQuantity = async (item, quantity) => {
    try {
      const result = await updateCartQuantity({
        userId: userInfo._id,
        productId: item.productId._id,
        quantity: quantity
      }).unwrap();
      
      if (result.message === 'Cart updated successfully') {
        toast.success('Cart updated successfully');
        return;
      }
      
      if (!result.success && result.error) {
        toast.error('Failed to update quantity:', result.error);
      }
    } catch (err) {
      const errorMessage = err.data?.message || err.error || 'Failed to update quantity';
      toast.error('Failed to update quantity:', errorMessage);
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(item, quantity);
    }
  };

  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    handleQuantityChange(item, newQuantity);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      handleQuantityChange(item, newQuantity);
    }
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 md:p-8 ${isDarkMode 
      ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
      : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800'}`}>
      
      {/* Decorative blur elements - adjusted for mobile */}
      <div className="absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-40 sm:w-72 h-40 sm:h-72 bg-pink-500/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 w-40 sm:w-72 h-40 sm:h-72 bg-rose-500/10 dark:bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <h1 className={`text-3xl sm:text-4xl md:text-6xl font-bold text-center animate-fade-in-up
          bg-gradient-to-r ${isDarkMode 
            ? 'from-rose-400 via-purple-400 to-indigo-400' 
            : 'from-rose-600 via-purple-600 to-indigo-600'} 
          bg-clip-text text-transparent leading-normal sm:leading-relaxed md:leading-loose
          pb-2 sm:pb-3 md:pb-4`}>
          Shopping Cart
        </h1>

        {loadError || !cartProducts || cartProducts.length === 0 ? (
          <div className="text-center py-8 sm:py-12 animate-fade-in-up delay-2">
            <p className={`text-lg sm:text-xl mb-6 sm:mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {loadError || "Your cart is empty"}
            </p>
            <Link to="/shop">
              <Button className={`w-full sm:w-auto bg-gradient-to-r ${isDarkMode
                ? 'from-rose-500 to-purple-600 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]'
                : 'from-rose-600 to-pink-500 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]'}
                transform hover:scale-105 transition-all duration-300`}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cartProducts.map((item, index) => (
                <div
                  key={item.id || item._id}
                  className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl shadow-lg border 
                    backdrop-blur-sm transition-all duration-300 animate-fade-in-up
                    ${isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700 hover:border-rose-400 hover:shadow-rose-500/20' 
                      : 'bg-white/80 border-gray-100 hover:border-rose-500 hover:shadow-rose-500/10'}
                    hover:shadow-xl transform hover:scale-[1.02]`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Product Image - Responsive sizing */}
                  <div className="w-full sm:w-32 h-48 sm:h-32 shrink-0">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className={`font-semibold text-base sm:text-lg ${isDarkMode ? 'text-gray-100' : 'text-zinc-800'}`}>
                          {item.productId.name}
                        </h3>
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-zinc-500'}`}>
                          Brand: {item.productId.brand}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={`${isDarkMode 
                          ? 'text-rose-400 hover:bg-rose-900/30' 
                          : 'text-red-400 hover:bg-red-50'}`}
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>
                    
                    {/* Quantity Controls - Made more touch-friendly */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${isDarkMode 
                          ? 'text-gray-300' 
                          : 'text-gray-600'}`}
                        >
                          Qty:
                        </span>
                        <div className={`flex items-center border rounded-lg ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700' 
                            : 'border-gray-200 bg-white shadow-sm'}`}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDecrement(item)}
                            className={`h-10 w-10 sm:h-8 sm:w-8 ${
                              isDarkMode 
                                ? 'hover:bg-gray-600 text-gray-300' 
                                : 'hover:bg-gray-50 text-gray-700 hover:text-rose-600'}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item, e.target.value)}
                            className={`w-16 text-center border-none h-10 sm:h-8 ${
                              isDarkMode 
                                ? 'bg-gray-700 text-gray-100' 
                                : 'bg-white text-gray-700 font-medium'}`}
                            min="1"
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleIncrement(item)}
                            className={`h-10 w-10 sm:h-8 sm:w-8 ${
                              isDarkMode 
                                ? 'hover:bg-gray-600 text-gray-300' 
                                : 'hover:bg-gray-50 text-gray-700 hover:text-rose-600'}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                          ${(item.productId.price || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Section - Made sticky for mobile */}
            <div className={`h-fit lg:sticky lg:top-8 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border backdrop-blur-sm
              animate-fade-in-up delay-2 transition-all duration-300 mt-4 lg:mt-0
              ${isDarkMode 
                ? 'bg-gray-800/50 border-gray-700 shadow-purple-500/10' 
                : 'bg-white/90 border-gray-100 shadow-rose-500/10'}`}
            >
              <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r 
                ${isDarkMode ? 'from-rose-400 to-purple-400' : 'from-rose-600 to-purple-500'} 
                bg-clip-text text-transparent`}>
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-zinc-600'}>Subtotal</span>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-zinc-800'}`}>
                    ${calculateTotal()}
                  </span>
                </div>
                <div className={`flex justify-between ${isDarkMode ? 'text-gray-400' : 'text-zinc-600'}`}>
                  <span>Shipping</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className={`flex justify-between ${isDarkMode ? 'text-gray-400' : 'text-zinc-600'}`}>
                  <span>Tax</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className={`flex justify-between font-bold text-lg ${
                    isDarkMode ? 'text-gray-100' : 'text-zinc-800'}`}
                  >
                    <span>Total</span>
                    <span className={isDarkMode ? 'text-rose-400' : 'text-rose-600'}>
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                  <Button 
                    onClick={handleOnClickPay}
                    className="w-full py-4 sm:py-3 bg-purple-500 hover:bg-purple-600 
                        transition-all duration-300 transform hover:scale-[1.02] 
                        font-semibold text-base sm:text-lg text-white
                        hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]"
                  >
                    Proceed to Checkout
                  </Button>
              </div>

              <p className={`text-center text-xs sm:text-sm mt-4 sm:mt-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                Secure checkout powered by Razorpay
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
