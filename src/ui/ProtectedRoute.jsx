import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isLoading, isAuthenticated, navigate],
  );

  if (isLoading) return null;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
