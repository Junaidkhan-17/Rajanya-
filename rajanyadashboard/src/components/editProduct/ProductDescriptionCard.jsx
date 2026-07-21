import { Bold, Italic, Underline, Link2, List } from "lucide-react";

const ProductDescriptionCard = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          6
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Product Description
        </h2>
      </div>

      {/* SHORT DESCRIPTION */}

      <div className="mb-6">

        <label className="block text-xs font-bold uppercase tracking-widest text-purple-900 mb-2">
          Short Description <span className="text-red-500">*</span>
        </label>

        <div className="relative">

          <textarea
            rows={4}
            maxLength={200}
            value={formData.shortDescription || ""}
            onChange={(e) =>
              handleChange("shortDescription", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none resize-none"
          />

          <span className="absolute bottom-3 right-3 text-[11px] text-slate-400">
            {(formData.shortDescription || "").length}/200
          </span>

        </div>

      </div>

      {/* FULL DESCRIPTION */}

      <div className="mb-6">

        <label className="block text-xs font-bold uppercase tracking-widest text-purple-900 mb-2">
          Full Description <span className="text-red-500">*</span>
        </label>

        <div className="border border-slate-200 rounded-xl overflow-hidden">

          {/* Toolbar */}

          <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-200 bg-slate-50">

            <Bold size={15} className="text-slate-500 cursor-pointer" />
            <Italic size={15} className="text-slate-500 cursor-pointer" />
            <Underline size={15} className="text-slate-500 cursor-pointer" />
            <List size={15} className="text-slate-500 cursor-pointer" />
            <Link2 size={15} className="text-slate-500 cursor-pointer" />

          </div>

          <div className="relative">

            <textarea
              rows={7}
              maxLength={2000}
              value={formData.fullDescription || ""}
              onChange={(e) =>
                handleChange("fullDescription", e.target.value)
              }
              className="w-full resize-none outline-none p-4 text-sm"
            />

            <span className="absolute bottom-3 right-3 text-[11px] text-slate-400">
              {(formData.fullDescription || "").length}/2000
            </span>

          </div>

        </div>

      </div>

      {/* FABRIC & CARE */}

      <div>

        <label className="block text-xs font-bold uppercase tracking-widest text-purple-900 mb-2">
          Fabric & Care <span className="text-red-500">*</span>
        </label>

        <div className="border border-slate-200 rounded-xl overflow-hidden">

          <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-200 bg-slate-50">

            <Bold size={15} className="text-slate-500 cursor-pointer" />
            <Italic size={15} className="text-slate-500 cursor-pointer" />
            <Underline size={15} className="text-slate-500 cursor-pointer" />
            <List size={15} className="text-slate-500 cursor-pointer" />
            <Link2 size={15} className="text-slate-500 cursor-pointer" />

          </div>

          <div className="relative">

            <textarea
              rows={6}
              maxLength={1000}
              value={formData.fabricCare || ""}
              onChange={(e) =>
                handleChange("fabricCare", e.target.value)
              }
              className="w-full resize-none outline-none p-4 text-sm"
            />

            <span className="absolute bottom-3 right-3 text-[11px] text-slate-400">
              {(formData.fabricCare || "").length}/1000
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDescriptionCard;