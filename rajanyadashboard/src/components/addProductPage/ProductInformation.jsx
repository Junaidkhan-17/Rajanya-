import { useEffect, useState } from "react";
// import api from "../../utilities/api";

const ProductInformation = ({ productData, setProductData }) => {
  const [categories, setCategories] = useState([]);

  /*
  API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };
  */

  // Dummy Categories
  useEffect(() => {
    setCategories([
      {
        _id: "1",
        categoryName: "Men's Wear",
      },
      {
        _id: "2",
        categoryName: "Women's Wear",
      },
      {
        _id: "3",
        categoryName: "Bridal",
      },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
          1
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Product Information
        </h2>
      </div>

      <div className="space-y-5">

        {/* Product Name */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Product Name
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none focus:border-black"
          />
        </div>

        {/* Category */}

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
              <span className="text-red-500">*</span>
            </label>

            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none focus:border-black"
            >
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Sub Category
            </label>

            <input
              type="text"
              name="subCategory"
              value={productData.subCategory}
              onChange={handleChange}
              placeholder="Enter sub category"
              className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none focus:border-black"
            />
          </div>

        </div>

        {/* Brand */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Brand / Designer
          </label>

          <input
            type="text"
            name="brandDesigner"
            value={productData.brandDesigner}
            onChange={handleChange}
            placeholder="Enter brand or designer"
            className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none focus:border-black"
          />
        </div>

      </div>
    </div>
  );
};

export default ProductInformation;