import { Navigate, Route, Routes } from "react-router-dom";
import { GuestRoute, ProtectedRoute, RoleRedirect } from "./routes/ProtectedRoute";
import { AuthenticatedLayout } from "./components/layout/AuthenticatedLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PlaceholderPage from "./pages/PlaceholderPage";
import TodoPage from "./pages/TodoPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleRedirect />} />
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/tables" element={<PlaceholderPage title="Tables" />} />
          <Route path="/source" element={<PlaceholderPage title="Source" />} />
          <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
