import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./pages/redux/store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import { CartProvider } from "./components/CartContext";
import Loader from "./components/Loader.jsx";

// Lazy load components
const Home = React.lazy(() => import("./pages/Home.jsx"));
const TermsAndConditions = React.lazy(() => import("./pages/Footer/TermsAndConditions.jsx"));
const Login = React.lazy(() => import("./pages/Auth/Login.jsx"));
const Register = React.lazy(() => import("./pages/Auth/Register.jsx"));
const Profile = React.lazy(() => import("./pages/User/Profile.jsx"));
const UserList = React.lazy(() => import("./pages/Admin/UserList.jsx"));
const CategoryList = React.lazy(() => import("./pages/Admin/CategoryList.jsx"));
const ProductList = React.lazy(() => import("./pages/Admin/ProductList.jsx"));
const ProductUpdate = React.lazy(() => import("./pages/Admin/ProductUpdate.jsx"));
const AllProducts = React.lazy(() => import("./pages/Admin/AllProducts.jsx"));
const Favorites = React.lazy(() => import("./pages/Products/Favorites.jsx"));
const ProductDetails = React.lazy(() => import("./pages/Products/ProductDetails.jsx"));
const Shop = React.lazy(() => import("./pages/Shop/Shop.jsx"));
const SplShop = React.lazy(() => import("./pages/SplShop/SplShop.jsx"));
const Cart = React.lazy(() => import("./components/Cart.jsx"));
const FAQ = React.lazy(() => import("./pages/FAQ.jsx"));
const Contact = React.lazy(() => import("./components/Contact"));
const BlogList = React.lazy(() => import("./pages/Blog/BlogList.jsx"));
const Offer = React.lazy(() => import("./pages/Offer/index.jsx"));
const DistributorLogin = React.lazy(() => import("./pages/Auth/DistributorLogin.jsx"));
const DistributorRegister = React.lazy(() => import("./pages/Auth/DistributorRegister.jsx"));
const Contributors = React.lazy(() => import("./pages/Contributors/Contributors.jsx"));
const Shipping = React.lazy(() => import("./pages/Shipping.jsx"));
const UnderConstruction = React.lazy(() => import("./components/UnderConstruction"));
const BlogDetails = React.lazy(() => import("./pages/Blog/BlogDetails.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/specialshop" element={<SplShop />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/termsAndConditions" element={<TermsAndConditions />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/distributor/login" element={<DistributorLogin />} />
      <Route path="/distributor/register" element={<DistributorRegister />} />
      <Route path="/blog/:slug" element={<UnderConstruction />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
      <Route path="/offers" element={<Offer />} />
      <Route path="/contributors" element={<Contributors />} />

      <Route path="*" element={<UnderConstruction />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CartProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </CartProvider>
  </Provider>
);