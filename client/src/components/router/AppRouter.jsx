import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import { adminRoutes, publicRoutes } from '../../routes';
import { SHOP_ROUTE } from '../../utils/consts';
import ProtectedRoute from '../../protectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {adminRoutes.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<ProtectedRoute element={<item.element />} />}
          />
        ))}
        {publicRoutes.map((item) => (
          <Route key={item.path} path={item.path} element={<item.element />} />
        ))}
        <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
