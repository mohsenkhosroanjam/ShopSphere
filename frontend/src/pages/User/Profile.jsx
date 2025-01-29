import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../redux/api/userApiSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredientials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="container mx-auto px-4 mt-[2rem]">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-3xl text-white font-bold">
                  {username ? username[0].toUpperCase() : "U"}
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Update Your Profile
            </h2>

            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200"
                />
              </div>

              <div className="flex items-center justify-between space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                >
                  {loadingUpdateProfile ? "Updating..." : "Update Profile"}
                </button>
                
                <Link
                  to="/user-orders"
                  className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                >
                  My Orders
                </Link>
              </div>
            </form>

            {loadingUpdateProfile && (
              <div className="flex justify-center mt-6">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;