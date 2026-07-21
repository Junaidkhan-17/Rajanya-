import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Sparkles,
  CreditCard,
  CalendarDays,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import logonew from "../../assets/logonew.png";
import logoIcon from "../../assets/logo2.png";

export default function SideBar({ sidebarOpen }) {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    // Remove saved data
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    sessionStorage.clear();

    // Redirect to Login Page
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex items-center rounded-xl transition-all duration-200 mx-auto
    ${
      sidebarOpen
        ? "lg:justify-start md:justify-start justify-center lg:gap-3 md:gap-3 px-4 py-3 lg:w-[170px] md:w-[170px]"
        : "justify-center py-3 w-12"
    }
    ${
      isActive
        ? "bg-slate-900 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <aside
      className={`
        h-screen
        bg-white
        flex
        flex-col
        border-r
        border-slate-200
        shrink-0
        transition-all
        duration-300
        ease-in-out
        ${
          sidebarOpen
            ? "lg:w-[190px] md:w-[190px] w-[70px]"
            : "lg:w-[80px] md:w-[80px] w-[70px]"
        }
      `}
    >
      {/* Logo */}
      <div className="h-[71px] border-b border-slate-100 flex items-center justify-center">
        <img
          src={sidebarOpen ? logonew : logoIcon}
          alt="Rajanya Logo"
          className={`
            object-contain transition-all duration-300
            ${sidebarOpen ? "w-[170px]" : "w-[42px]"}
          `}
        />
      </div>

      {/* Menu */}
      <div className="flex-1 px-2 md:px-3 py-4 overflow-y-auto">
        <ul className="space-y-3">
          <li>
            <NavLink to="/" end className={navClass}>
              <LayoutDashboard className="w-6 h-6 shrink-0" />
              {sidebarOpen && (
                <span className="hidden md:block text-sm font-medium whitespace-nowrap">
                  Dashboard
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className={navClass}>
              <Package className="w-6 h-6 shrink-0" />
              {sidebarOpen && (
                <span className="hidden md:block text-sm font-medium whitespace-nowrap">
                  Products
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/categories" className={navClass}>
              <Grid3X3 className="w-6 h-6 shrink-0" />
              {sidebarOpen && (
                <span className="hidden md:block text-sm font-medium whitespace-nowrap">
                  Categories
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/virtual-tryon" className={navClass}>
              <Sparkles className="w-6 h-6 shrink-0" />
              {sidebarOpen && (
                <span className="hidden md:block text-sm font-medium whitespace-nowrap">
                  Virtual Try-On
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/payments" className={navClass}>
              <CreditCard className="w-6 h-6 shrink-0" />
              {sidebarOpen && (
                <span className="hidden md:block text-sm font-medium whitespace-nowrap">
                  Payments
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/rent-bookings" className={navClass}>
              <CalendarDays className="w-6 h-6 shrink-0" />
              {sidebarOpen && (
                <span className="hidden md:block text-sm font-medium whitespace-nowrap">
                  Rent Bookings
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className={`
            border border-red-300
            text-red-500
            rounded-xl
            flex items-center justify-center
            hover:bg-red-50
            transition-all
            ${
              sidebarOpen
                ? "w-full py-3 gap-2"
                : "w-12 h-12 mx-auto"
            }
          `}
        >
          <LogOut className="w-6 h-6 shrink-0" />

          {sidebarOpen && (
            <span className="hidden md:block font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}