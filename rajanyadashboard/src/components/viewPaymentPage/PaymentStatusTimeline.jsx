import { CheckCircle2, Clock3, CircleX } from "lucide-react";

const PaymentStatusTimeline = ({ payment }) => {
  if (!payment) return null;

  const status = payment.status;

  const steps = [
    {
      title: "Payment Initiated",
      description: "Payment request created",
      date: payment.createdDate || "15 Aug 2025",
      time: payment.createdTime || "10:28 AM",
      state: "completed",
    },
    {
      title:
        status === "Paid"
          ? "Payment Successful"
          : status === "Failed"
            ? "Payment Failed"
            : "Payment Pending",

      description:
        status === "Paid"
          ? "Amount paid successfully"
          : status === "Failed"
            ? "Payment could not be processed"
            : "Waiting for payment confirmation",

      date: payment.paymentDate || "15 Aug 2025",
      time: payment.paymentTime || "10:34 AM",

      state:
        status === "Paid"
          ? "completed"
          : status === "Failed"
            ? "failed"
            : "pending",
    },
    {
      title: "Invoice Generated",

      description:
        status === "Paid"
          ? "Invoice generated successfully"
          : "Invoice not generated",

      date:
        status === "Paid"
          ? payment.invoiceDate || "15 Aug 2025"
          : "--",

      time:
        status === "Paid"
          ? payment.invoiceTime || "10:35 AM"
          : "--",

      state: status === "Paid" ? "completed" : "inactive",
    },
  ];

  const getIcon = (state) => {
    switch (state) {
      case "completed":
        return (
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center ">
            <CheckCircle2
              size={18}
              className="text-green-600"
            />
          </div>
        );

      case "pending":
        return (
          <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock3
              size={18}
              className="text-yellow-600"
            />
          </div>
        );

      case "failed":
        return (
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
            <CircleX
              size={18}
              className="text-red-600"
            />
          </div>
        );

      default:
        return (
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300" />
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
      {/* Header */}

      <div className="px-6 py-5 border-b">
        <h3 className="text-lg font-bold text-slate-800">
          Payment Status Timeline
        </h3>
      </div>

      {/* Timeline */}

      <div className="p-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex gap-4 relative pb-8 last:pb-0"
          >
            {index !== steps.length - 1 && (
              <div className="absolute left-[18px] top-10 w-[2px] h-full bg-slate-200" />
            )}

            {getIcon(step.state)}

            <div className="flex-1 flex justify-between">
              <div>
                <h4 className="font-semibold text-slate-800">
                  {step.title}
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  {step.description}
                </p>
              </div>

              <div className="text-right text-xs text-slate-400">
                <p>{step.date}</p>
                <p>{step.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentStatusTimeline;