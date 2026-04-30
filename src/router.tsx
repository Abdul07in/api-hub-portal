import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/common/templates/appLayout/AppLayout";
import PageShell from "@/common/templates/pageShell/PageShell";
import Loader from "@/common/atoms/loader/Loader";
import ProtectedRoute from "@/portal/components/auth/ProtectedRoute";
import GuestRoute from "@/portal/components/auth/GuestRoute";

const HomePage = lazy(() => import("@/portal/pages/home/HomePage"));
const SandboxPage = lazy(() => import("@/portal/pages/sandbox/SandboxPage"));
const ApiProductsPage = lazy(() => import("@/portal/pages/apiProducts/ApiProductsPage"));
const FaqsPage = lazy(() => import("@/portal/pages/faqs/FaqsPage"));
const ContactPage = lazy(() => import("@/portal/pages/contactUs/ContactPage"));
const LoginPage = lazy(() => import("@/portal/pages/login/LoginPage"));
const SignupPage = lazy(() => import("@/portal/pages/signup/SignupPage"));
const PartnerDashboardPage = lazy(
  () => import("@/portal/pages/partnerDashboard/PartnerDashboardPage"),
);
const ProfilePage = lazy(() => import("@/portal/pages/profile/ProfilePage"));

const PageLoader = () => <Loader size={36} />;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "faqs",
        element: (
          <PageShell maxWidth="xl">
            <Suspense fallback={<PageLoader />}>
              <FaqsPage />
            </Suspense>
          </PageShell>
        ),
      },
      {
        path: "contact",
        element: (
          <PageShell maxWidth="xl">
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
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
                <Suspense fallback={<PageLoader />}>
                  <LoginPage />
                </Suspense>
              </PageShell>
            ),
          },
          {
            path: "signup",
            element: (
              <PageShell maxWidth="xl">
                <Suspense fallback={<PageLoader />}>
                  <SignupPage />
                </Suspense>
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
                <Suspense fallback={<PageLoader />}>
                  <PartnerDashboardPage />
                </Suspense>
              </PageShell>
            ),
          },
          {
            path: "partner/profile",
            element: (
              <PageShell maxWidth="xl">
                <Suspense fallback={<PageLoader />}>
                  <ProfilePage />
                </Suspense>
              </PageShell>
            ),
          },
          {
            path: "sandbox",
            element: (
              <PageShell maxWidth="xl">
                <Suspense fallback={<PageLoader />}>
                  <SandboxPage />
                </Suspense>
              </PageShell>
            ),
          },
          {
            path: "api-products",
            element: (
              <PageShell maxWidth="xl">
                <Suspense fallback={<PageLoader />}>
                  <ApiProductsPage />
                </Suspense>
              </PageShell>
            ),
          },
        ],
      },
    ],
  },
]);

