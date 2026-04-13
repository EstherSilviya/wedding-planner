import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between items-center px-6 py-4 shadow-md"
      style={{
        background: "linear-gradient(135deg, #C9A646, #E5C76B)",
        color: "white"
      }}
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/plans")}
        className="font-bold text-lg cursor-pointer"
      >
        Blissful Moments 💍
      </div>

      {/* NAV LINKS */}
      <div className="flex gap-6 items-center text-sm font-medium">
        <button onClick={() => navigate("/plans")}>Plans</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/admin")}>Admin</button>
      </div>
    </div>
  );
}