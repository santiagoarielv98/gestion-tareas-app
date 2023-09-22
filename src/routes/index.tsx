import { createBrowserRouter } from 'react-router-dom';
import mainRoutes from './main';

const routes = createBrowserRouter([
  {
    children: [mainRoutes],
  },
]);

export default routes;
