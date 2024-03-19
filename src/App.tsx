import { useSDK } from '@metamask/sdk-react';
import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
const tokenSymbol = 'TUT';
const tokenDecimals = 18;
const tokenImage = 'http://placekitten.com/200/300';

export const App = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect({});
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn('failed to connect..', err);
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" >
        <Navbar.Brand href="#" className='mx-3'>Wallet Crypto</Navbar.Brand >
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-3' />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="ml-auto justify-content-end"
        >
          <Nav className="ml-auto mx-3">
            <Nav.Link onClick={connect}>
              {account ? `Conta conectada: ${account}` : 'conectar'}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <div className="container mt-3">
        {connected && (
          <div>
            <>
              {chainId && <p>Rede conectada: {chainId}</p>}
              {account && <p>Conta conectada: {account}</p>}
            </>
          </div>
        )} */}
      <Outlet />
    </div>
  );
};
