import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to shop page without search parameter if the search field is empty
        // This will show all products
        if (searchTerm.trim()) {
            navigate(`/shop?search=${searchTerm}`);
        } else {
            navigate('/shop');
        }
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className="w-full mt-5 d:w-auto md:min-w-[350px] px-4 md:px-0">
            <form onSubmit={handleSubmit} className="flex items-stretch w-full h-12">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full h-full px-4 border rounded-l-lg focus:outline-none focus:ring-2 transition-all ${
                            isDarkMode
                                ? "bg-gray-800 border-gray-700 text-white focus:ring-pink-500/50 focus:border-pink-500"
                                : "bg-white border-gray-300 text-black focus:ring-pink-400/40 focus:border-pink-400"
                        }`}
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>
                <button
                    type="submit"
                    title={searchTerm.trim() ? "Search products" : "Show all products"}
                    className={`w-12 flex items-center justify-center rounded-r-lg transition-all ${
                        isDarkMode
                            ? "bg-pink-600 hover:bg-pink-700 text-white"
                            : "bg-pink-500 hover:bg-pink-600 text-white"
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;