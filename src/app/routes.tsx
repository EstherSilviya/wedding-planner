import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import { LoginPage } from "./pages/LoginPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { PlansPage } from "./pages/PlansPage";
import { PackageDetailsPage } from "./pages/PackageDetailsPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import { DashboardPage } from "./pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, // ❌ no navbar here
  },
  {
    element: <MainLayout />, // ✅ navbar wrapper
    children: [
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "/plans",
        element: <PlansPage />,
      },
      {
        path: "/package/:id",
        element: <PackageDetailsPage />,
      },
      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);