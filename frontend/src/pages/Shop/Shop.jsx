import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../components/CartContext';
import HeartIcon from "../Products/HeartIcon";

const products = [
  {
    id: 8,
    name: "Fitbit Charge 5",
    price: 179.95,
    image: "https://m.media-amazon.com/images/I/61Llpu4OGYL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 9,
    name: "Nintendo Switch Console",
    price: 299.99,
    image: "https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg"
  },
  {
    id: 11,
    name: "GoPro HERO9 Black",
    price: 399.99,
    image: "https://avstore.in/cdn/shop/products/AVStore-GoPro-HERO9-Black-7.jpg?v=1632397592&width=2048"
  },
  {
    id: 14,
    name: "Roku Streaming Stick+",
    price: 49.99,
    image: "https://m.media-amazon.com/images/I/71gBY-gGBwL._AC_SL1500_.jpg"
  },
  {
    id: 15,
    name: "Logitech MX Master 3 Mouse",
    price: 99.99,
    image: "https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg"
  },
  {
    id: 16,
    name: "HP Envy 6055e All-in-One Printer",
    price: 169.99,
    image: "https://www.hp.com/ca-en/shop/Html/Merch/Images/c07016928_500x367.jpg"
  },
  {
    id: 17,
    name: "JBL Flip 5 Bluetooth Speaker",
    price: 119.95,
    image: "https://images-cdn.ubuy.co.in/66e06d537bee79683d329fb4-jbl-flip-5-portable-wireless-bluetooth.jpg"
  },
  {
    id: 18,
    name: "Apple Watch Series 7",
    price: 399.00,
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 19,
    name: "Microsoft Surface Pro 7",
    price: 749.99,
    image: "https://m.media-amazon.com/images/I/71Q3iSQAwAS._AC_SL1500_.jpg"
  },
  {
    id: 1,
    name: "Apple iPhone 13",
    price: 799.00,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-family-hero"
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 699.99,
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 7,
    name: "Amazon Echo Dot (4th Gen)",
    price: 49.99,
    image: "https://images-na.ssl-images-amazon.com/images/I/714Rq4k05UL._AC_SL1000_.jpg"
  },
  {
    id: 3,
    name: "Sony WH-1000XM4 Headphones",
    price: 349.99,
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg"
  },
  {
    id: 5,
    name: "Apple MacBook Pro 16\"",
    price: 2399.00,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-spacegray-select-202110"
  },
  {
    id: 13,
    name: "Samsung Galaxy Tab S7",
    price: 649.99,
    image: "https://m.media-amazon.com/images/I/71h6PpGaz9L._AC_SL1500_.jpg"
  },
  {
    id: 10,
    name: "Canon EOS Rebel T7 DSLR Camera",
    price: 449.99,
    image: "https://m.media-amazon.com/images/I/71ZYxtmYkPL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 12,
    name: "Apple AirPods Pro",
    price: 249.00,
    image: "https://m.media-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg"
  },
];



export default function ShopPage() {
  const { addToCart } = useCart();
  const { keyword } = useParams();
  const { data, isLoading: productsLoading, isError } = useGetProductsQuery({ keyword });
  const [products, setProducts] = useState([]);

  const [addCart, { isLoading: cartLoading }] = useAddCartMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [cart, setCartDetails] = useState({
    userId: '',
    productId: '',
    quantity: 1,
  });

  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong! Please try again.');
    }
  }, [isError]);

  const handleCart = async (product) => {
    if (!userInfo || !userInfo._id) {
      toast.error('Login to add product to cart!');
      return;
    }

   
    cart.userId=userInfo._id;
    cart.productId=product._id;


    if (cartLoading) return; // Prevent duplicate requests

    try {
      console.log(userInfo._id);
      const res = await addCart(cart).unwrap();
      if (res.message) {
        console.log(res.message);
        console.log(cart);
        toast.error(res.message);
        return;
      }
      toast.success('Product added to cart!');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add product to cart!');
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide mb-2">Shop</h1>
          <p className="text-lg text-gray-400 py-4">Explore our entire collection here!</p>
        </div>

        <Link
          to="/specialshop"
          className="absolute top-10 right-40 bg-gradient-to-r from-white to-pink-500 text-black font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Tap to explore exclusive products
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mx-16 my-16">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product.id}
                className="bg-pink-500 shadow-md rounded-lg p-4 transform hover:scale-105 hover:shadow-lg transition duration-300 relative product-box"
              >
                <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
                <p className="text-lg text-white font-semibold mb-4">${product.price}</p>
                <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full"
                  />
                  <HeartIcon product={product} />
                </div>
                <button
                  onClick={() => handleCart(product)}
                  className="w-full mt-4 bg-white hover:bg-gray-100 text-pink-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg">
              {productsLoading ? 'Loading...' : 'No products found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
