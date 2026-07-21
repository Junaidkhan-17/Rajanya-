import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import logo from "../assets/logo.png";

export default function AdminForgotPassword({ onClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/forgot-password",
        { email }
      );

      if (response.data.success) {
        setSubmitted(true);
        toast.success("Password reset link sent to your email!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
    onClose?.();
  };

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 font-sans"
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl px-8 py-8 max-h-[90vh] overflow-y-auto"
      >
       

        <div className="space-y-5">
          {/* Logo Section */}
          <div className="flex justify-center pt-1">
            <img
              src={logo}
              alt="Rajanya - Virtual Dressing Room"
              className="h-20 w-auto object-contain"
            />
          </div>

          {!submitted ? (
            <>
              {/* Heading */}
              <div>
                <h1 className="text-[26px] font-serif font-semibold text-slate-900 text-center tracking-tight">
                  Forgot Password?
                </h1>
                <div className="flex items-center justify-center gap-2 my-3">
                  <div className="h-px w-full max-w-[80px] bg-slate-300"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-amber-500 flex-shrink-0"></div>
                  <div className="h-px w-full max-w-[80px] bg-slate-300"></div>
                </div>
                <p className="text-center text-slate-500 text-sm mb-2 font-normal">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-800 tracking-tight">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-9 pr-4 py-2.5 bg-transparent border border-slate-200 rounded-md focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition text-sm font-normal placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black hover:bg-slate-900 text-white font-medium py-2.5 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide uppercase"
                >
                  {loading ? "SENDING..." : "SEND RESET LINK"}
                </button>
              </form>

              {/* Back to Login */}
              <div className="text-center pt-1">
                <button
                  onClick={handleBackToLogin}
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center py-2">
                <div className="mb-5 flex justify-center">
                  <div className="w-12 h-12 bg-green-50 border border-green-200 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>

                <h2 className="text-xl font-serif font-semibold text-slate-900 mb-2 tracking-tight">
                  Check Your Email
                </h2>
                <p className="text-slate-600 text-sm mb-2 font-normal">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-slate-800">{email}</span>. Please check
                  your email and follow the instructions to reset your password.
                </p>
                <p className="text-xs text-slate-400 mb-6">
                  If you don't see the email, please check your spam folder.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-black hover:bg-slate-900 text-white font-medium py-2.5 rounded-md transition duration-200 text-sm tracking-wide uppercase"
                >
                  BACK TO SIGN IN
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full text-slate-700 hover:text-slate-900 font-medium py-2.5 text-sm border border-slate-200 rounded-md tracking-wide uppercase hover:bg-slate-50 transition"
                >
                  TRY ANOTHER EMAIL
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}