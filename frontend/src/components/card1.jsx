import { FaRegEye } from "react-icons/fa";
import StarRating from "./star-rating";
import HeartIcon from "../pages/Products/HeartIcon";

export function ProductCard({
    scrollable,
    itemName = "Default Item Name",
    imageUrl = "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-keyboard.svg",
    discount = 20,
    rating = 4.6,
    ratingCount = 4775,
    price = 450,
    buttonText = "Add to cart",
    key
}) {
    return (
        <div key={key} className={`${scrollable ? "flex-grow flex-shrink-0 md:basis-[15%] basis-[40%]" : "w-full"} shadow-sm shadow-white rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800`}>
            <a href="#">
                <img className="object-cover rounded-md md:w-full w-32 m-auto md:h-36 h-20" src={imageUrl} alt={itemName} />
            </a>
            <div className="md:mt-3 mt-1">
                <div className="md:mb-4 mb-1 flex items-center justify-between gap-4">
                    <span className="me-2 rounded bg-blue-400 md:px-2.5 px-1 py-0.5 text-xs md:text-md font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                        {discount }% Off
                    </span>

                    <div className="flex items-center justify-end gap-5 mt-2">
                        <button><FaRegEye className="text-gray-400 md:text-2xl text-md" /></button>
                        <button><HeartIcon className="text-gray-500" color="gray" /></button>
                    </div>
                </div>

                <a href="#" className="md:text-lg text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                    {itemName}
                </a>

                <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center">
                        <StarRating rating={rating} />
                    </div>

                    <p className="text-sm font-medium text-gray-900 dark:text-white">{rating}</p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({ratingCount})</p>
                </div>

                <ul className="mt-2 flex items-center gap-4">
                    <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                    </li>

                    <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                        <p className="hidden md:block text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                    </li>
                </ul>
                <div className="md:mt-4 mt-2 flex items-center justify-between gap-4">
                    <p className="md:text-2xl text-sm font-extrabold leading-tight text-gray-900 dark:text-white">Rs.{price}</p>

                    <button type="button" className="inline-flex items-center rounded-lg bg-blue-700 md:px-5 px-2 py-2.5 text-sm  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 font-semibold focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
