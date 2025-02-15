import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Hủy đơn hàng
  const cancelOrder = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${id} không?`)) {
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: "Đã hủy" } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      toast.success(`Đơn hàng #${id} đã được hủy`);
    }
  };

  // Xóa đơn hàng (có xác nhận)
  const deleteOrder = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${id} không?`)) {
      const filteredOrders = orders.filter((order) => order.id !== id);
      setOrders(filteredOrders);
      localStorage.setItem("orders", JSON.stringify(filteredOrders));
      toast.success(`Đã xóa đơn hàng #${id}`);
    }
  };

  if (orders.length === 0) {
    return <div className="container my-6 text-center">Chưa có đơn hàng nào!</div>;
  }

  return (
    <div className="container my-6">
      <h2 className="mb-4">Lịch Sử Đơn Hàng</h2>
      {orders.map((order) => (
        <div key={order.id} className="card mb-3 shadow-lg">
          <div className="card-body">
            <h5 className="card-title">Đơn hàng #{order.id}</h5>
            <p><strong>Ngày đặt:</strong> {order.date}</p>
            <p><strong>Khách hàng:</strong> {order.customerName}</p>
            <p><strong>Địa chỉ:</strong> {order.address}</p>
            <p><strong>Số điện thoại:</strong> {order.phone}</p>
            <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>

            <h6 className="mt-3">Sản phẩm:</h6>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Kích thước</th>
                    <th>Màu</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px" }} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.size}</td>
                      <td>{item.color}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price * item.quantity}₫</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h5 className="text-danger">Tổng tiền: {order.total}₫</h5>
            <p>
              <strong>Trạng thái:</strong> 
              <span className={order.status === "Đã hủy" ? "text-danger" : ""}>
                {order.status || "Đang xử lý"}
              </span>
            </p>

            {order.status !== "Đã hủy" && (
              <button className="btn btn-warning me-2" onClick={() => cancelOrder(order.id)}>
                Hủy đơn hàng
              </button>
            )}

            <button className="btn btn-danger" onClick={() => deleteOrder(order.id)}>
              Xóa đơn hàng
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
