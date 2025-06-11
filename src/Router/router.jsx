import { createBrowserRouter } from 'react-router-dom';
import Template from '../Template';
import Tablemodel from '../Tablemodel';
import AnimalList from '../AnimalList';
import App from '../App';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/table',
    element: <Tablemodel />,
  },
]);

export default Router;