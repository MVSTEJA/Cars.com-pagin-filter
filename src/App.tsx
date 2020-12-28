import React from "react";
import { BrowserRouter } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LinkContainer } from "react-router-bootstrap";

import AppRouter from "./router";

import "./styles/App.scss";

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <div className="mb-3">
      <Navbar className="border p-4">
        <img alt="cars.com" src="https://auto1-js-task-api--mufasa71.repl.co/images/logo.png" height="50"/>
        <Nav className="ml-auto">
          <LinkContainer to="/" exact>
            <Button variant="info">Purchase</Button>
          </LinkContainer>
          <LinkContainer to="/my-favorites">
            <Button variant="info" data-testid="my-favorites-page">
              My Favorites
            </Button>
          </LinkContainer>
          <LinkContainer to="/my-orders">
            <Button variant="info">My orders</Button>
          </LinkContainer>
          <LinkContainer to="/sell">
            <Button variant="info">Sell</Button>
          </LinkContainer>
        </Nav>
      </Navbar>
    </div>
    <AppRouter />
    {/* Footer Section */}
    <Container fluid className="border py-4 footer">
      <Row>
        <Col className="text-center">Cars.com 2018</Col>
      </Row>
    </Container>
  </BrowserRouter>
);

export default App;
