import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null); // State lưu thông tin sản phẩm
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("S"); // Kích thước được chọn
  const [selectedColor, setSelectedColor] = useState("Đen"); // Màu sắc được chọn
  const [quantity, setQuantity] = useState(1); // Số lượng

  // Lấy chi tiết sản phẩm
  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Lỗi khi lấy thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-5">Đang tải...</div>;
  }

  if (!product) {
    return <div className="text-center py-5">Không tìm thấy sản phẩm.</div>;
  }

  // Xử lý đặt hàng
  const handleOrder = () => {
    toast.success("Đặt hàng thành công!");
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    toast.success("Thêm vào giỏ hàng thành công!");
  };

  return (
    <div className="container my-6">
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-4">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        
        {/* Thông tin sản phẩm */}
        <div className="col-md-4">
          <h2>{product.name}</h2>
          <p className="text-danger fs-4">{product.price}₫</p>
          
          <p className="fw-bold">Kích Thước</p>
          <div>
            {[" S", " M", " L", " XL"].map((size) => (
              <label key={size} className="me-3">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => setSelectedSize(size)}
                /> {size}
              </label>
            ))}
          </div>
          
          <p className="fw-bold mt-3">Màu sắc</p>
          <div>
            {["Đen", "Trắng", "Xanh", "Đỏ"].map((color) => (
              <label key={color} className="me-3">
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                /> {color}
              </label>
            ))}
            <p className="me-3">
  <span className="fw-bold mt-3">Mô Tả</span> <br />
  {product.description}
</p>

          </div>
          
          <p className="fw-bold mt-3">Số lượng</p>
          <input
            type="number"
            className="form-control w-50"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          /> <br />
          
          
          
          <button className="btn btn-success me-2">Đặt hàng</button>
          <button className="btn btn-primary" >Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;