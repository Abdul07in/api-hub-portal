import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/common/templates/appLayout/AppLayout";
import PageShell from "@/common/templates/pageShell/PageShell";
import HomePage from "@/portal/pages/home/HomePage";
import SandboxPage from "@/portal/pages/sandbox/SandboxPage";
import ApiProductsPage from "@/portal/pages/apiProducts/ApiProductsPage";
import FaqsPage from "@/portal/pages/faqs/FaqsPage";
import ContactPage from "@/portal/pages/contactUs/ContactPage";

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
    ],
  },
]);
