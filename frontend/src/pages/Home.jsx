import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../pages/redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Product from "./Products/Product";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  const [products,setProducts] = useState([])

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
    <div className="flex justify-center">Home</div>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <main>
            <div className="flex justify-between items-center">
              <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
                Special Products
              </h1>
              <Link
                to="/shop"
                className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
                aria-label="Go to Shop"
              >
                Shop
              </Link>
            </div>

            <div>
              {products.length === 0 ? (
                <p className="text-center mt-10">No products found.</p>
              ) : (
                <div className="flex justify-center flex-wrap mt-[2rem]">
                  {products.map((product) => (
                    <div key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Home;
