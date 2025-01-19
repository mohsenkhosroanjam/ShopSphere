import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDistributorRegisterMutation } from "../redux/api/userApiSlice";
import { setCredientials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { LOGIN_BG } from "../../Utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/Loader";

const DistributorRegister = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessName: "",
        contactNumber: "",
        city: "",
        state: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useDistributorRegisterMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some(field => field === "")) {
            toast.error("Please fill all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await register({
                ...formData,
                isDistributor: true
            }).unwrap();
            dispatch(setCredientials({ ...res }));
            navigate('/profile');
            toast.success("Distributor account created successfully");
        } catch (error) {
            toast.error(error?.data?.message || "Registration failed");
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
                <img src={LOGIN_BG} alt="background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative min-h-screen flex items-center justify-center">
                <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex justify-center animate-slide-in">
                    <div className="card border border-pink-500/40 rounded-xl bg-black bg-opacity-60 w-10/12"
                        style={{ backdropFilter: "blur(300px)", WebkitBackdropFilter: "blur(30px)" }}>
                        <div className="card-body p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white">Become a Distributor</h2>
                                <p className="mt-2 text-white/80">Create your distributor account</p>
                            </div>

                            <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="form-control">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">Username</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Enter username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">Business Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Enter business name"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">Contact Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Enter contact number"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">City</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">State</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Enter state"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Password Fields */}
                                <div className="form-control relative">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer absolute right-5 top-10 text-white"
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>

                                <div className="form-control relative">
                                    <label className="label text-sm font-medium">
                                        <span className="label-text text-white">Confirm Password</span>
                                    </label>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className="input w-full p-3 bg-transparent border border-white/30 rounded 
                             transition-all duration-200 focus:border-pink-500 text-white placeholder-gray-400"
                                        placeholder="Confirm password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="cursor-pointer absolute right-5 top-10 text-white"
                                    >
                                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>

                                {/* Submit Button */}
                                <div className="col-span-full mt-6">
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
                                            "Create Distributor Account"
                                        )}
                                    </button>
                                </div>

                                <div className="col-span-full text-center mt-4">
                                    <p className="text-white">
                                        Already have a distributor account?{" "}
                                        <Link to="/distributor/login" className="text-pink-500 hover:text-pink-400 transition-colors duration-200">
                                            Sign in
                                        </Link>
                                    </p>
                                    <p className="text-white mt-2">
                                        Looking to shop?{" "}
                                        <Link to="/register" className="text-pink-500 hover:text-pink-400 transition-colors duration-200">
                                            Create customer account
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

export default DistributorRegister;

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
