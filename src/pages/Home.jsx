import ProductList from "../components/ProductList";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to ShoppyGlobe</h1>
        <p>Discover amazing products from around the world</p>
      </div>
      <ProductList />
    </div>
  );
};

export default Home;