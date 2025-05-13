import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Tu peux aussi mettre un Spinner ici si tu veux
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
