import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { useGetProductByIdQuery, useGetSimilarProductsQuery, useCreateProductReviewMutation } from '../redux/api/productApiSlice';
import { useAddCartMutation } from '../redux/api/cartSlice';
import { toast } from 'react-toastify';
import HeartIcon from './HeartIcon';
import Loader from '../../components/Loader';
import StarRating from './StarRating';
import { FaStar } from 'react-icons/fa';
import Scrollbtn from "../../components/scrollbtn";

const ProductDetails = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [addCart] = useAddCartMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { data: similarProducts, isLoading: loadingSimilar } = useGetSimilarProductsQuery(id);
  const [createReview, { isLoading: isReviewLoading, error: reviewError }] = useCreateProductReviewMutation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [characterLimit, setCharacterLimit] = useState(500);

  const handleAddToCart = async () => {
    if (!userInfo) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await addCart({
        userId: userInfo._id,
        productId: product._id,
        quantity,
      }).unwrap();
      toast.success('Product added to cart');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add to cart');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error('Please login to submit a review');
      return;
    }

    if (!review.trim()) {
      toast.error('Review cannot be empty');
      return;
    }

    try {
      await createReview({
        id: product._id,
        review,
        rating
      }).unwrap();
      setReview('');
      setRating(0);
      toast.success('Review submitted successfully!');
    } catch (err) {
      console.error('Failed to submit review:', err);
      toast.error(err?.data?.message || 'Failed to submit review');
    }
  };

  const displayRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className="mr-1"
            color={index < Math.round(rating) ? "#ffc107" : "#e4e5e9"}
            size={18}
          />
        ))}
        <span className="ml-2">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const SimilarProducts = () => (
    <section className="mt-16 lg:mt-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Similar Products</h2>
        <Link
          to={`/products?category=${product?.category?.name}`}
          className="text-pink-500 hover:text-pink-600 font-medium"
        >
          View More →
        </Link>
      </div>
      {loadingSimilar ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : similarProducts?.length === 0 ? (
        <p className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          No similar products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mx-16 my-16">
          {similarProducts?.map((product) => (
            <div key={product._id} className={`shadow-md rounded-lg p-4 transform hover:scale-105 hover:shadow-lg transition duration-300 relative ${isDarkMode ? "bg-gray-800 text-white" : "bg-pink-500 text-black"}`}>
              <Link to={`/product/${product._id}`}>
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-lg font-semibold mb-4">${product.price}</p>
                <div className={`w-full h-40 rounded-md flex items-center justify-center relative ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-500"}`}>
                  <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
                </div>
              </Link>
              <HeartIcon product={product} />
              <button
                onClick={() => handleAddToCart()}
                className={`w-full mt-4 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${isDarkMode ? "bg-gray-200 hover:bg-gray-300 text-black" : "bg-white hover:bg-gray-100 text-pink-500"}`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <Scrollbtn />
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Section */}
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="relative group">
              <div className="aspect-[1/1] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={[product?.image, ...(product?.additionalImages || [])][selectedImage]}
                  alt={product?.name}
                  className="w-full h-full object-contain object-center 
                            transition-transform duration-500 ease-in-out
                            group-hover:scale-105 cursor-zoom-in"
                />
                <div className="absolute top-4 right-4 backdrop-blur-sm rounded-full p-1.5">
                  <HeartIcon product={product} />
                </div>
              </div>
            </div>

            {/* Image selector */}
            {product?.additionalImages?.length > 0 && (
              <div className="mt-6 grid grid-cols-5 gap-4">
                {[product.image, ...product.additionalImages].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden 
                              border-2 transition-all duration-200 ease-in-out
                              hover:ring-2 hover:ring-pink-500 hover:ring-offset-2
                              dark:hover:ring-offset-gray-900
                              ${selectedImage === idx ? 'ring-2 ring-pink-500' : ''}`}
                    style={{
                      borderColor: selectedImage === idx ?
                        '#ec4899' : (isDarkMode ? '#374151' : '#e5e7eb')
                    }}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === idx && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-pink-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight">{product?.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl">
                ${product?.price}
                <span className="ml-2 text-sm text-gray-500">USD</span>
              </p>
              {/* Add average rating display */}
              <div className="mt-2">
                {displayRating(product?.rating || 0)}
                <span className="ml-2 text-sm text-gray-500">
                  ({product?.numReviews || 0} reviews)
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mt-6">
              <div className="flex items-center">
                <div className={`rounded-full h-3 w-3 ${product?.quantity > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <p className="ml-2 text-sm">
                  {product?.quantity > 0 ? `In Stock (${product?.quantity} available)` : 'Out of Stock'}
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">Description</h3>
              <div className={`mt-2 prose prose-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                <p>{product?.description}</p>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium">Specifications</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-500"}>Brand</p>
                  <p className="font-medium">{product?.brand}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-500"}>Category</p>
                  <p className="font-medium">{product?.category?.name || 'None'}</p>
                </div>
                {Object.entries(product?.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-500"}>{key}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product?.quantity}
                  className={`flex-1 w-full rounded-md py-3 px-8 text-base font-medium text-white 
                    ${product?.quantity === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : isDarkMode
                        ? "bg-pink-600 hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        : "bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    } transition-colors duration-200`}
                >
                  {product?.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <SimilarProducts />

        {/* Improved Reviews Section */}
        <section className="mt-16 lg:mt-24">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          {product?.reviews?.length === 0 ? (
            <p className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product?.reviews?.map((review) => (
                <div
                  key={review._id}
                  className={`p-6 rounded-lg transform hover:scale-[1.02] transition-all duration-200 ${isDarkMode ? "bg-gray-800" : "bg-white shadow-lg"
                    }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      {/* Display individual review rating */}
                      <div className="mt-1">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className="inline-block mr-1"
                            color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                            size={16}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Improved Review Form */}
        <section className="mt-16 lg:mt-24">
          <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className="text-2xl font-bold mb-8">Submit a Review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">Rating</label>
                <StarRating rating={rating} setRating={setRating} />
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">Your Review</label>
                <textarea
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                    setCharacterLimit(500 - e.target.value.length);
                  }}
                  maxLength={500}
                  placeholder="Share your experience with this product..."
                  className={`w-full p-4 rounded-lg border ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 focus:ring-pink-500 focus:border-pink-500'
                    : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                    } transition-colors duration-200`}
                  rows="5"
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span className={characterLimit < 50 ? 'text-red-500' : 'text-gray-500'}>
                    {characterLimit} characters remaining
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isReviewLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${isReviewLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : `${isDarkMode ? 'bg-pink-600 hover:bg-pink-700' : 'bg-pink-500 hover:bg-pink-600 text-white'}`
                  }`}
              >
                {isReviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>

              {reviewError && (
                <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800">
                  Error: {reviewError.message}
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
