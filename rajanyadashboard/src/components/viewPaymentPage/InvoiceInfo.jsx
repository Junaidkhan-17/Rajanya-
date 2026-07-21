import { FileText, Download } from "lucide-react";

const InvoiceInfo = ({ payment }) => {
  const downloadPDF = () => {
    const invoice = `
Invoice Number : ${payment.invoiceNumber}
Invoice Date   : ${payment.invoiceDate}
Invoice Amount : ₹${payment.amount}

Customer : ${payment.customer}
Transaction ID : ${payment.transactionId}
Status : ${payment.status}
Payment Method : ${payment.method}
`;

    const blob = new Blob([invoice], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${payment.invoiceNumber}.pdf`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <FileText size={24} className="text-slate-700" />

        <h2 className="text-2xl font-bold text-slate-900">
          Invoice Information
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col justify-between min-h-[270px]">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-lg">
              Invoice Number :
            </span>

            <span className="font-bold text-slate-700 text-xl">
              {payment.invoiceNumber}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-lg">
              Invoice Date :
            </span>

            <span className="font-bold text-slate-700 text-xl">
              {payment.invoiceDate}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-lg">
              Invoice Amount :
            </span>

            <span className="font-bold text-slate-700 text-xl">
              ₹{payment.amount}
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={downloadPDF}
            disabled={payment.status !== "Paid"}
            className="flex items-center gap-2 px-6 h-12 rounded-xl border-2 bg-black text-white hover:bg-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfo;