import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    addToFavorites,
    removeFromFavorites,
} from "../redux/features/favorites/favoriteSlice";
import { toast } from "react-toastify";

const HeartIcon = ({ product ,className}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const userInfo = useSelector((state) => state.auth?.userInfo);

    const isFavorite = favorites?.some((p) => p._id === product._id) || false;

    const toggleFavorite = (e) => {
        e.stopPropagation();
        
        if (!userInfo) {
            toast.error("Please login first");
            return;
        }

        try {
            if (isFavorite) {
                dispatch(removeFromFavorites(product));
                toast.success("Removed from favorites");
            } else {
                dispatch(addToFavorites(product));
                toast.success("Added to favorites");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div
            className={className ? className : "absolute top-2 right-2 cursor-pointer z-10"}
            onClick={toggleFavorite}
        >
            {isFavorite ? (
                <FaHeart className="text-pink-500 text-xl hover:scale-110 transition-transform" />
            ) : (
                <FaRegHeart className="text-black text-xl hover:scale-110 transition-transform" />
            )}
        </div>
    );
};

export default HeartIcon;