import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MetaMaskProvider } from '@metamask/sdk-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: 'Example React Dapp',
          url: window.location.href,
        },
        // Other options 
        
      }}
    >
      <RouterProvider router={router} />
    </MetaMaskProvider>
  </Provider>,
);
