import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layout/DefaultLayout';
import { Home } from './view/pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route path="/test" element={<div>Página dois</div>} />
      </Route>
    </Routes>
  );
}
