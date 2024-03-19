import { createBrowserRouter } from 'react-router-dom';
import { CryptoDetails } from '../components/CoinPage';
import { ListCrypto } from '../components/ListCrypto';
import { App } from '../App';

export const router = createBrowserRouter([
  { element: <App/>,
    children: [
      {
        path: '/',
        element: <ListCrypto />,
        index: true,
      },
      {
        path: '/:id',
        element: <CryptoDetails />,
      },
    ],
  },
]);
