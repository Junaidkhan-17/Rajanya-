import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import bgImage from "../assets/dashboard-bg.png";

export default function AdminSignup({ onClose }) {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
      );

      if (response.data.success) {
        login(response.data.token, response.data.user);

        toast.success("Account created successfully!");

        navigate("/");

        onClose?.();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg bg-white rounded-xl shadow-2xl px-8 py-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="space-y-2">
          <div className="flex justify-center">
            <img src={logo} alt="Rajanya" className="h-20 object-contain" />
          </div>

          <div>
            <h1 className="text-2xl font-serif font-semibold text-center">
              Create Account
            </h1>

            <div className="flex items-center justify-center gap-2 my-3">
              <div className="h-px w-20 bg-slate-300"></div>
              <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
              <div className="h-px w-20 bg-slate-300"></div>
            </div>

            <p className="text-center text-slate-500">
              Create an account to manage fashion with elegance.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-800">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-800">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-800">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-800">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-slate-900 text-white py-2.5 rounded-md font-medium uppercase disabled:opacity-50"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>
          {/* Sign In Link */}
          <p className="text-center text-sm text-slate-600 font-normal">
            Already have an account?{" "}
            <Link
              to="/login"
              onClick={onClose}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
