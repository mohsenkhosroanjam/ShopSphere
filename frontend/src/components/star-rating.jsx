import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
    const totalStars = 5; // Total number of stars
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating - fullStars >= 0.5; // Whether to show a half star

    return (
        <div className="flex">
            {Array.from({ length: totalStars }, (_, index) => {
                if (index < fullStars) {
                    return (
                        <FaStar key={index} className="text-yellow-500 md:text-2xl text-md" />
                    );
                } else if (index === fullStars && hasHalfStar) {
                    return (
                        <FaStarHalfAlt key={index} className="text-yellow-500 md:text-2xl text-md" />
                    );
                } else {
                    return (
                        <FaRegStar key={index} className="text-gray-400 md:text-2xl text-md" />
                    );
                }
            })}
        </div>
    );
};

export default StarRating;
