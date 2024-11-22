import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from './utils/consts';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const isAdmin = currentUser.role.includes('ADMIN');

    if (!isAdmin) {
      navigate(SHOP_ROUTE, { replace: true });
    }
  }, [currentUser, navigate]);

  return element;
};

export default ProtectedRoute;
