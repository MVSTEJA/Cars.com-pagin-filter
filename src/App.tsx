import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

import AppRouter from './router';

import { GlobalProvider } from './context/GlobalState';

import './styles/App.scss';

const App: React.FunctionComponent<any> = () => (
  <BrowserRouter>
    <div className="my-3">
      <h1 className="header">Cars.com</h1>
      <Navbar className="border p-4">
        <Nav className="ml-auto">
          <LinkContainer to="/" exact>
            <Button variant="info">Purchase</Button>
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
    <GlobalProvider>
      <AppRouter />
    </GlobalProvider>

  </BrowserRouter>
);

export default App;
