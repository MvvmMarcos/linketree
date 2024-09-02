import {createBrowserRouter} from 'react-router-dom';

import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Networks from './pages/Networks/Networks';
import Login from './pages/Login/Login';
import Error from './pages/Error/Error';
//rotas privadas
import {Private} from './routes/Private';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/admin',
    element:<Private><Admin/></Private>
  },
  {
    path:'/admin/networks',
    element:<Private><Networks/></Private>
  },{
    path:'*',
    element:<Error/>
  }
])
export {router};
