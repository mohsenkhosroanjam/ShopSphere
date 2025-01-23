import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredientials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation, useGoogleSignInMutation } from "../redux/api/userApiSlice";
import { LOGIN_BG } from "../../Utils/constants";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import GoogleLoginButton from "../../Utils/googleBtn";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  const [register, { isLoading }] = useRegisterMutation();
  const [googleSignIn, { isLoading: googleSignInLoading }] = useGoogleSignInMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

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
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword == ""
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      setEmailError(""); 
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        toast.success("Account successfully created");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const res = await googleSignIn({
        googleId: user.uid,
        email: user.email,
        username: user.displayName,
        photoURL: user.photoURL,
      }).unwrap();
      dispatch(setCredientials({ ...res }));
      toast.success(`SignUp Successfully`);
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen relative">
      {(isLoading || googleSignInLoading) && (
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
              WebkitBackdropFilter: "blur(300px)", // For Safari support
            }}
          >
            <div className="card-body p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Create an account</h2>
                <p className="mt-2 text-white/80">
                  Fill in your details to get started
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6" noValidate>
                <div className="form-control">
                  <label className="label text-sm font-medium">
                    <span className="label-text text-white">Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                    placeholder="Enter name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label text-sm font-medium">
                    <span className="label-text text-white">Email</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    className={`input w-full p-3 bg-transparent border rounded transition-all duration-200 text-white placeholder-gray-400 ${
                      emailError ? "border-red-500 focus:border-red-500" : "border-white/30 focus:border-pink-500"
                    }`}
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onBlur={() => {
                      if (!validateEmail(email)){
                        setEmailError("Please enter a valid email address");
                      }
                    }}
                  />
                  {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                </div>

                <div className="form-control relative">
                  <label className="label text-sm font-medium">
                    <span className="label-text text-white">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span onClick={() => setShowPassword((prev) => !prev)} className="cursor-pointer absolute right-5 top-10">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <div className="form-control relative">
                  <label className="label text-sm font-medium">
                    <span className="label-text text-white">Confirm Password</span>
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="cursor-pointer absolute right-5 top-10">
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
                      "Create Account"
                    )}
                  </button>
                </div>
                <GoogleLoginButton onClick={handleGoogleSignIn} />
                <div className="mt-6 text-center space-y-2">
                  <p className="text-white">
                    Already have an account?{" "}
                    <Link
                      to={redirect ? `/login?redirect=${redirect}` : "/login"}
                      className="text-pink-500 hover:text-pink-400 transition-colors duration-200 underline"
                    >
                      Sign in
                    </Link>
                  </p>
                  <p className="text-white">
                    Want to become a distributor?{" "}
                    <Link
                      to="/distributor/register"
                      className="text-pink-500 hover:text-pink-400 transition-colors duration-200 underline"
                    >
                      Register as distributor
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

export default Register;

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
