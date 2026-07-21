import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomSection = () => {
  return (
    <div className="mt-8">
      {/* Back Button */}
      <div className="mb-8">
        <NavLink
          to="/products"
          className="
            inline-flex items-center gap-2
            px-5 py-3
            bg-black
            rounded-xl
            text-sm font-medium
            text-white
            hover:bg-white
            hover:text-black
            transition-all
          "
        >
          <ArrowLeft size={16} />
          Back to Products
        </NavLink>
      </div>

    </div>
  );
};

export default BottomSection;