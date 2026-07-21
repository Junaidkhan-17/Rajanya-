import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, LogOut, ChevronDown } from "lucide-react";
import NotificationsDropdown from "./NotificationsDropdown";
import { useAuth } from "../../context/AuthContext";

export default function NavBar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [navbarSearch, setNavbarSearch] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getSearchRoute = (query) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return "/products";

    if (normalized.includes("category") || normalized.includes("categories")) {
      return "/categories";
    }

    if (
      normalized.includes("virtual") ||
      normalized.includes("tryon") ||
      normalized.includes("try on")
    ) {
      return "/virtual-tryon";
    }

    if (
      normalized.includes("booking") ||
      normalized.includes("bookings") ||
      normalized.includes("rent")
    ) {
      return "/rent-bookings";
    }

    if (normalized.includes("payment") || normalized.includes("payments")) {
      return "/payments";
    }

    return "/products";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="h-17.5 px-3 sm:px-4 md:px-6 lg:px-7 flex items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Search */}
          <div className="hidden md:flex relative flex-1 max-w-md lg:max-w-lg">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={navbarSearch}
              onChange={(event) => setNavbarSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const query = event.target.value.trim();
                  navigate(getSearchRoute(query));
                }
              }}
              placeholder="Search products, categories..."
              className="
                w-full
                h-11
                pl-10
                pr-4
                rounded-xl
                border
                border-slate-200
                outline-none
                focus:border-violet-500
                bg-white
              "
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5 relative">
          <NotificationsDropdown />

          {/* Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 sm:gap-3 hover:bg-slate-50 px-2 py-1 rounded-lg transition"
            >
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Admin"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
              />

              <div className="hidden sm:block">
                <h4 className="text-sm font-semibold text-slate-800">
                  {user?.fullName || "Admin"}
                </h4>

                <p className="text-xs text-slate-500">Admin</p>
              </div>

              <ChevronDown
                size={16}
                className={`hidden sm:block transition-transform ${
                  profileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-40">
                <div className="p-4 border-b border-slate-200">
                  <p className="text-sm font-medium text-slate-900">
                    {user?.fullName || "Admin"}
                  </p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>

                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
