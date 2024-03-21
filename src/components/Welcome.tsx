import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Bem-vindo à Wallet Crypto</h2>
          <p>
            Aqui na Wallet Crypto, nós fornecemos uma plataforma segura e fácil
            de usar para gerenciar suas criptomoedas.
          </p>
          <p>
            Com nossa carteira de criptomoedas, você pode armazenar, enviar e
            receber suas moedas digitais de forma conveniente e segura.
          </p>
          <p>
            Além disso, Você pode seguir para a pagina que lista as top 10
            criptomoedas por capitalização de mercado como também seguir para a
            pagina de se conectar com a MetaMask nos botões abaixo.
          </p>
          <div className='d-flex'>
            <Link to="/list">
              <Button variant="primary">Ir para Lista de Cryptos</Button>
            </Link>
            <Link to="/metamask" className="mx-2">
              <Button variant="primary">Conectar com a Metamask</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
