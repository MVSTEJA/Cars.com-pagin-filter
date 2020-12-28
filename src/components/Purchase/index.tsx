import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PurchaseResults from 'components/PurchaseResults';
import PurchaseItemSearch from 'components/PurchaseItemSearch';
import PurchasePagination from 'components/PurchasePagination';

const Purchase: React.FunctionComponent = () => {
  return (
    <Row>
      <Col sm={4}>
        <PurchaseItemSearch />
      </Col>
      <Col className="p-3" sm={8}>
        <PurchaseResults />
        <PurchasePagination />
      </Col>
    </Row>
  );
};

export default Purchase;
