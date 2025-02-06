import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(false); // Trạng thái gửi form

  async function onSubmit(data) {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/register", data);
      toast.success("Đăng ký thành công!");
    } catch (error) {
      console.error("Đã có lỗi khi đăng ký:", error); // In lỗi chi tiết ra console để debug
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Lỗi không xác định!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="container">
      <h1 className="text-center my-3">Đăng ký</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded shadow-sm bg-light">
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Mật khẩu */}
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="mb-3">
          <label className="form-label">Xác nhận mật khẩu</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            {...register("confirmPassword", {
              required: "Xác nhận mật khẩu không được để trống",
              validate: (value) =>
                value === watch("password") || "Mật khẩu không khớp",
            })}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
        </div>

        {/* Nút Submit */}
        <button type="submit" className="btn btn-primary w-100" disabled={loading || isSubmitting}>
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}

export default Register;
