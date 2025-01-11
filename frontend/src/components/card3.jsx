import { FaRegStar, FaStar } from "react-icons/fa";
import { calculateDiscountedPrice } from "../Utils/discunt-price";

export function ProductCard3({star,itemName,price=700,discount=60}){
    return (
        <div className="text-black rounded-md cursor-pointer flex-grow flex-shrink-0 md:basis-[15%] basis-[40%] p-5 bg-[#FFD1E0]">
            <img src="/images/earbuds.png" className="m-auto w-32 h-20" alt="" />
            <span className="flex gap-2 bg-green-600 w-fit px-2 p-1 font-exptrabold  rounded-md items-center"><span className="md:text-xl text-md text-white font-extrabold">4</span><FaStar fill="white" /></span>
            <h2 className="mt-2 font-serif font-semibold md:text-2xl text-md">{itemName || "Wireless Earbuds Pro"}</h2>
            <p className="flex gap-2 items-center mt-2"><span className="md:text-xl font-semibold line-through text-sm text-gray-400">₹{price}</span><span className="font-semibold font-serif md:text-2xl text-xl">₹{calculateDiscountedPrice(price,discount)}</span></p>
            <p className="text-green-800 font-bold mt-3">{discount}% Off</p>
        </div>
    )
}