import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layout';
import { PublicRoutes } from './PublicRoute';
// import { PrivateRoutes } from './PrivateRoute';

import {
  Dashboard,
  ServicePolicy,
  NoFound,
  ForgotPassword,
  Login,
  Register,
  Products,
  Category,
  Provider,
  Brand,
  History,
  Notification,
  AddProducts,
  SubtractProducts,
  ChangePassword,
  Test,
} from '@/pages';

export function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route
            path='login'
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path='register'
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route path='test' element={<Test />} />
          <Route
            path='forgot-password'
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path='changePassword'
            element={
              <PublicRoutes>
                <ChangePassword />
              </PublicRoutes>
            }
          />
          <Route path='service-policy' element={<ServicePolicy />} />
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='product' element={<Products />} />

          <Route path='product/addProducts/' element={<AddProducts />} />
          <Route
            path='product/subtractProducts/'
            element={<SubtractProducts />}
          />

          <Route path='notification' element={<Notification />} />
          <Route path='provider' element={<Provider />} />
          <Route path='category' element={<Category />} />
          <Route path='brand' element={<Brand />} />
          <Route path='history' element={<History />} />
        </Route>
        <Route path='*' element={<NoFound />} />
      </Routes>
    </BrowserRouter>
  );
}
