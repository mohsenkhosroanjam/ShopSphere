import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice';

const CategoryFilter = ({ onCategorySelect, activeCategory }) => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    
    // Use RTK Query hook for fetching categories
    const { data: categories = [], isLoading, error } = useFetchCategoriesQuery();

    const handleCategoryClick = (categoryId) => {
        if (categoryId === activeCategory) {
            // If clicking the already active category, clear the filter
            onCategorySelect(null);
            navigate('/shop');
        } else {
            // Set the new category filter
            onCategorySelect(categoryId);
            navigate(`/shop/category/${categoryId}`);
        }
    };

    if (isLoading) {
        return (
            <div className={`mb-8 p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-pink-100"}`}>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Categories
                </h3>
                <div className="animate-pulse flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <div
                            key={n}
                            className={`h-8 w-24 rounded ${isDarkMode ? "bg-gray-700" : "bg-pink-200"}`}
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        toast.error('Failed to load categories');
        return (
            <div className={`mb-8 p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-pink-100"}`}>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Categories
                </h3>
                <p className="text-red-500">Failed to load categories</p>
            </div>
        );
    }

    return (
        <div className={`mb-8 p-4 rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-pink-100"}`}>
            <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Categories
            </h3>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => {
                        onCategorySelect(null);
                        navigate('/shop');
                    }}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeCategory === null
                            ? isDarkMode
                                ? "bg-pink-600 text-white"
                                : "bg-pink-500 text-white"
                            : isDarkMode
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                >
                    All Products
                </button>

                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeCategory === category._id
                                ? isDarkMode
                                    ? "bg-pink-600 text-white"
                                    : "bg-pink-500 text-white"
                                : isDarkMode
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;