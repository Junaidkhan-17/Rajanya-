import { useState } from "react";
import ProductRow from "./ProductRow";
import Pagination from "./Pagination";
import DeleteProduct from "../delete/DeleteProduct";

const initialProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
    name: "Bridal Lehenga",
    subtitle: "Red & Gold",
    category: "Bridal",
    price: "₹4,500",
    sizes: "S, M, L, XL",
    stock: 25,
    status: "Active",
    date: "30 May 2024",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=200",
    name: "Royal Sherwani",
    subtitle: "Beige & Gold",
    category: "Men's Wear",
    price: "₹3,500",
    sizes: "S, M, L, XL",
    stock: 18,
    status: "Active",
    date: "20 May 2024",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200",
    name: "Designer Saree",
    subtitle: "Pink",
    category: "Sarees",
    price: "₹2,800",
    sizes: "Free Size",
    stock: 30,
    status: "Active",
    date: "20 May 2024",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200",
    name: "Party Gown",
    subtitle: "Navy Blue",
    category: "Party Wear",
    price: "₹2,200",
    sizes: "S, M, L",
    stock: 12,
    status: "Inactive",
    date: "20 May 2024",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200",
    name: "Reception Gown",
    subtitle: "Silver",
    category: "Reception Wear",
    price: "₹5,200",
    sizes: "M, L, XL",
    stock: 8,
    status: "Active",
    date: "22 May 2024",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200",
    name: "Wedding Dress",
    subtitle: "White",
    category: "Bridal",
    price: "₹8,200",
    sizes: "S, M, L",
    stock: 15,
    status: "Active",
    date: "25 May 2024",
  },
];

const ProductTable = ({
  filters = {},
  selectedProducts,
  setSelectedProducts,
}) => {
  const [products, setProducts] = useState(initialProducts);

  const [currentPage, setCurrentPage] = useState(1);

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsPerPage = 5;

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  const handleDeleteProduct = () => {
    setProducts((prev) =>
      prev.filter((item) => item.id !== selectedProduct.id),
    );

    setOpenDelete(false);
  };

  const filteredProducts = products.filter((product) => {
    console.log(product.date);
    console.log(filters.selectedDate);
    const searchMatch =
      !filters.search ||
      product.name.toLowerCase().includes(filters.search.toLowerCase());

    const categoryMatch =
      !filters.category || product.category === filters.category;

    const sizeMatch = !filters.size || product.sizes.includes(filters.size);

    const statusMatch = !filters.status || product.status === filters.status;

    // Price Filter
    const numericPrice = Number(product.price.replace(/[₹,]/g, ""));

    let priceMatch = true;

    switch (filters.priceRange) {
      case "₹0 - ₹2000":
        priceMatch = numericPrice <= 2000;
        break;

      case "₹2000 - ₹5000":
        priceMatch = numericPrice >= 2000 && numericPrice <= 5000;
        break;

      case "₹5000 - ₹10000":
        priceMatch = numericPrice >= 5000 && numericPrice <= 10000;
        break;

      case "₹10000+":
        priceMatch = numericPrice >= 10000;
        break;

      default:
        priceMatch = true;
    }

    // Date Filter
    let dateMatch = true;

    if (filters.selectedDate) {
      const productDate = new Date(product.date).toISOString().split("T")[0];

      const selectedDate = new Date(filters.selectedDate)
        .toISOString()
        .split("T")[0];

      dateMatch = productDate === selectedDate;
    }

    return (
      searchMatch &&
      categoryMatch &&
      sizeMatch &&
      statusMatch &&
      priceMatch &&
      dateMatch
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map((item) => item.id));
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <>
      <div className="mt-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1300px]">
            <thead className="bg-white border-b">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-slate-900"
                    checked={
                      filteredProducts.length > 0 &&
                      selectedProducts.length === filteredProducts.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase">
                  Image
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase text-left">
                  Product Name
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase text-left">
                  Category
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase text-left">
                  Price
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase text-left">
                  Sizes
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase text-left">
                  Stock
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase text-left">
                  Status
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase text-left">
                  Date Added
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    onDeleteClick={handleDeleteClick}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-500">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>

      <DeleteProduct
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDeleteProduct}
        title="Delete Product?"
        itemName={selectedProduct?.name}
      />
    </>
  );
};

export default ProductTable;
