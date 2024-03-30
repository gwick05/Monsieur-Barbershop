import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

function ProtectedAuth({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated && !isLoading) navigate('/');
    },
    [isLoading, isAuthenticated, navigate],
  );

  if (isLoading) return null;
  if (!isAuthenticated) return children;
}

export default ProtectedAuth;
