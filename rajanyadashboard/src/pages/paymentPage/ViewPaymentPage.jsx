import { useMemo } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { Download, ArrowLeft } from "lucide-react";
import CustomerInfo from "../../components/viewPaymentPage/CustomerInfo";
import ServiceDetails from "../../components/viewPaymentPage/ServiceDetails";
import AmountBreakDown from "../../components/viewPaymentPage/AmountBreakDown";
import InvoiceInfo from "../../components/viewPaymentPage/InvoiceInfo";
import PaymentStatusTimeline from "../../components/viewPaymentPage/PaymentStatusTimeline";
import AdditionalInfo from "../../components/viewPaymentPage/AdditionalInfo";
import PaymentAction from "../../components/viewPaymentPage/PaymentAction";

const PaymentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Replace with API later
  const payments = [
    {
      _id: "1",
      transactionId: "PAY-001246",
      customer: "Neha Patel",
      email: "neha@gmail.com",
      service: "Virtual Try-On",
      amount: 2800,
      method: "UPI",
      status: "Paid",
      date: "16 Aug 2025",
      invoice: "INV-001246",
    },
    {
      _id: "2",
      transactionId: "PAY-001247",
      customer: "Priya Sharma",
      email: "priya@gmail.com",
      service: "Rent Booking",
      amount: 4500,
      method: "Card",
      status: "Pending",
      date: "17 Aug 2025",
      invoice: "INV-001247",
    },
    {
      _id: "3",
      transactionId: "PAY-001248",
      customer: "Aarav Singh",
      email: "aarav@gmail.com",
      service: "Virtual Try-On",
      amount: 7200,
      method: "Net Banking",
      status: "Failed",
      date: "18 Aug 2025",
      invoice: "INV-001248",
    },
  ];

  const payment = useMemo(
    () => payments.find((item) => String(item._id) === id),
    [id],
  );

  if (!payment) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-5 px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-bold">Payment Not Found</h2>

        <button
          onClick={() => navigate("/payments")}
          className="px-6 py-3 rounded-xl bg-black text-white"
        >
          Back
        </button>
      </div>
    );
  }

  const statusConfig = {
    Paid: {
      text: "Paid",
      color: "text-green-600",
      dot: "bg-green-500",
      card: "bg-green-50 border-green-200",
    },

    Pending: {
      text: "Pending",
      color: "text-yellow-600",
      dot: "bg-yellow-500",
      card: "bg-yellow-50 border-yellow-200",
    },

    Failed: {
      text: "Failed",
      color: "text-red-600",
      dot: "bg-red-500",
      card: "bg-red-50 border-red-200",
    },
  };

  const currentStatus = statusConfig[payment.status];

  const downloadInvoice = () => {
    const invoice = `
RAJANYA PAYMENT RECEIPT

Invoice : ${payment.invoice}

Transaction : ${payment.transactionId}

Customer : ${payment.customer}

Email : ${payment.email}

Service : ${payment.service}

Amount : ₹${payment.amount}

Payment Method : ${payment.method}

Status : ${payment.status}

Payment Date : ${payment.date}
`;

    const blob = new Blob([invoice], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${payment.invoice}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 sm:space-y-7 px-3 sm:px-0">
      {/* Breadcrumb */}

      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
        <NavLink className="hover:text-black" to="/">Dashboard</NavLink>

        <span>›</span>

        <NavLink className="hover:text-black" to="/payments">Payments</NavLink>

        <span>›</span>

        <span className="font-semibold text-slate-900">Payment Details</span>
      </div>

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Payment Details</h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            View complete payment information and transaction details.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <div
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl border ${currentStatus.card}`}
          >
            <span className={currentStatus.color}>
              Status : {currentStatus.text}
            </span>

            <span className={`w-2.5 h-2.5 rounded-full ${currentStatus.dot}`} />
          </div>

          <button
            onClick={downloadInvoice}
            className="h-11 px-5 rounded-xl bg-black text-white hover:bg-gray-500 transition flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <Download size={18} />
            Download Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomerInfo payment={payment} />
        <ServiceDetails payment={payment} />
        <AmountBreakDown payment={payment} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InvoiceInfo payment={payment} />
        <PaymentStatusTimeline payment={payment} />
        <AdditionalInfo payment={payment} />
      </div>

      <PaymentAction payment={payment} />
    </div>
  );
};

export default PaymentDetailsPage;