import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PurchaseResults from 'components/PurchaseResults';
import PurchaseItemSearch from 'components/PurchaseItemSearch';
import PurchasePagination from 'components/PurchasePagination';

import { PurchaseRouteContext, IPurchaseRouteContext } from 'context/PurchaseRouteState';

const Purchase: React.FunctionComponent<any> = () => {
  const { totalCarsCount } = useContext<IPurchaseRouteContext>(PurchaseRouteContext);
  return (
    <Row>
      <Col sm={4}>
        <PurchaseItemSearch />
      </Col>
      <Col className="p-3" sm={8}>
        <h2 className="pb-1 font-weight-bold">Available cars</h2>
        <h4 className="pb-4"> Showing 10 of {totalCarsCount} results</h4>
        <PurchaseResults />
        <PurchasePagination />
      </Col>
    </Row>
  );
};

export default Purchase;
