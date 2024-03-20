import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { formatBalance, formatChainAsNum } from '../utils';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const ConnectMetamask = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        refreshAccounts(accounts);
        window.ethereum.on('accountsChanged', refreshAccounts);
        window.ethereum.on('chainChanged', refreshChain);
      }
    };

    getProvider();
    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts);
      window.ethereum?.removeListener('chainChanged', refreshChain);
    };
  }, []);

  const updateWallet = async (accounts: any) => {
    const balance = formatBalance(
      await window.ethereum!.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      }),
    );
    const chainId = await window.ethereum!.request({
      method: 'eth_chainId',
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    updateWallet(accounts);
  };
  return (
    <>
      <Card className="m-3">
        <Card.Body className="App">
          <Card.Title>Informações da Carteira</Card.Title>
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
            <Button variant="primary" onClick={handleConnect}>
              Conectar MetaMask
            </Button>
          )}

          {wallet.accounts.length > 0 && (
            <>
              <div>Conta da Carteira: {wallet.accounts[0]}</div>
              <div>Saldo da Carteira: $ {wallet.balance} USD</div>
              <div>Hex ChainId: {wallet.chainId}</div>
              <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
            </>
          )}
        </Card.Body>
      </Card>
      <Link to="/list" className="mx-3">
        <Button variant="light">Voltar</Button>
      </Link>
    </>
  );
};
