import { createHashRouter } from 'react-router-dom';
import mainRoutes from './main';

const routes = createHashRouter([
  {
    children: [mainRoutes]
  }
]);

export default routes;
