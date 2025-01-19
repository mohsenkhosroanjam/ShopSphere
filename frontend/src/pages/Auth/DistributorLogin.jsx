import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDistributorLoginMutation } from "../redux/api/userApiSlice";
import { setCredientials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { LOGIN_BG } from "../../Utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/Loader";

const DistributorLogin = () => {
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
                            backdropFilter: "blur(300px)",
                            WebkitBackdropFilter: "blur(300px)",
                        }}
                    >
                        <div className="card-body p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white">Welcome Distributor</h2>
                                <p className="mt-2 text-white/80">Sign in to your distributor account</p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6">
                                <div className="form-control">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
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
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="cursor-pointer absolute right-5 top-10 text-white"
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
                                            "Log In"
                                        )}
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-white">
                                        New Distributor?{" "}
                                        <Link
                                            to="/distributor/register"
                                            className="text-pink-500 hover:text-pink-400 transition-colors duration-200 underline"
                                        >
                                            Create a distributor account
                                        </Link>
                                    </p>
                                    <p className="text-white mt-2">
                                        Looking to shop?{" "}
                                        <Link
                                            to="/login"
                                            className="text-pink-500 hover:text-pink-400 transition-colors duration-200 underline"
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