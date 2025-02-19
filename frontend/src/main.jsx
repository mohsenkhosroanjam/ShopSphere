import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  Navigate,
  createRoutesFromElements,
} from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./pages/redux/store.js";
import Home from "./pages/Home.jsx";
import TermsAndConditions from "./pages/Footer/TermsAndConditions.jsx";
//private route
import PrivateRoute from "./components/PrivateRoute.jsx";

// Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Profile from "./pages/User/Profile.jsx";

import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import SplShop from "./pages/SplShop/SplShop.jsx";
import Cart from "./components/Cart.jsx";
import FAQ from "./pages/FAQ.jsx";
import { CartProvider } from "./components/CartContext";
import Contact from "./components/Contact"
import BlogList from "./pages/Blog/BlogList.jsx";
import Offer from "./pages/Offer/index.jsx";
import DistributorLogin from "./pages/Auth/DistributorLogin.jsx";
import DistributorRegister from "./pages/Auth/DistributorRegister.jsx";
import Contributors from "./pages/Contributors/Contributors.jsx";
import Shipping from "./pages/Shipping.jsx";
import { UnderConstruction } from "./components/UnderConstruction";
import BlogDetails from "./pages/Blog/BlogDetails.jsx";
import VerifyDeletion from "./pages/Auth/VerifyDeletion.jsx";

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

      <Route path="/verify-deletion/:token" element={<VerifyDeletion />} />

      <Route path="*" element={<UnderConstruction />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </Provider>
);
