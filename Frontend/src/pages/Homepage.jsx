import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Homepage({ handleSearch, searchResults }) {
  // console.log("handleSearch:", handleSearch); 
  console.log("searchResults:", searchResults);

  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  // Hàm gọi API lấy danh sách sản phẩm
  async function fetchProducts(page = 1) {
    try {
      const { data } = await axios.get("http://localhost:3000/products", {
        params: {
          page,
          limit: 6,
        },
      });

      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / data.limit)); // Cập nhật tổng số trang
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      toast.error("Lỗi khi lấy danh sách sản phẩm.");
    }
  }

  // Gọi API khi trang thay đổi
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Chuyển đến trang trước
  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Chuyển đến trang tiếp theo
  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    
    <div>
      {/* Hero Banner */}
      <section className="hero-banner text-white text-center">
        <img
          src="https://thietkewebchuyen.com/wp-content/uploads/thiet-ke-banner-website-anh-bia-Facebook-shop-quan-ao-nam-nu-4.jpg"
          alt="Hero Banner"
          className="img-fluid w-100"
          style={{ height: "400px", objectFit: "cover" }}
        />
      </section>
      <div className="container my-5">
        {/* <h2 className="text-center mb-4">Kết quả tìm kiếm</h2> */}
        {searchResults.length > 0 ? (
          <div className="row">
            {searchResults.map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className="product-card p-3 border rounded">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                  <h5 className="text-center">{product.name}</h5>
                  <p className="text-center text-danger">{product.price} VND</p>
                  <a href="#" className="btn btn-primary d-block text-center">Mua</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Không tìm thấy sản phẩm nào.</p>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="container my-5" id="shop-now">
        <h2 className="text-center mb-4">Sản Phẩm Mới Nhất</h2>
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="product-card p-3 border rounded">
                  <a href={`/product/detail/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid mb-3"
                      style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                  </a>
                  <a href={`/product/detail/${product.id}`} className="btn btn-default text-center">
                    <h5 className="text-center">{product.name}</h5>
                  </a>
                  <p className="text-center text-danger">{product.price} VND</p>
                  <a href="#" className="btn btn-primary d-block text-center">
                    Mua
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Không tìm thấy sản phẩm nào.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls text-center mt-4">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Pre
          </button>
          <span className="mx-2">
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-outline-primary mx-2"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p>&copy; 2025 Fashion Store | All Rights Reserved</p>
          <p>
            Follow us on:
            <a href="#" className="text-white ms-2">
              Facebook
            </a>
            <a href="#" className="text-white ms-2">
              Instagram
            </a>
            <a href="#" className="text-white ms-2">
              Twitter
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
