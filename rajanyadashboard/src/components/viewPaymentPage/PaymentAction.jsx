// components/payments/PaymentActions.jsx

import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentAction = ({ payment }) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const invoice = `
Invoice Number : ${payment.invoiceNumber}
Transaction ID : ${payment.transactionId}
Customer : ${payment.customer}
Email : ${payment.email}

Service : ${payment.service}
Amount : ₹${payment.amount}
Payment Method : ${payment.method}
Status : ${payment.status}

Invoice Date : ${payment.invoiceDate}
Payment Date : ${payment.date}
`;

    const blob = new Blob([invoice], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${payment.invoiceNumber}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Back Button */}

        <button
          onClick={() => navigate("/payments")}
          className="h-11 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2 font-medium text-slate-700 w-full sm:w-auto"
        >
          <ArrowLeft size={18} />
          Back to Payments
        </button>

        {/* Download */}

        <button
          onClick={handleDownload}
          disabled={payment.status !== "Paid"}
          className="h-11 px-6 rounded-xl bg-black text-white hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          <Download size={18} />
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default PaymentAction;