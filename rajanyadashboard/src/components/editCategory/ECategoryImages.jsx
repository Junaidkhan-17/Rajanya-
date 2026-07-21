import { ImagePlus, Trash2 } from "lucide-react";

const ECategoryImages = ({ category, setCategory }) => {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCategory((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
      imageFile: file,
    }));
  };

  const removeImage = () => {
    setCategory((prev) => ({
      ...prev,
      image: "",
      imageFile: null,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded bg-black text-white flex items-center justify-center text-xs font-bold">
          2
        </div>

        <h2 className="text-lg font-semibold">
          Category Images
        </h2>
      </div>

      <label className="block text-sm font-medium mb-5">
        Category Thumbnail
        <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Image */}

        <div className="flex justify-center md:block">
          <img
            src={
              category?.image ||
              "https://placehold.co/120x120?text=Image"
            }
            alt="Category"
            className="w-32 h-32 rounded-full object-cover border border-slate-200 shadow-sm"
          />
        </div>

        {/* Buttons */}

        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="flex flex-wrap gap-3">
            {/* Replace */}

            <label
              className="
                inline-flex items-center gap-2
                px-4 h-10
                rounded-lg
                border border-slate-300
                bg-white
                text-sm font-medium
                cursor-pointer
                hover:bg-slate-50
                transition
              "
            >
              <ImagePlus size={15} />

              Replace

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            {/* Delete */}

            <button
              type="button"
              onClick={removeImage}
              className="
                inline-flex items-center gap-2
                px-4 h-10
                rounded-lg
                border border-red-200
                bg-white
                text-red-500
                text-sm
                font-medium
                hover:bg-red-50
                transition
              "
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>

          <div className="mt-4 text-xs text-slate-400 leading-5 text-center md:text-left">
            Recommended: <strong>300 × 300 px</strong>
            <br />
            JPG, PNG, WEBP (Max. 2MB)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECategoryImages;