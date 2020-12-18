import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Skeleton from 'react-loading-skeleton';

import {
  PurchaseRouteContext,
  IPurchaseRouteContext,
  ICarDetails,
} from "context/PurchaseRouteState";

import "./index.scss";
import CarDetails from "components/modals/CarDetails";

const PurchaseResults: React.FunctionComponent<any> = () => {
  const { isCarsLoading, cars } = useContext<IPurchaseRouteContext>(
    PurchaseRouteContext
  );
  const [modalShow, setModalShow] = useState<any>(false);
  const [carDetailsJSON, setCarDetailsJSON] = useState<Record<string, unknown>>(
    {}
  );

  const handleViewDetails = (carDetails: ICarDetails) => {
    setModalShow(true);
    setCarDetailsJSON(carDetails);
  };
  
  // console.log({isCarsLoading})
  return (
    <>
      <RowItem isCarsLoading={isCarsLoading} cars={isCarsLoading ? []:cars} handleViewDetails={handleViewDetails} />
      <CarDetails
        modalShow={modalShow}
        setModalShow={setModalShow}
        carDetailsJSON={carDetailsJSON}
      />
    </>
  );
};

export const RowItem: React.FunctionComponent<any> = ({
  cars,
  handleViewDetails,
  removeFromFavorites,
  isCarsLoading
}: {
  cars: [];
  handleViewDetails: (car: ICarDetails) => void;
  removeFromFavorites: (car: ICarDetails) => void;
  isCarsLoading: boolean;
}) => (
  <section>
    {isCarsLoading && 
    <Card className="d-flex flex-row mb-3">
    <Skeleton height={100} width={100} className="m-3"/>
    <Card.Body>
      <Card.Title data-testid="row-item">
        <Skeleton />
        <Skeleton />
      </Card.Title>
      <Card.Text>
        <Skeleton width={300}/>
      </Card.Text>
    </Card.Body>
  </Card>
   }
    {cars &&
      cars.length > 0 &&
      cars.map((car: ICarDetails) => (
        <Card className="d-flex flex-row mb-3" key={car.stockNumber}>
          <Card.Img variant="top" src={car.pictureUrl} className="m-3 border" />
          <Card.Body>
            <Card.Title data-testid="row-item">
              {car.manufacturerName} {car.modelName}
            </Card.Title>
            <Card.Text>
              Stock #: {car.stockNumber} - {car.mileage.number}{" "}
              {car.mileage.unit} - {car.fuelType} - {car.color}
            </Card.Text>
            {removeFromFavorites ? (
              <Button
                variant="link"
                className="p-0"
                onClick={() => removeFromFavorites(car)}
              >
                Remove from favorites
              </Button>
            ) : (
              <LinkContainer to="/" exact>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => handleViewDetails(car)}
                >
                  View details
                </Button>
              </LinkContainer>
            )}
          </Card.Body>
        </Card>
      ))}
  </section>
);

export default PurchaseResults;
