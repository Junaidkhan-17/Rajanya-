import { Upload, X } from "lucide-react";

const ProductImagesCard = ({ formData, setFormData }) => {
  // Upload Gallery Images
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const uploadedImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      image: URL.createObjectURL(file),
      file,
    }));

    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...uploadedImages],
    }));
  };

  // Upload Cover Image
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      coverImage: URL.createObjectURL(file),
      coverFile: file,
    }));
  };

  // Delete Gallery Image
  const removeGalleryImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((img) => img.id !== id),
    }));
  };

  // Delete Cover Image
  const removeCoverImage = () => {
    setFormData((prev) => ({
      ...prev,
      coverImage: "",
      coverFile: null,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          2
        </div>

        <h2 className="text-lg font-semibold text-slate-800">Product Images</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        {/* Cover Image */}

        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4">
            Cover Image
          </label>

          {formData.coverImage ? (
            <div className="relative">
              <img
                src={formData.coverImage}
                alt=""
                className="w-[220px] h-[320px] rounded-2xl object-cover border border-slate-200"
              />

              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-red-50"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
              />

              <div className="w-[220px] h-[320px] rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center hover:border-black transition">
                <Upload size={38} className="text-slate-400" />

                <h4 className="mt-4 font-semibold">Upload Cover</h4>

                <p className="text-xs text-slate-400 mt-1">JPG PNG WEBP</p>
              </div>
            </label>
          )}
        </div>

        {/* Gallery */}

        {/* Right Side */}

        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold text-slate-500 mb-4">
            Gallery Images
          </label>

          {/* Existing Images */}

          <div className="flex flex-wrap gap-3">
            {formData.galleryImages.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={img.image}
                  alt=""
                  className="w-20 h-28 rounded-xl object-cover border"
                />

                <button
                  type="button"
                  onClick={() => removeGalleryImage(img.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center"
                >
                  <X size={12} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Box */}

          <label className="cursor-pointer mt-5 inline-block">
            <input
              hidden
              type="file"
              multiple
              accept="image/*"
              onChange={handleGalleryUpload}
            />

            <div className="w-36 h-36 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center hover:border-black transition">
              <Upload size={30} className="text-slate-400" />

              <h4 className="mt-3 text-sm font-semibold">Upload Images</h4>

              <p className="text-[11px] text-slate-400 mt-1">
                JPG, PNG (Max 2MB)
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCard;
