import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../redux/api/userApiSlice";
import { setCredientials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { LOGIN_BG } from "../../Utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();
  
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/login";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredientials({ ...res }));
      toast.success(`Logged In`)
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <img
          src={LOGIN_BG}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex justify-center" ref={formRef}>
          <div className="card border border-pink-500/40 rounded-xl  bg-black bg-opacity-20 hover:border-pink-500/80 backdrop-blur-sm w-8/12">
            <div className="card-body p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Welcome back</h2>
                <p className="mt-2 text-white/70">
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                <div className="form-control">
                  <label className="label text-sm font-medium">
                    <span className="label-text text-white">Email Address</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input w-full p-3 bg-transparent border border-white/20 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label text-sm font-medium">
                    <span className="label-text text-white">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input w-full p-3 bg-transparent border border-white/20 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-pink-500 text-white py-3 px-4 rounded font-semibold
                             transition-all duration-200 hover:bg-pink-600 hover:shadow-lg
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader />
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-white">
                    New Customer?{" "}
                    <Link
                      to="/register"
                      className="text-pink-500 hover:text-pink-400 transition-colors duration-200"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;