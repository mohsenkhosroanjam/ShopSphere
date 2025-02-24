import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../redux/api/userApiSlice";
import { LOGIN_BG } from "../../Utils/constants";
import Loader from "../../components/Loader";
import { useTheme } from '../../context/ThemeContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const { token } = useParams();
    const { isDarkMode } = useTheme();

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number";
        }
        return "";
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        setPasswordError("");

        try {
            await resetPassword({ token, password }).unwrap();
            toast.success("Password reset successful");
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
                                    Reset Password
                                </h2>
                                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Enter your new password
                                </p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6">
                                <div className="form-control relative">
                                    <label className="label text-sm font-medium">
                                        <span className={`label-text ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            New Password
                                        </span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`input w-full p-3 rounded-lg transition-all duration-200 ${isDarkMode
                                                ? 'bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-400'
                                                : 'bg-white/30 border-gray-300/40 text-gray-800 placeholder-gray-500'
                                            } ${passwordError ? 'border-red-500' : ''} focus:ring-2 focus:ring-rose-500 backdrop-blur-md`}
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (passwordError) setPasswordError("");
                                        }}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`cursor-pointer absolute right-3 top-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>

                                <div className="form-control relative">
                                    <label className="label text-sm font-medium">
                                        <span className={`label-text ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Confirm Password
                                        </span>
                                    </label>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={`input w-full p-3 rounded-lg transition-all duration-200 ${isDarkMode
                                                ? 'bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-400'
                                                : 'bg-white/30 border-gray-300/40 text-gray-800 placeholder-gray-500'
                                            } ${passwordError ? 'border-red-500' : ''} focus:ring-2 focus:ring-rose-500 backdrop-blur-md`}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (passwordError) setPasswordError("");
                                        }}
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className={`cursor-pointer absolute right-3 top-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
                                    >
                                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>

                                {passwordError && (
                                    <p className="text-red-400 text-sm">{passwordError}</p>
                                )}

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
                                                <span>Resetting Password...</span>
                                            </div>
                                        ) : (
                                            "Reset Password"
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

export default ResetPassword;