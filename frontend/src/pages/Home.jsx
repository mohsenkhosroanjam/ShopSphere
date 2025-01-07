import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../pages/redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Product from "./Products/Product";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import HomeImage from "../assets/HomeFinal.png"

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });


  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
    }
  }, [data]);

  
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong! Please try again.");
    }
  }, [isError]);

  return (
    <>
        {!keyword && <Header />}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="bg-black text-white min-h-screen flex flex-col ml-10">
            <section className="flex flex-col lg:flex-row items-center w-full mb-10 justify-between pl-10 py-[50px] bg-gradient-to-b from-gray-900 to-black">
              <div className="text-center lg:text-left max-w-2xl">
                <h1 className="text-6xl font-sans font-extrabold text-gray-200 mb-6">
                  Shop the Latest Styles,<span className='text-pink-500'>Anytime</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  Discover the trendiest apparel, accessories, and more at prices you'll love. Your new look is just a click away!
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full overflow-hidden">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md shadow-md transition">
                    <Link to="/shop" >Start Shopping</Link>
                  </button>
                  <button className="bg-transparent text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white px-6 py-3 rounded-md shadow-md transition">
                  <Link to="/shop" >Explore Deals </Link>
                  </button>
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <img
                  src={HomeImage}
                  alt="Featured Product"
                  className="max-w-full rounded-lg shadow-lg"
                />
              </div>
          </section>
          <Footer/>
      </div>
        )}
    </>
  );
};

export default Home;
