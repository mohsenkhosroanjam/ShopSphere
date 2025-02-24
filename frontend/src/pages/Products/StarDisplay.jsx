import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarDisplay = ({ value, text, color = '#ffc107' }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
                <span key={rating}>
                    {value >= rating ? (
                        <FaStar style={{ color }} className="mr-1" />
                    ) : value >= rating - 0.5 ? (
                        <FaStarHalfAlt style={{ color }} className="mr-1" />
                    ) : (
                        <FaRegStar style={{ color }} className="mr-1" />
                    )}
                </span>
            ))}
            <span className={`ml-1 text-sm`}>{text && text}</span>
        </div>
    );
};

export default StarDisplay;