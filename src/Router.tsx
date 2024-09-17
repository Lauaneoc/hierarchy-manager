// src/Router.tsx
import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layout/DefaultLayout';
import { Home } from './view/pages/Home';
import { Login } from './view/pages/Login';
import { AuthProvider } from './@shared/contexts/AuthContext';
import { PrivateRoute } from './PrivateRoute';


export function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={ <DefaultLayout />} />}>
          <Route
            index
            element={<PrivateRoute element={<Home />} />}
          />
          <Route path="/test" element={<PrivateRoute element={<div>Página dois</div>} />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
