import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useProfileMutation, useRequestAccountDeletionMutation } from "../redux/api/userApiSlice";
import Modal from "../../components/Modal";
import { useTheme } from "../../context/ThemeContext";
import { FaUser, FaCog, FaShoppingBag, FaKey } from "react-icons/fa";
import Scrollbtn from "../../components/scrollbtn";

const UserProfileAvatar = ({ username, size = "md", bgColor = "bg-purple-600" }) => {
  // Get initials from username (first letter or first two letters)
  const getInitials = () => {
    if (!username) return "?";

    // Split the username by spaces, dashes, underscores, etc.
    const parts = username.split(/[\s-_]+/);

    if (parts.length === 1) {
      // If single word, use first letter or first two letters
      return username.slice(0, 2).toUpperCase();
    } else {
      // If multiple words, use first letter of first two words
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
  };

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-xl",
    lg: "h-16 w-16 text-2xl",
    xl: "h-24 w-24 text-3xl"
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-semibold`}
        style={{
          textShadow: '0px 1px 2px rgba(0,0,0,0.2)'
        }}
      >
        {getInitials()}
      </div>
    </div>
  );
};


const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [joinDate, setJoinDate] = useState("");

  const { isDarkMode } = useTheme();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const [requestDeletion] = useRequestAccountDeletionMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      // Format the join date
      // show loast
      const formattedDate = new Date(userInfo.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setJoinDate(formattedDate);
    }
  }, [userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
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
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "An unexpected error occurred.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await requestDeletion().unwrap();
      toast.info(
        "A verification email has been sent. Please check your email to confirm account deletion.",
        { autoClose: 10000 }
      );
      setShowDeleteModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to initiate account deletion");
    }
  };

  return (
    <>
    <Scrollbtn />
    <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 mt-[2rem]">
        <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
          {/* Profile Header with Gradient */}
          <div className={`px-6 py-8 ${isDarkMode ? 'bg-gradient-to-r from-pink-600 to-purple-600' : 'bg-gradient-to-r from-pink-500 to-purple-500'} text-white`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <UserProfileAvatar
                username={username}
                size="lg"
                bgColor="bg-white bg-opacity-20"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">{username}</h1>
                <p className="text-white text-opacity-90 text-center md:text-left">{email}</p>
                <p className="text-white text-opacity-75 text-sm mt-1 text-center md:text-left">Member since: {joinDate || "N/A"}</p>
              </div>
            </div>
          </div>
          {/* Navigation Tabs */}
          <div className={`flex flex-wrap border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center px-4 md:px-6 py-4 font-medium transition-colors duration-200 ${activeTab === "profile"
                ? isDarkMode
                  ? "border-b-2 border-pink-500 text-pink-500"
                  : "border-b-2 border-pink-500 text-pink-500"
                : isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <FaUser className="mr-2" /> Profile
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center px-4 md:px-6 py-4 font-medium transition-colors duration-200 ${activeTab === "security"
                ? isDarkMode
                  ? "border-b-2 border-pink-500 text-pink-500"
                  : "border-b-2 border-pink-500 text-pink-500"
                : isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <FaKey className="mr-2" /> Security
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center px-4 md:px-6 py-4 font-medium transition-colors duration-200 ${activeTab === "orders"
                ? isDarkMode
                  ? "border-b-2 border-pink-500 text-pink-500"
                  : "border-b-2 border-pink-500 text-pink-500"
                : isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <FaShoppingBag className="mr-2" /> Orders
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center px-4 md:px-6 py-4 font-medium transition-colors duration-200 ${activeTab === "settings"
                ? isDarkMode
                  ? "border-b-2 border-pink-500 text-pink-500"
                  : "border-b-2 border-pink-500 text-pink-500"
                : isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <FaCog className="mr-2" /> Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg ${isDarkMode
                        ? 'bg-gray-700 text-white border border-gray-600 focus:border-pink-500'
                        : 'bg-gray-50 text-gray-900 border border-gray-300 focus:border-pink-500'
                        } focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg ${isDarkMode
                        ? 'bg-gray-700 text-white border border-gray-600 focus:border-pink-500'
                        : 'bg-gray-50 text-gray-900 border border-gray-300 focus:border-pink-500'
                        } focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200`}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                      } transition duration-200 shadow-md`}
                    disabled={loadingUpdateProfile}
                  >
                    {loadingUpdateProfile ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <form onSubmit={submitHandler} className="space-y-6">
                <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    <span className="font-bold">Security Tip:</span> Use a strong, unique password with a mix of letters, numbers, and symbols.
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg ${isDarkMode
                      ? 'bg-gray-700 text-white border border-gray-600 focus:border-pink-500'
                      : 'bg-gray-50 text-gray-900 border border-gray-300 focus:border-pink-500'
                      } focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg ${isDarkMode
                      ? 'bg-gray-700 text-white border border-gray-600 focus:border-pink-500'
                      : 'bg-gray-50 text-gray-900 border border-gray-300 focus:border-pink-500'
                      } focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200`}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                      } transition duration-200 shadow-md`}
                    disabled={loadingUpdateProfile}
                  >
                    {loadingUpdateProfile ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "orders" && (
              <div className="py-8">
                <div className={`p-6 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-pink-50'}`}>
                  <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Your Order History
                  </h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Track your recent purchases, view order status, and manage returns all in one place.
                  </p>
                  <Link
                    to="/user-orders"
                    className={`inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                      } transition duration-200 shadow-md`}
                  >
                    <FaShoppingBag className="mr-2" /> View Your Orders
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Account Management
                  </h3>

                  <div className={`p-4 mb-6 rounded-lg ${isDarkMode ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'}`}>
                    <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                      Danger Zone
                    </h4>
                    <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Warning: Deleting your account will permanently remove all your data, including order history, saved items, and personal information. This action cannot be reversed.
                    </p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="bg-red-500 text-white py-2 px-4 rounded font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-md"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {loadingUpdateProfile && (
            <div className="flex justify-center pb-6">
              <Loader />
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Delete Account
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Are you sure you want to delete your account? This action cannot be undone.
              All your data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`px-4 py-2 ${isDarkMode
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } rounded transition-colors duration-200`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              >
                Delete Account
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
    </>
  );
};

export default Profile;