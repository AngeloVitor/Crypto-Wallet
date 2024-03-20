import { useParams, Link } from 'react-router-dom';
import {
  useGetTopTenCryptoQuery,
  useGetCryptoGraphQuery,
} from '../redux/services/cryptoApi';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col, Image, Table, Button } from 'react-bootstrap';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

export const CryptoDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetTopTenCryptoQuery('');

  const {
    data: graphaAPIData,
    // error: graphError,
    // isLoading: GraphIsLoading,
  } = useGetCryptoGraphQuery(id ?? '');
  const graphDataFormatted = useMemo(() => {
    return {
      labels:
        graphaAPIData?.prices.map((item) => new Date(item[0]).toDateString()) ||
        [],
      data: graphaAPIData?.prices.map((item) => item[1]) || [],
    };
  }, [graphaAPIData?.prices]);

  const graphData = useMemo(() => {
    return {
      labels: graphDataFormatted.labels,
      datasets: [
        {
          label: 'My First Dataset',
          data: graphDataFormatted.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  }, [graphDataFormatted]);

  // Verifica se os dados estão carregando ou se ocorreu um erro
  if (isLoading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </Row>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <div className="error-message">
        Ocorreu um erro ou a criptomoeda não foi encontrada
      </div>
    );
  }

  // Encontrar a criptomoeda selecionada nos dados
  const selectedCrypto = data.find((crypto) => crypto.id === id);

  if (!selectedCrypto) {
    return <div className="error-message">Criptomoeda não encontrada</div>;
  }

  return (
    <Container className="my-5">
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
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>Preço Atual:</td>
                <td>
                  {selectedCrypto.current_price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <td>Capitalização de Mercado:</td>
                <td>
                  {selectedCrypto.market_cap.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <td>Fornecimento Total:</td>
                <td>
                  {selectedCrypto.total_supply.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <td>Volume Total:</td>
                <td>
                  {selectedCrypto.total_volume.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <td>Variação de Preço nas Últimas 24 Horas:</td>
                <td>
                  {selectedCrypto.price_change_24h.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <td>Variação de Preço nas Últimas 24 Horas:</td>
                <td>
                  {selectedCrypto.price_change_24h.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <td>Alta nas Últimas 24 Horas:</td>
                <td>
                  {selectedCrypto.high_24h.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <td>Baixa nas Últimas 24 Horas:</td>
                <td>
                  {selectedCrypto.low_24h.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
              <tr>
                <td>Volume de Mercado:</td>
                <td>
                  {selectedCrypto.total_volume.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
            </tbody>
          </Table>
          {/* Adicione aqui o gráfico de preço, se possível */}
        </Col>
      </Row>
      <Container
        className="d-flex"
        style={{ height: '500px', background: 'white', margin: '20px' }}
      >
        <Line
          options={{
            maintainAspectRatio: false,
            aspectRatio: 1,
            responsive: true,
          }}
          data={graphData}
        />
      </Container>
      <Link to="/list" className="mx-2">
        <Button variant="light">Voltar</Button>
      </Link>
    </Container>
  );
};
