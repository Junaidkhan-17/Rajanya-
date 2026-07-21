import { NavLink, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import ProductInfoCard from "../../components/viewProductPage/ProductInfoCard";
import ProductImagesCard from "../../components/viewProductPage/ProductImagesCard";
import PricingCard from "../../components/viewProductPage/PricingCard";
import ProductPreviewCard from "../../components/viewProductPage/ProductPreviewCard";
import ProductDescriptionCard from "../../components/viewProductPage/ProductDescriptionCard";
import ProductAttributesCard from "../../components/viewProductPage/ProductAttributesCard";
import ProductActionButtons from "../../components/viewProductPage/ProductActionsButtons";
import BottomSection from "../../components/viewProductPage/BottomSection";

const ViewProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Backend API call
  }, [id]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <NavLink to="/" className="text-slate-400 hover:text-indigo-600">
              Dashboard
            </NavLink>

            <span className="text-slate-300">›</span>

            <NavLink
              to="/products"
              className="text-slate-400 hover:text-indigo-600"
            >
              Products
            </NavLink>

            <span className="text-slate-300">›</span>

            <span className="font-bold text-black">View Product</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">View Product</h1>

          <p className="text-sm text-slate-500 mt-1">
            View product for your virtual dressing room and rental collection.
          </p>
        </div>

        <NavLink
          to="/products"
          className="
    inline-flex items-center justify-center gap-2
    w-fit
    px-3 py-2
    md:px-4 md:py-2.5
    bg-black
    rounded-xl
    text-xs md:text-sm
    font-medium
    text-white
    hover:bg-white
    hover:text-black
    transition-all
  "
        >
          <ArrowLeft size={14} className="md:w-4 md:h-4" />
          Back to Products
        </NavLink>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 space-y-5">
          <div className="max-w-[900px]">
            <ProductInfoCard product={product} />
          </div>

          <ProductImagesCard product={product} />

          <PricingCard product={product} />
        </div>

        <div className="xl:col-span-4 space-y-5">
          <ProductPreviewCard product={product} />

          <ProductDescriptionCard product={product} />

          <ProductAttributesCard product={product} />

          <ProductActionButtons product={product} />
        </div>
      </div>
      <BottomSection />
    </div>
  );
};

export default ViewProductPage;
