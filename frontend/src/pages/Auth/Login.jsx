import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation, useGoogleLoginMutation } from "../redux/api/userApiSlice";
import { setCredientials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { LOGIN_BG } from "../../Utils/constants";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import GoogleLoginButton from "../../Utils/googleBtn";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef();
  const [googleLogin, { isLoading: googleLoginLoading }] = useGoogleLoginMutation();
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()){
      toast.error("Please fill all the fields")
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    setEmailError(""); // Clear error if email is valid

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredientials({ ...res }));
      toast.success(`Logged In`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleGoogleLogIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In Successful!");
      console.log("User Data:", user);

      const res = await googleLogin({
        googleId: user.uid,
        email: user.email,
        username: user.displayName,
        photoURL: user.photoURL,
      }).unwrap();

      console.log(res);
      dispatch(setCredientials({ ...res }));
      toast.success(`Logged In`);
      navigate('/home');
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen relative">
      {(isLoading || googleLoginLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <Loader />
        </div>
      )}

      <div className="absolute inset-0">
        <img
          src={LOGIN_BG}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center">
        <div
          className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex justify-center animate-slide-in"
          ref={formRef}
        >
          <div
            className="card border border-pink-500/40 rounded-xl bg-black bg-opacity-60 w-8/12"
            style={{
              backdropFilter: "blur(300px)", // Apply blur
              WebkitBackdropFilter: "blur(30px)", // For Safari support
            }}
          >
            <div className="card-body p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Welcome back</h2>
                <p className="mt-2 text-white/70">Sign in to your account</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6" noValidate>
                <div className="form-control">
                  <label className="label text-sm font-medium">
                    <span className="label-text text-white">Email Address</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    className={`input w-full p-3 bg-transparent border rounded transition-all duration-200 text-white ${
                      emailError ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-pink-500'
                    }`}
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onBlur={() => {
                      if (email && !validateEmail(email)){
                        setEmailError("Invalid email address")
                      }
                    }}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                  )}
                </div>

                <div className="form-control relative">
                  <label className="label text-sm font-medium">
                    <span className="label-text text-white">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input w-full p-3 bg-transparent border border-white/20 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer absolute right-5 top-10"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
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

                <GoogleLoginButton onClick={handleGoogleLogIn} />

                <div className="mt-6 text-center space-y-2">
                  <p className="text-white">
                    New Customer?{" "}
                    <Link
                      to="/register"
                      className="text-pink-500 hover:text-pink-400 transition-colors duration-200 underline"
                    >
                      Create an account
                    </Link>
                  </p>
                  <p className="text-white">
                    Are you a distributor?{" "}
                    <Link
                      to="/distributor/login"
                      className="text-pink-500 hover:text-pink-400 transition-colors duration-200 underline"
                    >
                      Distributor login
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

const styles = `
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 1s ease-out forwards;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
