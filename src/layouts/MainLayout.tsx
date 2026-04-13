import { Outlet } from "react-router-dom";
import Navbar from "../app/components/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}