import type { RouteObject } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Layout from '../../layouts/main/Layout';

const mainRoutes: RouteObject = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
  ],
};

export default mainRoutes;
