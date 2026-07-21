import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import bgImage from "../assets/dashboard-bg.png";

export default function AdminLogin({ onClose }) {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");

    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
      }));

      setRememberMe(true);
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      if (response.data.success) {
        const userData = {
          id: response.data.user?.id,
          email: response.data.user?.email,
          fullName: response.data.user?.fullName,
        };

        login(response.data.token, userData);

        if (rememberMe) {
          localStorage.setItem("adminEmail", formData.email);
        }

        toast.success("Login successful!");
        navigate("/");
        onClose?.();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4"
      onClick={onClose}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Login Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-2xl
          bg-white
          shadow-2xl
          px-5
          sm:px-7
          md:px-8
          py-6
          sm:py-8
          max-h-[95vh]
          overflow-y-auto
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src={logo}
            alt="Rajanya"
            className="h-14 sm:h-16 md:h-20 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-center text-slate-900">
          Log In
        </h1>

        <div className="flex items-center justify-center gap-2 my-3">
          <div className="h-px flex-1 max-w-[80px] bg-slate-300"></div>
          <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
          <div className="h-px flex-1 max-w-[80px] bg-slate-300"></div>
        </div>

        <p className="text-center text-slate-500 text-sm sm:text-base mb-6">
          Empowering fashion with seamless management.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="
                  w-full
                  h-11
                  sm:h-12
                  pl-10
                  pr-4
                  rounded-lg
                  border
                  border-slate-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-slate-300
                  focus:border-slate-400
                  text-sm
                  sm:text-base
                "
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="
                  w-full
                  h-11
                  sm:h-12
                  pl-10
                  pr-10
                  rounded-lg
                  border
                  border-slate-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-slate-300
                  focus:border-slate-400
                  text-sm
                  sm:text-base
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4"
              />
              Remember Me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-11
              sm:h-12
              rounded-lg
              bg-black
              hover:bg-slate-900
              text-white
              font-semibold
              text-sm
              sm:text-base
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        {/* Signup */}
        <p className="mt-6 text-center text-xs sm:text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            onClick={onClose}
            className="font-semibold text-amber-600 hover:text-amber-700"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}