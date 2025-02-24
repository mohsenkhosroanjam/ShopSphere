import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../redux/api/userApiSlice";
import { LOGIN_BG } from "../../Utils/constants";
import Loader from "../../components/Loader";
import { useTheme } from '../../context/ThemeContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Invalid email address");
            return;
        }

        setEmailError("");

        try {
            await forgotPassword({ email }).unwrap();
            toast.success("Password reset instructions sent to your email");
            navigate("/login");
        } catch (error) {
            toast.error(error?.data?.message || error.message);
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
                <img
                    src={LOGIN_BG}
                    alt="background"
                    className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/75' : 'bg-black/45'}`}></div>
            </div>

            <div className="relative min-h-screen flex items-center justify-center">
                <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex justify-center animate-slide-in">
                    <div className={`card border rounded-2xl ${isDarkMode
                            ? 'bg-gray-900/90 border-gray-700'
                            : 'bg-white/40 border-gray-200/40'
                        } w-11/12 md:w-8/12 backdrop-blur-xl`}
                        style={{
                            boxShadow: isDarkMode
                                ? '0 8px 32px rgba(0, 0, 0, 0.55)'
                                : '0 8px 32px rgba(255, 255, 255, 0.25)',
                        }}>
                        <div className="card-body p-6 md:p-8">
                            <div className="text-center mb-8">
                                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Forgot Password
                                </h2>
                                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Enter your email to reset your password
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
                                        className={`input w-full p-3 rounded-lg transition-all duration-200 ${isDarkMode
                                                ? 'bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-400'
                                                : 'bg-white/30 border-gray-300/40 text-gray-800 placeholder-gray-500'
                                            } ${emailError ? 'border-red-500' : ''} focus:ring-2 focus:ring-rose-500 backdrop-blur-md`}
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (emailError) setEmailError("");
                                        }}
                                        onBlur={() => {
                                            if (email && !validateEmail(email)) {
                                                setEmailError("Invalid email address");
                                            }
                                        }}
                                    />
                                    {emailError && (
                                        <p className="text-red-400 text-sm mt-2">{emailError}</p>
                                    )}
                                </div>

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 
                    text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02]`}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <Loader />
                                                <span>Please wait...</span>
                                            </div>
                                        ) : (
                                            "Send Reset Instructions"
                                        )}
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Remember your password?{" "}
                                        <Link
                                            to="/login"
                                            className="text-rose-500 hover:text-rose-400 transition-colors duration-200 font-medium"
                                        >
                                            Sign in
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

export default ForgotPassword;