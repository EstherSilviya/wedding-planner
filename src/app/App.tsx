import { RouterProvider } from "react-router-dom"; // ✅ FIXED
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}