import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Delete from "../delete/DeleteProduct";

const ProductActionButtons = ({ product }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="p-3 sm:p-4 md:p-5">
        <div className="grid grid-cols-2 gap-3">
          {/* Edit */}
          <button
            onClick={() => navigate(`/products/edit/${product?.id}`)}
            className="h-11 rounded-xl bg-black text-white flex items-center justify-center gap-2"
          >
            <Pencil size={15} />
            Edit Product
          </button>

          {/* Delete */}
          <button
            onClick={() => setOpenDelete(true)}
            className="h-11 rounded-xl border border-red-200 bg-white text-red-500 flex items-center justify-center gap-2"
          >
            <Trash2 size={15} />
            Delete Product
          </button>
        </div>
      </div>

      <Delete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={() => {
          console.log("Delete:", product?.id);
          setOpenDelete(false);
        }}
        title="Delete Product?"
        itemName={product?.name}
      />
    </>
  );
};

export default ProductActionButtons;