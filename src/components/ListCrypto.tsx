import { useGetTopTenCryptoQuery } from '../redux/services/cryptoApi';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const ListCrypto = () => {
  const { data, error, isLoading } = useGetTopTenCryptoQuery('');
  const navigate = useNavigate();
  const handleDetailCoin = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className="App container mt-4">
      <h1 className="text-center mb-4">
        Bem-vindo à sua Carteira de Criptomoedas
      </h1>
      <div className="crypto-wallet">
        {error ? (
          <div className="error-message">ocorreu um erro</div>
        ) : isLoading ? (
          <div className="loading-spinner">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div>
        ) : data ? (
          <>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th className="text-center">Moedas:</th>
                  <th className="text-center">Nome:</th>
                  <th className="text-center">Preço Atual (R$)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} onClick={() => handleDetailCoin(item.id)}>
                    <td className="text-center">
                      <img src={item.image} alt="" style={{ width: '50px' }} />
                    </td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">
                      {item.current_price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : null}
      </div>
      <Link to="/" className="mx-2">
        <Button variant="light">Voltar</Button>
      </Link>
    </div>
  );
};
