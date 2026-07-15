import { Navigate } from "react-router-dom";

// หน้าลงทะเบียนเวิร์คช็อป AI ถูกยกเลิก — redirect ไปหน้าสมัคร/เข้าสู่ระบบปกติ
export default function RegisterPage() {
  return <Navigate to="/login" replace />;
}
