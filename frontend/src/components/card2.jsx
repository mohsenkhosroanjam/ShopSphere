import { FaEye, FaRegStar, FaStar } from "react-icons/fa";
import { calculateDiscountedPrice } from "../Utils/discunt-price"
import StarRating from "./star-rating";
import HeartIcon from "../pages/Products/HeartIcon";

export function ProductCard2({ itemName, discount = 20, price, classNamed, scrollable, image }) {
    return (
        <div className={` ${scrollable ? "flex-grow flex-shrink-0 md:basis-[15%] basis-[50%]" : "w-full"} bg-[#DBCCCD] text-black rounded-md py-4 px-4 md:p-5 cursor-pointer flex flex-col justify-between min-h-[450px]`}>
            <img src={image || "/images/leather-wallet.jpg"} alt="" className="w-32 m-auto" />
            <div className="mt-4 flex gap-2">
                <span className="rounded-md font-medium bg-slate-200 md:text-md p-1 md:px-2 text-xs">quick ready</span>
                <span className="rounded-md font-medium bg-slate-200 md:text-md p-1 md:px-2 text-xs">quick ready</span>
            </div>
            <h3 className="mt-4 font-serif font-semibold md:text-2xl text-xl">{itemName}</h3>
            <p className="font-semibold mt-2">Rs.{calculateDiscountedPrice(price, discount)}.00</p>
            <p className="flex gap-2 mt-2 items-center"><span className="line-through text-gray-400">{price}.00</span><span className="bg-green-400 rounded-md p-1 px-2 text-white font-semibold">save {discount}%</span></p>
            <p className="mt-3 flex gap-2 items-center"><StarRating rating={4.6} /> 20K reviews</p>
            <div className="grid grid-cols-5 gap-1 mt-4 py-1">
                <button className="bg-orange-700 text-white font-semibold col-span-3 py-2 px-3 rounded-md">Add to cart</button>
                <button className="bg-slate-400 flex items-center justify-center py-2 px-3 rounded-full"><HeartIcon className="text-gray-500 text-lg" /></button>
                <button className="bg-slate-400 flex items-center justify-center py-2 px-3 rounded-full"><FaEye className="text-black text-lg" /></button>
            </div>
        </div>
    );
    
}
