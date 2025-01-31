import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDistributorLoginMutation } from "../redux/api/userApiSlice";
import { setCredientials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { LOGIN_BG } from "../../Utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useTheme } from '../../context/ThemeContext';

const DistributorLogin = () => {
    const { isDarkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const formRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useDistributorLoginMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredientials({ ...res }));
            navigate('/profile');
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                    <Loader />
                </div>
            )}

            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/20'}`}>
                <img src={LOGIN_BG} alt="background" className="w-full h-full object-cover" />
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/75' : 'bg-black/45'}`}></div>
            </div>

            <div className="relative min-h-screen flex items-center justify-center">
                <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex justify-center animate-slide-in" ref={formRef}>
                    <div
                        className={`card border rounded-2xl ${isDarkMode
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
                                    Welcome Distributor
                                </h2>
                                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Sign in to your distributor account
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
                                        type="email"
                                        id="email"
                                        className={`input w-full p-3 rounded-lg transition-all duration-200 ${isDarkMode
                                            ? 'bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-400'
                                            : 'bg-white/30 border-gray-300/40 text-gray-800 placeholder-gray-500'
                                        } focus:ring-2 focus:ring-rose-500 backdrop-blur-md`}
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
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

                                <div className="mt-6 text-center space-y-2">
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        New Distributor?{" "}
                                        <Link
                                            to="/distributor/register"
                                            className="text-rose-500 hover:text-rose-400 transition-colors duration-200 font-medium"
                                        >
                                            Create a distributor account
                                        </Link>
                                    </p>
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Looking to shop?{" "}
                                        <Link
                                            to="/login"
                                            className="text-rose-500 hover:text-rose-400 transition-colors duration-200 font-medium"
                                        >
                                            Customer login
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

export default DistributorLogin;

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