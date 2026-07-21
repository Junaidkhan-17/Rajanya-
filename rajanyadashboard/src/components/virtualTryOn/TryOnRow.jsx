import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TryOnRow({ request, selectedRows, setSelectedRows }) {
  const toggleCheckbox = () => {
    if (selectedRows.includes(request._id)) {
      setSelectedRows(selectedRows.filter((id) => id !== request._id));
    } else {
      setSelectedRows([...selectedRows, request._id]);
    }
  };

  //date & time from createdAt
  const dateObj = new Date(request.createdAt);
  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const paymentColor =
    request.paymentStatus === "Paid"
      ? "bg-green-100 text-green-700"
      : request.paymentStatus === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-600";

  const statusColor =
    request.status === "Completed"
      ? "bg-green-100 text-green-700"
      : request.status === "Processing"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-600";

  const navigate = useNavigate();

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
      {/* Checkbox */}
      <td className="px-5 py-4">
        <input
          type="checkbox"
          checked={selectedRows.includes(request._id)}
          onChange={toggleCheckbox}
          className="w-4 h-4 accent-black"
        />
      </td>

      {/* Request */}
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-800">{request.requestId}</p>
          <p className="text-xs text-slate-500">{request.email}</p>
        </div>
      </td>

      {/* Customer */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={request.customerImage}
            alt=""
            className="w-11 h-11 rounded-full object-cover border"
          />
          <div>
            <p className="font-medium text-slate-800">{request.customer}</p>
            <p className="text-xs text-slate-500">{request.phone}</p>
          </div>
        </div>
      </td>

      {/* Product */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={request.productImage}
            alt=""
            className="w-12 h-14 rounded-lg object-cover border"
          />
          <div>
            <p className="font-medium text-slate-800">{request.productName}</p>
            <p className="text-xs text-slate-500">{request.sku}</p>
          </div>
        </div>
      </td>

      {/* Uploaded Photo */}
      <td className="px-5 py-4">
        {request.uploadedPhoto ? (
          <img
            src={request.uploadedPhoto}
            alt=""
            className="w-16 h-20 rounded-lg object-cover border"
          />
        ) : (
          <span className="text-xs text-slate-400 italic">No photo</span>
        )}
      </td>

      {/* Payment */}
      <td className="px-5 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColor}`}
        >
          {request.paymentStatus}
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
        >
          {request.status}
        </span>
      </td>

      {/**Date */}
      <td className="px-5 py-4">
        <div>
          <p className="text-sm font-medium text-slate-700">{formattedDate}</p>
          <p className="text-xs text-slate-500">{formattedTime}</p>
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => navigate(`/virtual-tryon/view/${request._id}`)}
            className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-100 transition flex items-center justify-center"
          >
            <Eye size={17} />
          </button>
          <button
            onClick={() => navigate(`/virtual-tryon/delete/${request._id}`)}
            className="w-10 h-10 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition flex items-center justify-center"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}
