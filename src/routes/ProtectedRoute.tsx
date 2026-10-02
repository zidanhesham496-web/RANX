import { RanxLoader } from "../components/RanxLoader";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types/database";

export function RoleRedirect() {
  const { session, profile, loading } = useAuth();
  if (loading) return <RanxLoader />;
  if (!session) return <Navigate to="/login" replace />;
  return <Navigate to={profile?.role === "admin" ? "/admin" : "/home"} replace />;
}

export function GuestRoute() {
  const { session, profile, loading } = useAuth();
  if (loading) return <RanxLoader />;
  if (session && profile) {
    return <Navigate to={profile.role === "admin" ? "/admin" : "/home"} replace />;
  }
  return <Outlet />;
}

export function ProtectedRoute({ role }: { role?: UserRole }) {
  const { session, profile, loading } = useAuth();

  if (loading) return <RanxLoader />;
  if (!session) return <Navigate to="/login" replace />;
  if (!profile) return <Navigate to="/login" replace />;
  if (role && profile.role !== role) {
    return <Navigate to={profile.role === "admin" ? "/admin" : "/home"} replace />;
  }

  return <Outlet />;
}