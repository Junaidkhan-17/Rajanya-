import { UploadCloud } from "lucide-react";

const CategoryImageUpload = ({ formData, handleChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-fit">
      {/* Heading */}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-bold">
          2
        </div>

        <h2 className="text-lg font-semibold text-slate-900">
          Category Images
        </h2>
      </div>

      {/* Label */}

      <label className="block text-sm font-medium text-slate-700 mb-3">
        Category Thumbnail
        <span className="text-red-500">*</span>
      </label>

      {/* Upload Box */}

      <label
        htmlFor="thumbnail"
        className="
          border-2 border-dashed border-slate-200
          rounded-2xl
          h-47
          flex flex-col items-center justify-center
          cursor-pointer
          hover:border-black
          transition
        "
      >
        <UploadCloud
          size={42}
          className="text-slate-400 mb-3"
        />

        <h3 className="font-semibold text-slate-800">
          Upload thumbnail
        </h3>

        <p className="text-xs text-slate-400 text-center mt-2 leading-5">
          (300 × 300 px recommended)
          <br />
          JPG, PNG, WEBP (Max 2MB)
        </p>

        <span className="mt-4 px-5 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-100 transition">
          Choose File
        </span>

        <input
          id="thumbnail"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* Preview */}

      {formData?.image && (
        <div className="mt-4 flex justify-center">
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="w-24 h-24 rounded-xl object-cover border border-slate-200"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryImageUpload;