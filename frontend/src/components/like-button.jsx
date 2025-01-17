import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export const LikeButton = ({ onClick }) => {
    const [isLiked, setLiked] = useState(false);

    const handleLove = () => {
        setLiked((prev) => !prev);
        onClick(!isLiked); // Pass the updated state to the parent
    };

    return (
        <div>
            {isLiked ? (
                <FaHeart color="red" className="font-semibold md:text-2xl text-md" onClick={handleLove} />
            ) : (
                <FaRegHeart className="md:text-2xl text-md text-gray-400" onClick={handleLove} />
            )}
        </div>
    );
};
