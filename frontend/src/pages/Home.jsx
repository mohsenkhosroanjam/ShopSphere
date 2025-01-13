import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../pages/redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Product from "./Products/Product";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import HomeImage from "../assets/HomeFinal.png";
import NewsletterSection from "../components/NewsLetter";

const Home = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
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
          <section className="flex flex-col lg:flex-row items-center w-full mb-10 justify-between pl-10 py-[50px] bg-gradient-to-t from-[#000000] to-[#0F172A]">
            <div className="text-center lg:text-left max-w-2xl ml-6">
              <h1 className="text-6xl font-sans font-extrabold text-gray-200 mb-6 animate-fade-in-up">
                Shop the Latest Styles,<span className="text-pink-500">Anytime</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 animate-fade-in-up delay-2">
                Discover the trendiest apparel, accessories, and more at prices you'll love. Your new look is just a click away!
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full overflow-hidden">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md shadow-md transition">
                  <Link to="/shop">Start Shopping</Link>
                </button>
                <button className="bg-transparent text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white px-6 py-3 rounded-md shadow-md transition">
                  <Link to="/specialshop">Explore Deals</Link>
                </button>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 animate-bounce-y">
              <img
                src={HomeImage}
                alt="Featured Product"
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
          </section>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;

const styles = `
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceY {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animate-fade-in-up.delay-2 {
  animation-delay: 0.2s;
}

.animate-bounce-y {
  animation: bounceY 2s infinite ease-in-out;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
