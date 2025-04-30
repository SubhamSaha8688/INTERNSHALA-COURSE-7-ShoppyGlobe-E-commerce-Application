import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import { useProductList } from "../hooks/useProductList";
import { 
  searchProducts, 
  selectSearchResults, 
  selectIsSearching 
} from "../features/products/productsSlice";
import "./ProductList.css";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, error } = useProductList();
  const searchResults = useSelector(selectSearchResults);
  const isSearching = useSelector(selectIsSearching);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    dispatch(searchProducts(searchTerm));
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const displayProducts = isSearching ? searchResults : products;

  return (
    <div className="product-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {displayProducts.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        <div className="product-grid">
          {displayProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;