import Admin from './pages/admin/Admin';
import Auth from './pages/auth/Auth';
import Basket from './pages/Basket';
import DevicePage from './components/devicePage/DevicePage';
import Shop from './pages/shop/Shop';

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utils/consts';

export const adminRoutes = [{ path: ADMIN_ROUTE, element: Admin }];

export const publicRoutes = [
  { path: SHOP_ROUTE, element: Shop },
  { path: LOGIN_ROUTE, element: Auth },
  { path: REGISTRATION_ROUTE, element: Auth },
  { path: DEVICE_ROUTE + '/:id', element: DevicePage },
  { path: BASKET_ROUTE, element: Basket },
];
