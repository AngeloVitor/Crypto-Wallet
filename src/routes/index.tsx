import { createBrowserRouter } from 'react-router-dom';
import { CryptoDetails } from '../components/CoinPage';
import { ListCrypto } from '../components/ListCrypto';

export const router = createBrowserRouter([
  {
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
