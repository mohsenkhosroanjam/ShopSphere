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
import { useTheme } from '../../context/ThemeContext';

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
  const { isDarkMode } = useTheme();

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
    if (!email.trim() || !password.trim()) {
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

      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/20'}`}>
        <img
          src={LOGIN_BG}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/75' : 'bg-black/45'}`}></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center">
        <div
          className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex justify-center animate-slide-in"
          ref={formRef}
        >
          <div className={`card border rounded-2xl ${isDarkMode
            ? 'bg-gray-900/90 border-gray-700'
            : 'bg-white/40 border-gray-200/40'
            } w-11/12 md:w-8/12 backdrop-blur-xl`}
            style={{
              boxShadow: isDarkMode
                ? '0 8px 32px rgba(0, 0, 0, 0.55)'
                : '0 8px 32px rgba(255, 255, 255, 0.25)',
            }}
          >
            <div className="card-body p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Welcome back
                </h2>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6" noValidate>
                <div className="form-control">
                  <label className="label text-sm font-medium">
                    <span className={`label-text ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address
                    </span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    className={`input w-full p-3 rounded-lg transition-all duration-200 ${isDarkMode
                      ? 'bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-400'
                      : 'bg-white/30 border-gray-300/40 text-gray-800 placeholder-gray-500'
                    } ${emailError ? 'border-red-500' : ''} focus:ring-2 focus:ring-rose-500 backdrop-blur-md`}
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onBlur={() => {
                      if (email && !validateEmail(email)) {
                        setEmailError("Invalid email address")
                      }
                    }}
                  />
                  {emailError && (
                    <p className="text-red-400 text-sm mt-2">{emailError}</p>
                  )}
                </div>

                <div className="form-control relative">
                  <label className="label text-sm font-medium">
                    <span className={`label-text ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Password
                    </span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`input w-full p-3 rounded-lg transition-all duration-200 ${isDarkMode
                      ? 'bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-400'
                      : 'bg-white/30 border-gray-300/40 text-gray-800 placeholder-gray-500'
                    } focus:ring-2 focus:ring-rose-500 backdrop-blur-md`}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`cursor-pointer absolute right-5 top-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg 
                    font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
                    shadow-lg hover:shadow-xl hover:scale-[1.02]`}
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
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    New Customer?{" "}
                    <Link
                      to="/register"
                      className="text-rose-500 hover:text-rose-400 transition-colors duration-200 font-medium"
                    >
                      Create an account
                    </Link>
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Are you a distributor?{" "}
                    <Link
                      to="/distributor/login"
                      className="text-rose-500 hover:text-rose-400 transition-colors duration-200 font-medium"
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
