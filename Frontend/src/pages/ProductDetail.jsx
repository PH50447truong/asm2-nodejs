import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0); // Thêm state để lưu số lượng tồn kho

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(data);
        setStock(data.stock); // Lưu số lượng tồn kho từ API
      } catch (error) {
        console.error("không tìm thấy sản phẩm chi tiết:", error);
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

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItem = cart.find(
      (item) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image, // ✅ Thêm trường image vào Local Storage
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Thêm vào giỏ hàng thành công!");
  };
  

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="container my-6">
      <div className="row">
        <div className="col-md-4">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4">
          <h2>{product.name}</h2>
          <p className="text-danger fs-4">{product.price}₫</p>
         
          <p className="fw-bold">Kích Thước</p>
          <div>
            {["S", "M", "L", "XL"].map((size) => (
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
          <p className="fw-bold text-danger">Còn: <span className="text-success">{stock}</span></p>
          <input
            type="number"
            className="form-control w-50"
            min="1"
            max={stock} // Giới hạn số lượng theo tồn kho
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          /> <br />
          <button className="btn btn-success me-2" onClick={goToCart}>Xem giỏ hàng</button>
          <button className="btn btn-primary" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
        </div>
      </div><br /> <br /> <br /> <br /><br /> <br />
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

export default ProductDetail;
