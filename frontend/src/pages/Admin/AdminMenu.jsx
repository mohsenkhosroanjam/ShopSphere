import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <>
      <button
        aria-label={showMenu ? "Close Admin Menu" : "Open Admin Menu"}
        className={`${
          showMenu ? "top-2 right-2" : "top-5 right-5"
        } bg-[#151515] p-2 fixed rounded-lg z-50 transition-all duration-300`}
        onClick={toggleMenu}
      >
        {showMenu ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {showMenu && (
        <section
          ref={menuRef}
          className="bg-[#151515] p-4 fixed top-5 right-7 rounded-lg shadow-lg transition-transform duration-300 z-40"
        >
          <ul className="mt-2">
            {[
              { path: "/admin/dashboard", label: "Admin Dashboard" },
              { path: "/admin/categorylist", label: "Create Category" },
              { path: "/admin/productlist", label: "Create Product" },
              { path: "/admin/allproductslist", label: "All Products" },
              { path: "/admin/userlist", label: "Manage Users" },
              { path: "/admin/orderlist", label: "Manage Orders" },
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  className="py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm transition-all duration-200"
                  to={item.path}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
