import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineInventory } from "react-icons/md";
import { BsCart3, BsPeople } from "react-icons/bs";
import profilepic from "../assets/profilepic.jpg";

export default function Sidebar() {
  // Pulling the  active user from Redux or LocalStorage fallback
  const reduxUser = useSelector((state) => state.user?.user);
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const activeUser = reduxUser || savedUser;

  const navItems = [
    { path: "/inventory", label: "Inventory", icon: <MdOutlineInventory size={20} /> },
    { path: "/cart-management", label: "Orders", icon: <BsCart3 size={20} /> },
    { path: "/users", label: "Customers", icon: <BsPeople size={20} /> },
  ];

  const displayName = activeUser.firstName 
    ? `${activeUser.firstName} ${activeUser.lastName}` 
    : activeUser.username || "Admin Profile";

  return (
    <div
      className="d-flex flex-column p-3 bg-white border-end min-vh-100 shadow-sm"
      style={{ width: "260px", minWidth: "260px" }}
    >
      <div className="mb-4 ps-2 pt-2">
        <span className="text-muted extra-small fw-semibold text-uppercase" style={{ fontSize: "0.75rem" }}>
          Admin Panel
        </span>
      </div>

      <div className="d-flex flex-column gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none fw-semibold ${
                isActive ? "text-white" : "text-secondary"
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#4318FF" : "transparent",
              transition: "all 0.2s ease",
            })}
          >
            {item.icon}
            <span style={{ fontSize: "0.925rem" }}>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-auto pt-3 border-top">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none transition-all ${
              isActive ? "bg-light border" : ""
            }`
          }
        >
          <img
            src={activeUser.image || profilepic}
            alt="Profile Avatar"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          <div className="d-flex flex-column text-truncate">
            <span className="fw-bold text-dark text-truncate" style={{ fontSize: "0.875rem" }}>
              {displayName}
            </span>
            <span className="text-muted" style={{ fontSize: "0.75rem" }}>
              {activeUser.role ? activeUser.role : "Store Manager"}
            </span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}