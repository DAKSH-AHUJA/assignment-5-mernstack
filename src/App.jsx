import useFetch from "./hooks/useFetch";

// The API we want to fetch products from
const API_URL = "https://api.escuelajs.co/api/v1/products";

// A small component to display one product as a card
function ProductCard({ product }) {
  let image = "";
  if (product.images && product.images.length > 0) {
    image = product.images[0];
  }
  // Get category name if available, otherwise just say "Product"
  let category = "Product";
  if (product.category) {
    category = product.category.name;
  }

  return (
    <div className="product-card">
      <img src={image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <div className="product-footer">
        <span className="price">${product.price}</span>
        <span className="category">{category}</span>
      </div>
    </div>
  );
}

// The main app component
export default function App() {
  const { data, loading, error } = useFetch(API_URL);

  // While loading, show a simple message
  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <p>Task 5: React Custom Hooks</p>
          <h1>Products fetched with useFetch</h1>
        </div>
        <p className="loading-text">Loading products...</p>
      </div>
    );
  }

  // If there's an error, show an error box
  if (error) {
    return (
      <div className="container">
        <div className="header">
          <p>Task 5: React Custom Hooks</p>
          <h1>Products fetched with useFetch</h1>
        </div>
        <div className="error-message">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  let products = [];
  if (Array.isArray(data)) {
    products = data.slice(0, 12);
  }

  // Show the product grid
  return (
    <div className="container">
      <div className="header">
        <p>Task 5: React Custom Hooks</p>
        <h1>Products fetched with useFetch</h1>
      </div>
      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}