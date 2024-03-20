import { createBrowserRouter } from 'react-router-dom';
import { CryptoDetails } from '../components/CoinPage';
import { ListCrypto } from '../components/ListCrypto';
import { App } from '../App';
import { Welcome } from '../components/Welcome';
import { ConnectMetamask } from '../components/ConnectMetamask';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Welcome />,
        index: true,
      },
      {
        path: '/metamask',
        element: <ConnectMetamask />,        
      },
      {
        path: '/list',
        element: <ListCrypto />,        
      },
      {
        path: '/:id',
        element: <CryptoDetails />,
      },
    ],
  },
]);
