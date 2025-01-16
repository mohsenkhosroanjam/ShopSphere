import { useQuery } from "@tanstack/react-query";
import { ProductWrapper } from "../../components/product-wrapper";

const category = [
    {
        link: "/category/electronic",
        name: "Electronic",
        imageUrl: "/category/electronic.jpg",
        bgColor: "#455446",
    },
    {
        link: "/category/fashion",
        name: "Fashion",
        imageUrl: "/category/fashion.png",
        bgColor: "#5A4554",
    },
    {
        link: "/category/beauty",
        name: "Beauty",
        imageUrl: "/category/beauty.png",
        bgColor: "#544545",
    },
    {
        link: "/category/sports",
        name: "Sports",
        imageUrl: "/category/sports.jpg",
        bgColor: "#455462",
    },
    {
        link: "/category/footwear",
        name: "Footwear",
        imageUrl: "/category/footwear.png",
        bgColor: "#464554",
    },
    {
        link: "/category/fitness",
        name: "Fitness",
        imageUrl: "/category/fitness.png",
        bgColor: "#455442",
    },
    {
        link: "/category/accessories",
        name: "Accessories",
        imageUrl: "/category/accessories.png",
        bgColor: "#545445",
    },
];

const fetchData = async () => {
    const response = await fetch("/data.json");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};


export function Category({onclick}) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: fetchData,
    });

    return (
        <ProductWrapper scrollable={true} header="" view={false}>
                    <div className="hidden md:flex items-center flex-col flex-grow flex-shrink-0 gap-5 lg:basis-[25%] md:basis-[25%] basis-[40%]">
                        <h4 className="text-center lg:text-3xl md:text-xl text-md font-serif font-semibold">Track Offer By Category</h4>
                        <span className="text-center text-gray-300 font-semibold text-xs">Explore Categoryies tailored to your interest</span>
                    </div>
                    {category.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 flex-col flex-grow flex-shrink-0 md:basis-[15%] basis-[17%] transition-transform duration-300 hover:scale-105" >
                        <img onClick={() => onclick(item.name)} src={item.imageUrl} alt="" className="cursor-pointer md:w-full md:h-full rounded-full object-cover w-24 h-20 transition-transform duration-300 hover:rotate-6" />
                        <span className="font-semibold text-md">{item.name}</span>
                        </div>
                    ))}
        </ProductWrapper>
    );
}
