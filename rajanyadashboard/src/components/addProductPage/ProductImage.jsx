import { Upload, Plus, X } from "lucide-react";

const ProductImages = ({ productData, setProductData }) => {
  // Cover Image
  const handleCoverImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProductData((prev) => ({
      ...prev,
      coverImage: URL.createObjectURL(file),

      // API
      coverImageFile: file,
    }));
  };

  // Gallery Images
  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));

    setProductData((prev) => ({
      ...prev,

      galleryImages: [
        ...(prev.galleryImages || []),
        ...previews,
      ].slice(0, 5),

      // API
      galleryImageFiles: [
        ...(prev.galleryImageFiles || []),
        ...files,
      ].slice(0, 5),
    }));
  };

  const removeCoverImage = () => {
    setProductData((prev) => ({
      ...prev,
      coverImage: "",
      coverImageFile: null,
    }));
  };

  const removeGalleryImage = (index) => {
    setProductData((prev) => ({
      ...prev,

      galleryImages: prev.galleryImages.filter(
        (_, i) => i !== index
      ),

      galleryImageFiles: prev.galleryImageFiles.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          3
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Product Images
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Cover */}

        <div>
          <label className="block text-sm font-medium mb-3">
            Cover Image
          </label>

          {productData.coverImage ? (
            <div className="relative">
              <img
                src={productData.coverImage}
                alt=""
                className="w-full h-60 object-cover rounded-xl border"
              />

              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <input
                id="cover"
                hidden
                type="file"
                accept="image/*"
                onChange={handleCoverImage}
              />

              <label
                htmlFor="cover"
                className="border-2 border-dashed border-slate-300 rounded-xl h-60 flex flex-col items-center justify-center cursor-pointer hover:border-black"
              >
                <Upload size={30} />

                <p className="mt-3 font-medium">
                  Upload Cover Image
                </p>

                <p className="text-xs text-slate-400">
                  JPG PNG WEBP
                </p>
              </label>
            </>
          )}
        </div>

        {/* Gallery */}

        <div>
          <label className="block text-sm font-medium mb-3">
            Gallery Images (Max 5)
          </label>

          <div className="grid grid-cols-3 gap-3">
            {(productData.galleryImages || []).map(
              (image, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  <img
                    src={image}
                    className="h-28 w-full rounded-xl object-cover border"
                    alt=""
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeGalleryImage(index)
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              )
            )}

            {(productData.galleryImages || []).length < 5 && (
              <>
                <input
                  hidden
                  id="gallery"
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleGalleryImages}
                />

                <label
                  htmlFor="gallery"
                  className="border-2 border-dashed border-slate-300 rounded-xl h-28 flex flex-col items-center justify-center cursor-pointer hover:border-black"
                >
                  <Plus size={20} />

                  <span className="text-xs mt-2">
                    Add Image
                  </span>
                </label>
              </>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Maximum 5 gallery images.
          </p>
        </div>
      </div>

      {/*
      API
      FormData.append("coverImage", coverImageFile)
      galleryImageFiles.forEach(file=>{
        formData.append("galleryImages",file)
      })
      */}
    </div>
  );
};

export default ProductImages;