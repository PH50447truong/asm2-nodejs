import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">🛒 Giỏ Hàng Của Bạn</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted">Giỏ hàng trống.</p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {cart.map((item, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm border-0">
                  <div className="row g-0">
                    <div className="col-4">
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="img-fluid rounded-start"
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="text-muted mb-1">
                          <strong>Kích thước:</strong> {item.size} | <strong>Màu:</strong> {item.color}
                        </p>

                        {/* Điều chỉnh số lượng */}
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">Số lượng:</span>
                          <input
                            type="number"
                            className="form-control text-center w-25"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => updateQuantity(index, Number(e.target.value))}
                          />
                        </div>

                        {/* Hiển thị giá sản phẩm */}
                        <p className="fw-bold text-danger">Giá: {item.price * item.quantity}₫</p>

                        {/* Nút xóa */}
                        <button className="btn btn-danger btn-sm w-100" onClick={() => removeItem(index)}>
                          ❌ Xóa khỏi giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hiển thị tổng tiền */}
          <div className="text-center mt-4">
            <h4 className="fw-bold text-danger">Tổng tiền: {totalPrice.toLocaleString()}₫</h4>
            <button className="btn btn-primary btn-lg mt-2" onClick={goToCheckout}>
              🛍 Tiến hành thanh toán 
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
