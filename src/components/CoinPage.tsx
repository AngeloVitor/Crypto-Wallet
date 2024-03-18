import { useParams } from 'react-router-dom';
import {
  useGetTopTenCryptoQuery,
  // useGetCryptoGraphQuery,
} from '../redux/services/cryptoApi';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col, Image } from 'react-bootstrap';

export const CryptoDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetTopTenCryptoQuery('');
  // TODO: fazer grafico da moeda
  // const { data: graphData, error: graphError, isLoading: GraphIsLoading } = useGetCryptoGraphQuery(id??"");

  // Verifica se os dados estão carregando ou se ocorreu um erro
  if (isLoading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Carregando...</span>
          </Spinner>
        </Row>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <div className="error-message">
        Oh não, ocorreu um erro ou a criptomoeda não foi encontrada
      </div>
    );
  }

  // Encontrar a criptomoeda selecionada nos dados
  const selectedCrypto = data.find((crypto) => crypto.id === id);

  if (!selectedCrypto) {
    return <div className="error-message">Criptomoeda não encontrada</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Detalhes da Criptomoeda</h2>
          <div className="text-center">
            <Image
              src={selectedCrypto.image}
              alt={selectedCrypto.name}
              style={{ width: '100px' }}
              rounded
            />
            <h3>{selectedCrypto.name}</h3>
          </div>
          <Row>
            <Col>
              <p>
                Preço Atual:{' '}
                {selectedCrypto.current_price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p>
                Variação de Preço nas Últimas 24 Horas:{' '}
                {selectedCrypto.price_change_24h.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p>
                Alta nas Últimas 24 Horas:{' '}
                {selectedCrypto.high_24h.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p>
                Baixa nas Últimas 24 Horas:{' '}
                {selectedCrypto.low_24h.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p>
                Volume de Mercado:{' '}
                {selectedCrypto.total_volume.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              {/* Adicione aqui o gráfico de preço, se possível */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
