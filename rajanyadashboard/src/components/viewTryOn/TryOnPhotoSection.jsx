import { Sparkles } from "lucide-react";

const TryOnPhotoSection = ({ request }) => {
  if (!request?.beforeImage) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Before */}

        <div>
          <h3 className="font-semibold mb-4">Uploaded Photo (Before)</h3>

          <img
            src={request.beforeImage}
            alt=""
            className="w-full h-[400px] object-cover rounded-2xl border"
          />
        </div>

        {/* After */}

        <div>
          <h3 className="font-semibold mb-4">AI Try-On Result (After)</h3>

          <div className="relative">
            <img
              src={request.afterImage}
              alt=""
              className="w-full h-[400px] object-cover rounded-2xl border"
            />

            {/* Small Preview */}

            <img
              src={request.afterImage}
              alt=""
              className="absolute bottom-4 right-4 w-20 h-24 rounded-xl border-2 border-white object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="mt-6 rounded-xl bg-violet-50 border border-violet-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-violet-700">
          <Sparkles size={18} />
          <span className="text-sm">
            AI Generated using our advanced virtual try-on technology.
          </span>
        </div>

        <p className="text-sm text-slate-500">
          Generation Time : {request.generationTime}
        </p>
      </div>
    </div>
  );
};

export default TryOnPhotoSection;
