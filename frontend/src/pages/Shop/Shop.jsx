import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HeartIcon from "../Products/HeartIcon";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useGetProductsQuery, useCreateProductMutation } from '../redux/api/productApiSlice';
import { useAddCartMutation } from '../redux/api/cartSlice';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_URL } from '../redux/constants';

export default function ShopPage() {
  const { isDarkMode } = useTheme();
  const { keyword, categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || null);

  const [addCart, { isLoading: cartLoading }] = useAddCartMutation();
  const [addProduct, { isLoading: productLoading }] = useCreateProductMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [cart, setCartDetails] = useState({
    userId: '',
    productId: '',
    quantity: 1,
  });

  const [showAddModal, setShowAddModal] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      brand: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      image: null
    }
  });

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  // Fetch products based on search query and/or category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url;
        if (selectedCategory) {
          url = `${CATEGORY_URL}/${selectedCategory}/products`;

        } else if (searchQuery) {
          url = `/api/products?search=${encodeURIComponent(searchQuery)}`;
        } else {
          url = '/api/products';
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products || data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategory]);

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (showAddModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAddModal]);

  const handleCart = async (product) => {
    if (!userInfo || !userInfo._id) {
      toast.error('Login to add product to cart!');
      return;
    }

    cart.userId = userInfo._id;
    cart.productId = product._id;

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    navigate(`/shop/${category}`);
  };

  const ProductModal = () => {
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [mainImageName, setMainImageName] = useState('');
    const [additionalImageNames, setAdditionalImageNames] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleMainImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setMainImage(file);
        setMainImageName(file.name);
      }
    };

    const handleAdditionalImagesChange = (event) => {
      const files = Array.from(event.target.files);
      if (files.length + additionalImages.length > 4) {
        toast.error('Maximum 4 additional images allowed');
        return;
      }
      setAdditionalImages(prev => [...prev, ...files]);
      setAdditionalImageNames(prev => [...prev, ...files.map(file => file.name)]);
    };

    const removeAdditionalImage = (index) => {
      setAdditionalImages(prev => prev.filter((_, i) => i !== index));
      setAdditionalImageNames(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddProduct = async (formData) => {
      try {
        setIsUploading(true);
        const finalFormData = new FormData();

        // Append text fields
        Object.keys(formData).forEach(key => {
          if (key !== 'image' && key !== 'additionalImages') {
            finalFormData.append(key, formData[key]);
          }
        });

        // Append main image
        if (mainImage) {
          finalFormData.append('image', mainImage);
        }

        // Append additional images
        additionalImages.forEach(image => {
          finalFormData.append('additionalImages', image);
        });

        const result = await addProduct(finalFormData).unwrap();
        if (result) {
          toast.success('Product added successfully!');
          setShowAddModal(false);
          reset();
          setMainImage(null);
          setMainImageName('');
          setAdditionalImages([]);
          setAdditionalImageNames([]);
        }
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error(error?.data?.message || 'Failed to add product');
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm
                      animate-[fadeIn_0.3s_ease-in-out]">
        <div className="w-full max-w-2xl mx-auto bg-black/60 rounded-lg border border-pink-500/40 p-4 sm:p-6 md:p-8 my-4 sm:my-8
                        animate-[slideIn_0.3s_ease-in-out] shadow-xl"
          style={{
            backdropFilter: "blur(300px)",
            WebkitBackdropFilter: "blur(300px)",
          }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 sm:mb-6 
                         animate-[fadeIn_0.5s_ease-in-out]">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="form-control">
                <label className="label text-sm font-medium">
                  <span className="label-text text-white">Product Name</span>
                </label>
                <input
                  {...register('name', { required: 'Product name is required' })}
                  type="text"
                  placeholder="Enter product name"
                  className="input w-full p-2.5 bg-transparent border border-white/30 rounded 
                           transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                />
              </div>

              <div className="form-control">
                <label className="label text-sm font-medium">
                  <span className="label-text text-white">Brand</span>
                </label>
                <input
                  {...register('brand', { required: 'Brand is required' })}
                  type="text"
                  placeholder="Enter brand name"
                  className="input w-full p-2.5 bg-transparent border border-white/30 rounded 
                           transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-sm font-medium">
                <span className="label-text text-white">Description</span>
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                placeholder="Enter product description"
                className="input w-full p-2.5 bg-transparent border border-white/30 rounded 
                           transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400 h-20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="form-control">
                <label className="label text-sm font-medium">
                  <span className="label-text text-white">Price</span>
                </label>
                <input
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  type="number"
                  placeholder="Enter price"
                  className="input w-full p-2.5 bg-transparent border border-white/30 rounded 
                           transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                />
              </div>

              <div className="form-control">
                <label className="label text-sm font-medium">
                  <span className="label-text text-white">Quantity</span>
                </label>
                <input
                  {...register('quantity', {
                    required: 'Quantity is required',
                    min: { value: 0, message: 'Quantity must be positive' }
                  })}
                  type="number"
                  placeholder="Enter quantity"
                  className="input w-full p-2.5 bg-transparent border border-white/30 rounded 
                           transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="form-control">
                <label className="label text-sm font-medium">
                  <span className="label-text text-white">Category</span>
                </label>
                <input
                  {...register('category', { required: 'Category is required' })}
                  type="text"
                  placeholder="Enter category"
                  className="input w-full p-2.5 bg-transparent border border-white/30 rounded 
                           transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400
                           hover:border-pink-500/50"
                />
              </div>

              <div className="form-control">
                <label className="label text-sm font-medium">
                  <span className="label-text text-white">Main Product Image</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="mainImageInput"
                    onChange={handleMainImageChange}
                  />
                  <label
                    htmlFor="mainImageInput"
                    className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 
                             text-white rounded cursor-pointer hover:from-pink-600 hover:to-pink-700
                             transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                             shadow-md hover:shadow-pink-500/25"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {mainImageName ? 'Change Main Image' : 'Choose Main Image'}
                  </label>
                  {mainImageName && (
                    <div className="mt-2 text-sm text-white/80 break-all">
                      <span className="font-medium">Selected main image:</span> {mainImageName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label text-sm font-medium">
                  <span className="label-text text-white">Additional Images (Max 4)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="additionalImagesInput"
                    onChange={handleAdditionalImagesChange}
                    disabled={additionalImages.length >= 4}
                  />
                  <label
                    htmlFor="additionalImagesInput"
                    className={`w-full flex items-center justify-center px-4 py-2.5 
                             text-white rounded cursor-pointer transition-all duration-300 
                             shadow-md ${additionalImages.length >= 4
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:shadow-pink-500/25 transform hover:scale-[1.02]'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Add Additional Images ({additionalImages.length}/4)
                  </label>
                </div>

                {additionalImageNames.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {additionalImageNames.map((name, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                        <span className="text-sm text-white/80 truncate">{name}</span>
                        <button
                          onClick={() => removeAdditionalImage(index)}
                          className="text-red-500 hover:text-red-600 p-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  reset();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-gray-600 text-white rounded font-semibold
                         transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg
                         transform hover:scale-[1.02]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 
                         text-white rounded font-semibold transition-all duration-300 ease-in-out 
                         hover:from-pink-600 hover:to-pink-700 hover:shadow-lg transform hover:scale-[1.02]
                         ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUploading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Add these keyframes to your global CSS or at the top of your component
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Shop'}
          </h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            {searchQuery 
              ? `${products.length} products found` 
              : selectedCategory 
                ? 'Products in selected category' 
                : 'Explore our entire collection here!'
            }
          </p>
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Category filter sidebar */}
          <div className="lg:w-1/4 p-4 mt-4">
            <CategoryFilter 
              onCategorySelect={handleCategorySelect} 
              activeCategory={selectedCategory} 
            />
          </div>

          {/* Products grid */}
          <div className="lg:w-3/4">
            {userInfo?.isDistributor && (
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => setShowAddModal(true)}
                  className={`px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105
                  ${isDarkMode ? "bg-pink-600 hover:bg-pink-700 text-white shadow-pink-500/50"
                    : "bg-pink-500 hover:bg-pink-600 text-black shadow-lg"}`}
                >
                  Add New Product
                </button>
              </div>
            )}

            <Link
              to="/specialshop"
              className={`absolute top-10 right-40 font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105
              ${isDarkMode ? "bg-gradient-to-r from-gray-800 to-pink-600 text-white"
                : "bg-gradient-to-r from-white to-pink-500 text-black"}`}
            >
              Tap to explore exclusive products
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
              {loading ? (
                // Loading placeholders
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className={`shadow-md rounded-lg p-4 ${isDarkMode ? "bg-gray-800" : "bg-pink-100"}`}>
                    <div className="animate-pulse">
                      <div className={`h-6 w-3/4 mb-2 rounded ${isDarkMode ? "bg-gray-700" : "bg-pink-200"}`}></div>
                      <div className={`h-5 w-1/4 mb-4 rounded ${isDarkMode ? "bg-gray-700" : "bg-pink-200"}`}></div>
                      <div className={`w-full h-40 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-pink-200"}`}></div>
                      <div className={`w-full h-10 mt-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-pink-200"}`}></div>
                    </div>
                  </div>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
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
                      onClick={() => handleCart(product)}
                      className={`w-full mt-4 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${isDarkMode ? "bg-gray-200 hover:bg-gray-300 text-black" : "bg-white hover:bg-gray-100 text-pink-500"}`}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
              ) : (
                <div className={`col-span-full text-center text-lg ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                  No products found. Try a different category or search term.
                </div>
              )}
            </div>
          </div>
        </div>

        {showAddModal && <ProductModal />}
      </div>
    </div>
  );
}