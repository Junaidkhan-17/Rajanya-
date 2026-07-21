import {
  CheckCircle2,
  Clock3,
  Loader2,
  XCircle,
} from "lucide-react";

const TryOnProgressCard = ({ request }) => {
  const status = request?.status;

  const steps = [
    {
      title: "Payment Received",
      time: "15 Aug 2025, 10:31 AM",
      completed: true,
    },
    {
      title: "Photo Uploaded",
      time: "15 Aug 2025, 10:31 AM",
      completed: true,
    },
    {
      title: "AI Processing Started",
      time: "15 Aug 2025, 10:32 AM",
      completed:
        status === "Processing" ||
        status === "Completed" ||
        status === "Failed",
      processing: status === "Processing",
    },
    {
      title: "Try-On Generated",
      time: "15 Aug 2025, 10:33 AM",
      completed:
        status === "Completed" || status === "Failed",
      failed: status === "Failed",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-70%">
      <h3 className="font-semibold text-lg mb-6">
        Try-On Progress
      </h3>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              {step.processing ? (
                <Loader2
                  size={20}
                  className="text-orange-500 animate-spin"
                />
              ) : step.failed ? (
                <XCircle
                  size={20}
                  className="text-red-500"
                />
              ) : step.completed ? (
                <CheckCircle2
                  size={20}
                  className="text-green-500"
                />
              ) : (
                <Clock3
                  size={20}
                  className="text-slate-300"
                />
              )}

              {index !== steps.length - 1 && (
                <div className="w-[2px] flex-1 bg-slate-200 mt-2"></div>
              )}
            </div>

            <div>
              <h4 className="font-medium text-slate-800">
                {step.title}
              </h4>

              <p className="text-xs text-slate-400 mt-1">
                {step.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status Card */}

      {status === "Completed" && (
        <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-4">
          <h4 className="text-green-700 font-semibold">
            Try-On Completed Successfully
          </h4>

          <p className="text-green-600 text-sm mt-1">
            The AI try-on result is ready.
          </p>
        </div>
      )}

      {status === "Processing" && (
        <div className="mt-8 rounded-xl border border-orange-100 bg-orange-50 p-4">
          <h4 className="text-orange-700 font-semibold">
            AI is Processing...
          </h4>

          <p className="text-orange-600 text-sm mt-1">
            Please wait while the image is generated.
          </p>
        </div>
      )}

      {status === "Pending" && (
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h4 className="text-blue-700 font-semibold">
            Waiting for Processing
          </h4>

          <p className="text-blue-600 text-sm mt-1">
            Your request is queued.
          </p>
        </div>
      )}

      {status === "Failed" && (
        <div className="mt-8 rounded-xl border border-red-100 bg-red-50 p-4">
          <h4 className="text-red-700 font-semibold">
            Try-On Failed
          </h4>

          <p className="text-red-600 text-sm mt-1">
            Something went wrong while generating the result.
          </p>
        </div>
      )}
    </div>
  );
};

export default TryOnProgressCard;