import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import api from "../../utils/api"; 

const ProductActions = ({ productData }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/products");
  };

  const handleSave = async () => {
    console.log("Product Payload =>", productData);

    /*
    try {
      await api.post("/products/add", productData);

      toast.success("Product Added Successfully");

      navigate("/products");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
    */
  };

  return (
    <div className="rounded-2xl p-5">
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 h-11 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="px-6 h-11 bg-black hover:bg-slate-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition"
        >
          <Save size={16} />
          Save Product
        </button>
      </div>
    </div>
  );
};

export default ProductActions;