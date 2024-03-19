import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Bem-vindo à Wallet Crypto</h2>
          <p>
            Aqui na Wallet Crypto, nós fornecemos uma plataforma segura e fácil de usar para gerenciar suas criptomoedas.
          </p>
          <p>
            Com nossa carteira de criptomoedas, você pode armazenar, enviar e receber suas moedas digitais de forma conveniente e segura.
          </p>
          <p>
            Além disso, oferecemos diversas funcionalidades avançadas para ajudá-lo a acompanhar o mercado e tomar decisões informadas sobre seus investimentos.
          </p>
          <Link to="/list">
            <Button variant="primary">
              Ir para Lista de Cryptos
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
