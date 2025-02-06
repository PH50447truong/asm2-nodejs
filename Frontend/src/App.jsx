import { useRoutes } from "react-router-dom";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import ProductList from "./pages/ProductList";
import Homepage from "./pages/Homepage";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  // Hàm xử lý tìm kiếm
  const handleSearch = async (query) => {
    if (!query) return;
  
    try {
      const response = await fetch(`http://localhost:3000/products?name=${query}`);
      const data = await response.json();
  
      console.log("🔍 API response:", data);
      setSearchResults(data.products || []); // ✅ Sử dụng đúng key "products"
      console.log("🔄 Updated searchResults:", data.products || []);
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm:", error);
    }
  };
  

  const routes = [
    { path: "login", 
      element: <Login /> },
    { path: "register", 
      element: <Register /> },
    { path: "/", 
    element: <Homepage handleSearch={handleSearch} searchResults={searchResults} /> },
    { path: "product/list", 
      element: <ProductList /> },
    { path: "product/add", 
      element: <ProductAdd /> },
    { path: "product/edit/:id", 
      element: <ProductEdit /> },
    {
      path: "product/detail/:id",
      element: <ProductDetail />,
    },
  ];

  const element = useRoutes(routes);
  return (
    <main>
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg bg-dark py-3">
      <div className="container">
        <a className="navbar-brand text-uppercase fw-bold text-light" href="/">
          FASHION FLASH
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link text-light fw-semibold px-3 active" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link text-light fw-semibold px-3" href="/product/list">Product List</a></li>
            <li className="nav-item"><a className="nav-link text-light fw-semibold px-3" href="/product/add">Product Add</a></li>
            <li className="nav-item"><a className="nav-link text-light fw-semibold px-3" href="/register">Register</a></li>
            <li className="nav-item"><a className="nav-link text-light fw-semibold px-3" href="/login">Login</a></li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex ms-3" role="search" onSubmit={(e) => { 
            e.preventDefault();
            console.log(e.target.search.value);
            handleSearch(e.target.search.value);
          }}>
            <input className="form-control me-2" type="search" name="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>

          </div>
        </div>
      </nav>

      {/* Nội dung chính */}
      <div className="container my-3">{element}</div>
      <Toaster />
    </main>
  );
}
export default App;
