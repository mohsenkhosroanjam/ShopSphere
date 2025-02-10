import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../../components/CartContext";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites?.favorites || []);
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState("");
  const { isDarkMode } = useTheme();

  // Apply filtering based on the selected filter
  const filteredFavorites = [...favorites].sort((a, b) => {
    if (sortBy === "cheapest") {
      return a.price - b.price;
    } else if (sortBy === "expensive") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wide mb-2">
            Your Favorites
          </h1>
          <p className={`text-lg py-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {favorites.length === 0 ? "No favorite products yet" : `${favorites.length} favorite products`}
          </p>
        </div>

        <div className="text-right">
          <label htmlFor="sortBy" className="font-semibold mr-4">
            Sort By:
          </label>
          <select
            id="sortBy"
            className={`px-4 py-2 rounded font-semibold cursor-pointer ${
              isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-300 text-black border-gray-400"
            }`}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="" disabled>Select</option>
            <option value="cheapest">Price: The cheapest</option>
            <option value="expensive">Price: The most expensive</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mx-16 my-16">
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((product) => (
              <div
                key={product.id}
                className={`shadow-md rounded-lg p-4 transform hover:scale-105 hover:shadow-lg transition duration-300 relative ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-bold mb-2 pr-8">{product.name}</h2>
                <p className="text-lg font-semibold mb-4">${product.price}</p>
                <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full"
                  />
                  <HeartIcon className="absolute top-2 right-2 cursor-pointer z-10" product={product} />
                </div>
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success("Added to cart");
                  }}
                  className={`w-full mt-4 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                    isDarkMode ? "bg-rose-500 hover:bg-rose-600" : "bg-rose-600 hover:bg-rose-700 text-white"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className={`text-lg mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Your favorites list is empty
              </p>
              <Link
                to="/shop"
                className={`px-6 py-3 rounded-lg transition-colors inline-block shadow-md ${
                  isDarkMode ? "bg-rose-500 hover:bg-rose-600 text-white" : "bg-rose-600 hover:bg-rose-700 text-white"
                }`}
              >
                Go Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;