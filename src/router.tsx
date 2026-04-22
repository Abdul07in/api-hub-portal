import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/common/templates/appLayout/AppLayout";
import PageShell from "@/common/templates/pageShell/PageShell";
import HomePage from "@/portal/pages/home/HomePage";
import SandboxPage from "@/portal/pages/sandbox/SandboxPage";
import ApiProductsPage from "@/portal/pages/apiProducts/ApiProductsPage";
import FaqsPage from "@/portal/pages/faqs/FaqsPage";
import ContactPage from "@/portal/pages/contactUs/ContactPage";
import LoginPage from "@/portal/pages/login/LoginPage";
import SignupPage from "@/portal/pages/signup/SignupPage";
import PartnerDashboardPage from "@/portal/pages/partnerDashboard/PartnerDashboardPage";
import ProtectedRoute from "@/portal/components/auth/ProtectedRoute";
import GuestRoute from "@/portal/components/auth/GuestRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "faqs",
        element: (
          <PageShell maxWidth="xl">
            <FaqsPage />
          </PageShell>
        ),
      },
      {
        path: "contact",
        element: (
          <PageShell maxWidth="xl">
            <ContactPage />
          </PageShell>
        ),
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: "login",
            element: (
              <PageShell maxWidth="xl">
                <LoginPage />
              </PageShell>
            ),
          },
          {
            path: "signup",
            element: (
              <PageShell maxWidth="xl">
                <SignupPage />
              </PageShell>
            ),
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "partner/dashboard",
            element: (
              <PageShell maxWidth="xl">
                <PartnerDashboardPage />
              </PageShell>
            ),
          },
          {
            path: "sandbox",
            element: (
              <PageShell maxWidth="xl">
                <SandboxPage />
              </PageShell>
            ),
          },
          {
            path: "api-products",
            element: (
              <PageShell maxWidth="xl">
                <ApiProductsPage />
              </PageShell>
            ),
          },
        ],
      },
    ],
  },
]);
