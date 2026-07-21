import { CheckCircle2 } from "lucide-react";

const ImageGuidelines = () => {
  return (
    <div className="bg-[#FFFCE8] rounded-2xl border border-yellow-200 shadow-sm p-6 ">
      {/* Heading */}

      <h2 className="text-lg font-semibold text-slate-900 mb-5">
        Image Guidelines
      </h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2
            size={18}
            className="text-green-500 mt-0.5 flex-shrink-0"
          />

          <p className="text-sm text-slate-700">
            Thumbnail:
            <span className="text-slate-500"> 300 × 300 px</span>
          </p>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2
            size={18}
            className="text-green-500 mt-0.5 flex-shrink-0"
          />

          <p className="text-sm text-slate-700">
            Format:
            <span className="text-slate-500"> JPG, PNG, WEBP, SVG</span>
          </p>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2
            size={18}
            className="text-green-500 mt-0.5 flex-shrink-0"
          />

          <p className="text-sm text-slate-700">
            Max Size:
            <span className="text-slate-500"> 2MB</span>
          </p>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2
            size={18}
            className="text-green-500 mt-0.5 flex-shrink-0"
          />

          <p className="text-sm italic text-slate-500">
            Use high quality images for best display.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageGuidelines;