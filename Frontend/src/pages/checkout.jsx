import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // Trạng thái lưu phương thức thanh toán
  const navigate = useNavigate();

  const handleOrder = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      toast.error("Giỏ hàng trống, không thể đặt hàng!");
      return;
    }

    if (!name || !address || !phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    const newOrder = {
      id: new Date().getTime(),
      customerName: name,
      address,
      phone,
      paymentMethod, // Lưu phương thức thanh toán
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
      status: "Đang xử lý",
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));

    localStorage.removeItem("cart");
    toast.success("Đặt hàng thành công!");
    navigate("/orders");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Thông Tin Đặt Hàng</h2>
        
        <div className="mb-3">
          <label className="form-label fw-bold">Họ và tên</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Phương thức thanh toán</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Thanh toán khi nhận hàng (COD)</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Thanh toán bằng thẻ</label>
            </div>
          </div>
        </div>

        <button
          className="btn btn-success w-100 fw-bold"
          onClick={handleOrder}
          style={{ transition: "0.3s" }}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
}

export default Checkout;
