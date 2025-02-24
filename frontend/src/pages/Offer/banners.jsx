import React from "react";
import Carousel from "../../components/carousel";

export function Banners() {
    const banners = [
        {
          "name": "Big Electronics Sale",
          "link": "https://www.flipkart.com/electronics-sale",
          "imageUrl": "/images/banner1.jpg"
        },
        {
          "name": "Fashion Fiesta",
          "link": "https://www.flipkart.com/fashion-sale",
          "imageUrl": "/images/banner2.png"
        },
        {
          "name": "Sports & Fitness Deals",
          "link": "https://www.flipkart.com/sports-fitness-deals",
          "imageUrl": "/images/fitness.jpg"
        },
        {
          "name": "Beauty & Personal Care",
          "link": "https://www.flipkart.com/beauty-care",
          "imageUrl": "/images/beautrry.jpg"
        },
        {
          "name": "Footwear Clearance Sale",
          "link": "https://www.flipkart.com/footwear-sale",
          "imageUrl": "/images/footwear-banner.jpg"
        }
      ];
      
    return (
        <Carousel>
            {banners.map((item, index) => (
                <img key={index} src={item.imageUrl} alt={item.name} className="md:w-[30rem] object-fill md:h-[30rem]" />
            ))}
        </Carousel>
    );
}
