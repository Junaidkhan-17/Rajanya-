import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AddProductButton() {
  return (
    <NavLink
      to="/products/add"
      className="
        w-full
        sm:w-auto
        md:w-[180px]

        bg-[#1B1E4B]
        hover:bg-[#14173c]
        text-white

        h-10
        sm:h-11
        md:h-[45px]

        px-4
        sm:px-6

        rounded-lg
        sm:rounded-xl

        flex
        items-center
        justify-center
        gap-2

        text-xs
        sm:text-sm
        md:text-base

        font-medium
        shadow-lg
        transition-all
      "
    >
      <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />

      <span>Add Product</span>
    </NavLink>
  );
}