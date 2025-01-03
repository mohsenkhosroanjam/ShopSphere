import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from "../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStore,
  FaStar,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";

const ProductDetails = () => {
  const { id: productId } = useParams();
  console.log(productId);
  const navigate = useNavigate();
  // const dispatch = useDispatch()

  const [qty, SetQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  return (
    <div className="max-w-full px-[16%]">
      <div className="pt-2">
        <Link
          to="/"
          className="text-black hover:no-underline rounded-full font-semibold hover:underline px-2 py-1 bg-white">
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message}
        </Message>
      ) : (
        <div className="flex md:flex-row flex-col space-x-[2%] relative items-between my-[2rem] px-4">
          <div className="lg:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1433477155337-9aea4e790195?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt={product.name}
              className="md:h-[80vh] lg:w-[fit-content]"
            />
            <HeartIcon
              product={product}
              className="absolute top-4 right-4 text-red-500 hover:scale-110 cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-between w-full md:w-1/2">
            <h2 className="text-lg md:text-5xl font-semibold">
              {product.name}
            </h2>
            <p className="xl:w-[35rem] lg:w-[35rem] text-[#B0B0B0] md:w-[30rem]">
              {product.description}
            </p>
            <p className="text-2xl md:text-5xl my-4 font-extrabold">
              $ {product.price}
            </p>
            <div className="flex items-center justify-between w-[20rem]">
              <div className="one">
                <h1 className="flex items-center mb-6">
                  <FaStore className="mr-2 text-white" /> Brand: {product.brand}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaStore className="mr-2 text-white" /> Brand: {product.brand}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaStore className="mr-2 text-white" /> Added:{" "}
                  {moment(product.createdAt).fromNow()}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
