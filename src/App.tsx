import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { GuestRoute, ProtectedRoute, RoleRedirect } from "./routes/ProtectedRoute";
import { AuthenticatedLayout } from "./components/layout/AuthenticatedLayout";
import { RanxLoader } from "./components/RanxLoader";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TodoPage = lazy(() => import("./pages/TodoPage"));
const SourcePage = lazy(() => import("./pages/SourcePage"));
const PlaceholderPage = lazy(() => import("./pages/PlaceholderPage"));
const TablesPage = lazy(() => import("./pages/TablesPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));

export default function App() {
  return (
    <Suspense fallback={<RanxLoader />}>
      <Routes>
        <Route path="/" element={<RoleRedirect />} />
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/source" element={<SourcePage />} />
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
