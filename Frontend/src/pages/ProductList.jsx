import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProductList() {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  // Lấy danh sách sản phẩm theo trang
  async function getProductList(page = 1) {
    try {
      const { data } = await axios.get(`http://localhost:3000/products?page=${page}`);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / data.limit)); // Tính tổng số trang từ API
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Lỗi khi lấy danh sách sản phẩm.");
    }
  }

  // Hàm xóa sản phẩm
  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      toast.success("Sản phẩm đã được xóa thành công!");
      // Sau khi xóa, cập nhật lại danh sách sản phẩm
      getProductList(currentPage);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Lỗi khi xóa sản phẩm.");
    }
  }

  // Chạy khi trang thay đổi
  useEffect(() => {
    getProductList(currentPage);
  }, [currentPage]);

  return (
    <div className="container">
      <h1 className="text-center my-2">Danh Sách Sản Phẩm</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên</th>
            <th scope="col">Giá</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.name}</td>
              <td>{product.price} USD</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{product.description}</td>
              <td>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="btn btn-danger"
                >
                  Xóa
                </button>
                <a href={`/product/edit/${product.id}`}>
                  <button className="btn btn-info">Chỉnh sửa</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1} // Vô hiệu hóa nếu đang ở trang đầu
        >
          Previous
        </button>
        <span className="mx-2">
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-primary mx-2"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages} // Vô hiệu hóa nếu đang ở trang cuối
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
