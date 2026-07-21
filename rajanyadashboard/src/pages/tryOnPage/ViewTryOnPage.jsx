import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// import axios from "axios"; 
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Clock3,
  XCircle,
} from "lucide-react";
import TryOnCustomerCard from "../../components/viewTryOn/TryOnCustomerCard";
import TryOnProductCard from "../../components/viewTryOn/TryOnProductCard";
import TryOnPaymentCard from "../../components/viewTryOn/TryOnPaymentCard";
import TryOnPhotoSection from "../../components/viewTryOn/TryOnPhotoSection";
import TryOnProgressCard from "../../components/viewTryOn/TryOnProgressCard";

//dummy
const MOCK_TRYON_REQUESTS = [
  {
    _id: "1",
    requestId: "VTO-001248",
    customer: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9876543210",
    productName: "Bridal Lehenga",
    sku: "BL-1023",
    price: "₹4,500",
    productImage:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
    uploadedPhoto:
      "https://images.unsplash.com/photo-1618886487325-f665032b6352?w=300",
    paymentStatus: "Paid",
    paymentAmount: "₹99",
    paymentMethod: "QR",
    status: "Processing",
    statusText: "Generating...",
    createdAt: "2025-08-15T10:30:00",
  },
  {
    _id: "2",
    requestId: "VTO-001249",
    customer: "riya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9123456780",
    productName: "Lehenga",
    sku: "BL-1023",
    price: "₹4,500",
    productImage:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
    uploadedPhoto:
      "https://images.unsplash.com/photo-1618886487325-f665032b6352?w=300",
    paymentStatus: "Paid",
    paymentAmount: "₹99",
    paymentMethod: "QR",
    status: "Completed",
    statusText: "AI Generated",
    createdAt: "2025-08-14T09:10:00",
  },
  {
    _id: "3",
    requestId: "VTO-001250",
    customer: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9988776655",
    productName: "Bridal Lehenga",
    sku: "BL-1023",
    price: "₹4,500",
    productImage:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
    uploadedPhoto: "",
    paymentStatus: "Pending",
    paymentAmount: "₹99",
    paymentMethod: "QR",
    status: "Pending",
    statusText: "Awaiting Payment",
    createdAt: "2025-08-13T09:10:00",
  },
  {
    _id: "4",
    requestId: "VTO-001251",
    customer: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9871234560",
    productName: "Jeans",
    sku: "BL-1023",
    price: "₹4,500",
    productImage:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
    uploadedPhoto:
      "https://images.unsplash.com/photo-1618886487325-f665032b6352?w=300",
    paymentStatus: "Failed",
    paymentAmount: "₹99",
    paymentMethod: "QR",
    status: "Failed",
    statusText: "Payment Failed",
    createdAt: "2025-10-12T08:30:00",
  },
  {
    _id: "5",
    requestId: "VTO-001251",
    customer: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9871234560",
    productName: "Jeans",
    sku: "BL-1023",
    price: "₹4,500",
    productImage:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
    uploadedPhoto:
      "https://images.unsplash.com/photo-1618886487325-f665032b6352?w=300",
    paymentStatus: "Failed",
    paymentAmount: "₹99",
    paymentMethod: "QR",
    status: "Failed",
    statusText: "Payment Failed",
    createdAt: "2025-10-12T08:30:00",
  },
];

const ViewTryOnPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);


    const timer = setTimeout(() => {
      const data = MOCK_TRYON_REQUESTS.find((r) => r._id === id);

      if (data) {
        setRequest({
          requestId: data.requestId,
          requestDate: new Date(data.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          paymentStatus: data.paymentStatus,
          status: data.status,

          beforeImage: data.uploadedPhoto,
          afterImage: data.productImage,
          generationTime: "45 seconds",

          customer: {
            name: data.customer,
            email: data.email,
            phone: data.phone,
            joined: "12 Jan 2024",
          },

          product: {
            image: data.productImage,
            name: data.productName,
            category: "Ethnic Wear",
            size: "M",
            price: data.price,
          },

          payment: {
            paymentId: "PAY-" + data._id,
            method: data.paymentMethod,
            amount: data.paymentAmount,
            date: data.createdAt,
            status: data.paymentStatus,
          },
        });
      } else {
        setError("Try-on request not found.");
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);

    //API
    // const fetchTryOnRequest = async () => {
    //   try {
    //     setLoading(true);
    //     setError(null);
    //
    //     const res = await axios.get(`${API_BASE_URL}/tryon/${id}`);
    //     setRequest(res.data.data || res.data);
    //   } catch (err) {
    //     console.error("Error fetching try-on request:", err);
    //     setError("Failed to load try-on request details.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    //
    // if (id) {
    //   fetchTryOnRequest();
    // }
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Delete this Try-On Request?")) return;
    navigate(`/virtual-tryon/delete/${id}`);
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-slate-500">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-red-500 gap-3">
        <p>{error}</p>
        <NavLink
          to="/virtual-tryon"
          className="h-11 px-5 rounded-xl border border-slate-300 flex items-center gap-2 hover:bg-slate-50 text-slate-700"
        >
          <ArrowLeft size={18} />
          Back to History
        </NavLink>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-slate-500">
        No data found.
      </div>
    );
  }

  const paymentStatusMap = {
    Paid: {
      bg: "bg-green-100",
      text: "text-green-600",
      icon: <CheckCircle2 size={18} className="text-green-500" />,
    },
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      icon: <Clock3 size={18} className="text-yellow-500" />,
    },
    Failed: {
      bg: "bg-red-100",
      text: "text-red-600",
      icon: <XCircle size={18} className="text-red-500" />,
    },
  };

  const tryOnStatusMap = {
    Completed: {
      bg: "bg-green-100",
      text: "text-green-600",
      icon: <CheckCircle2 size={18} className="text-green-500" />,
    },
    Processing: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      icon: <Loader2 size={18} className="text-orange-500 animate-spin" />,
    },
    Pending: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <Clock3 size={18} className="text-blue-500" />,
    },
    Failed: {
      bg: "bg-red-100",
      text: "text-red-600",
      icon: <XCircle size={18} className="text-red-500" />,
    },
  };

  const payment = paymentStatusMap[request.paymentStatus] || paymentStatusMap.Pending;
  const ai = tryOnStatusMap[request.status] || tryOnStatusMap.Pending;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm flex-wrap">
        <NavLink to="/" className="text-slate-400 hover:text-black">
          Dashboard
        </NavLink>
        <span>›</span>
        <NavLink
          to="/virtual-tryon"
          className="text-slate-400 hover:text-black"
        >
          Virtual Try-On
        </NavLink>
        <span>›</span>
        <span className="font-semibold">View Details</span>
      </div>

      {/* Title */}
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            View Try-On Details
          </h1>
        </div>

        <div className="text-left lg:text-right">
          <p className="text-sm">
            <span className="text-slate-500">Request ID :</span>
            <span className="font-semibold ml-1">{request.requestId}</span>
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Requested on : {request.requestDate}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col xl:flex-row justify-between gap-4">
        <div className="flex gap-3">
          <NavLink
            to="/virtual-tryon"
            className="h-11 px-5 rounded-xl border border-slate-300 flex items-center gap-2 hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Back to History
          </NavLink>

          <button
            onClick={handleDelete}
            className="h-11 px-6 rounded-xl bg-red-500 hover:bg-red-600 text-white"
          >
            Delete Items
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Payment */}
          <div className="bg-white border rounded-xl px-5 h-11 flex items-center gap-3">
            {payment.icon}
            <span className="text-sm text-slate-600">Payment Status</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${payment.bg} ${payment.text}`}
            >
              {request.paymentStatus?.toUpperCase()}
            </span>
          </div>

          {/* AI */}
          <div className="bg-white border rounded-xl px-5 h-11 flex items-center gap-3">
            {ai.icon}
            <span className="text-sm text-slate-600">AI Try-On Status</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${ai.bg} ${ai.text}`}
            >
              {request.status?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TryOnCustomerCard request={request} />
        <TryOnProductCard request={request} />
        <TryOnPaymentCard request={request} />
      </div>

      {/* Photo Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <TryOnPhotoSection request={request} />
        </div>

        <div className="lg:col-span-4">
          <TryOnProgressCard request={request} />
        </div>
      </div>
    </div>
  );
};

export default ViewTryOnPage;