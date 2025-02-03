import { Link } from 'react-router-dom';

export const UnderConstruction = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black text-center p-4">
            <div className="max-w-2xl space-y-8 relative">
                {/* Construction illustration with floating animation */}
                <div className="animate-float w-48 h-48 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        className="w-full h-full text-blue-500 dark:text-pink-500">
                        <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                        <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                        <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
                    </svg>
                    
                    {/* Decorative gear elements */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        className="w-12 h-12 absolute -right-6 top-0 text-indigo-500 dark:text-purple-500 animate-spin-slow">
                        <path d="M12 0c-1.3 0-2.4.9-2.8 2.2L8 7.1c-.6.3-1.2.7-1.7 1.1L1.2 7C.1 6.7-1 7.5.9 8.6l3.8 3.2c-.1.5-.1.9-.1 1.4 0 .5 0 .9.1 1.4L.9 17.4c-1.9 1.1-.8 1.9.3 1.6l5.1-1.2c.5.4 1.1.8 1.7 1.1l1.2 4.9c.4 1.3 1.5 2.2 2.8 2.2s2.4-.9 2.8-2.2l1.2-4.9c.6-.3 1.2-.7 1.7-1.1l5.1 1.2c1.1.3 2.2-.5.3-1.6l-3.8-3.2c.1-.5.1-.9.1-1.4 0-.5 0-.9-.1-1.4l3.8-3.2c1.9-1.1.8-1.9-.3-1.6l-5.1 1.2c-.5-.4-1.1-.8-1.7-1.1l-1.2-4.9C14.4.9 13.3 0 12 0zm0 8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"/>
                    </svg>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        className="w-8 h-8 absolute -left-4 bottom-0 text-blue-400 dark:text-pink-400 animate-spin-slow-reverse">
                        <path d="M12 0c-1.3 0-2.4.9-2.8 2.2L8 7.1c-.6.3-1.2.7-1.7 1.1L1.2 7C.1 6.7-1 7.5.9 8.6l3.8 3.2c-.1.5-.1.9-.1 1.4 0 .5 0 .9.1 1.4L.9 17.4c-1.9 1.1-.8 1.9.3 1.6l5.1-1.2c.5.4 1.1.8 1.7 1.1l1.2 4.9c.4 1.3 1.5 2.2 2.8 2.2s2.4-.9 2.8-2.2l1.2-4.9c.6-.3 1.2-.7 1.7-1.1l5.1 1.2c1.1.3 2.2-.5.3-1.6l-3.8-3.2c.1-.5.1-.9.1-1.4 0-.5 0-.9-.1-1.4l3.8-3.2c1.9-1.1.8-1.9-.3-1.6l-5.1 1.2c-.5-.4-1.1-.8-1.7-1.1l-1.2-4.9C14.4.9 13.3 0 12 0zm0 8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"/>
                    </svg>
                </div>
                
                {/* Title with gradient and glow effect */}
                <h1 className="text-4xl md:text-6xl font-bold relative">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-pink-500 dark:via-purple-500 dark:to-indigo-500 bg-clip-text text-transparent 
                        animate-gradient whitespace-nowrap">
                        Page Under Construction
                    </span>
                </h1>
                
                {/* Description with fade-in animation */}
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl animate-fadeIn">
                    We're working hard to bring you something amazing! 
                    <br />Please check back later.
                </p>
                
                {/* Stylized button with hover effects */}
                <Link
                    to="/"
                    className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-pink-500 dark:to-purple-500 
                        text-white rounded-lg transform hover:scale-105 transition-all duration-300
                        hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] font-semibold"
                >
                    Return Home
                </Link>
                
                {/* Decorative elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/10 dark:bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}; 