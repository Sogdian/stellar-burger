import {
    ConstructorPage,
    Feed,
    ForgotPassword,
    Login, NotFound404,
    Profile, ProfileOrders,
    Register,
    ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Route path='/' element={<ConstructorPage />} />
    <Route path='/feed' element={<Feed />} />
    <Route
      path='/login'
      element={
        <ProtectedRoute onlyUnAuth>
          <Login />
        </ProtectedRoute>
      }
    />
    <Route
      path='/register'
      element={
        <ProtectedRoute onlyUnAuth>
          <Register />
        </ProtectedRoute>
      }
    />
    <Route
      path='/forgot-password'
      element={
        <ProtectedRoute onlyUnAuth>
          <ForgotPassword />
        </ProtectedRoute>
      }
    />
    <Route
      path='/reset-password'
      element={
        <ProtectedRoute onlyUnAuth>
          <ResetPassword />
        </ProtectedRoute>
      }
    />
    <Route
      path='/profile'
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path='/profile/orders'
      element={
        <ProtectedRoute>
          <ProfileOrders />
        </ProtectedRoute>
      }
    />
    <Route path='*' element={<NotFound404 />} />
    <ConstructorPage />
  </div>
);

export default App;
