import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Header from "./components/Header";
import "./App.css";


const Home = lazy(() => import("./pages/Home"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="footer">
            <p>© 2023 ShoppyGlobe. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;