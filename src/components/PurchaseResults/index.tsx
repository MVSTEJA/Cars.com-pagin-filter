import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Skeleton from "react-loading-skeleton";

import {
  PurchaseRouteContext,
  IPurchaseRouteContext,
  ICarDetails,
} from "context/PurchaseRouteState";

import "./index.scss";
import CarDetails from "components/modals/CarDetails";

const PurchaseResults: React.FunctionComponent = () => {
  const {
    isCarsLoading,
    cars = [],
    totalCarsCount,
  } = useContext<IPurchaseRouteContext>(PurchaseRouteContext);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [carDetailsJSON, setCarDetailsJSON] = useState<ICarDetails>({});

  const handleViewDetails = (carDetails: ICarDetails): void => {
    setModalShow(true);
    setCarDetailsJSON(carDetails);
  };
  return (
    <>
      <h2 className="pb-1 font-weight-bold">Available cars</h2>
      {!isCarsLoading && cars.length > 0 && (
        <h4 className="pb-4"> Showing 10 of {totalCarsCount} results</h4>
      )}
      <RowItem
        isCarsLoading={isCarsLoading}
        cars={cars}
        handleViewDetails={handleViewDetails}
      />
      <CarDetails
        modalShow={modalShow}
        setModalShow={setModalShow}
        carDetailsJSON={carDetailsJSON}
      />
    </>
  );
};

interface IRowItemProps {
  cars: Array<ICarDetails> | [];
  handleViewDetails?: (car: ICarDetails) => void;
  removeFromFavorites?: (car: ICarDetails) => void;
  isCarsLoading?: boolean;
}

export const RowItem: React.FunctionComponent<IRowItemProps> = ({
  cars = [],
  handleViewDetails,
  removeFromFavorites,
  isCarsLoading,
}) => (
  <section>
    {isCarsLoading ? (
      <Card className="d-flex flex-row mb-3">
        <Skeleton height={100} width={100} className="m-3" />
        <Card.Body>
          <Card.Title data-testid="row-item">
            <Skeleton />
            <Skeleton />
          </Card.Title>
          <Card.Text>
            <Skeleton width={300} />
          </Card.Text>
        </Card.Body>
      </Card>
    ):
    (
      <>
      {cars.length > 0 ? (
        cars.map((car: ICarDetails) => (
          <Card className="d-flex flex-row mb-3" key={car.stockNumber}>
            <Card.Img variant="top" src={car.pictureUrl} className="m-3 border" />
            <Card.Body>
              <Card.Title data-testid="row-item">
                {car.manufacturerName} {car.modelName}
              </Card.Title>
              <Card.Text>
                Stock #: {car.stockNumber} - {car?.mileage?.number}{" "}
                {car?.mileage?.unit} - {car.fuelType} - {car.color}
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
                    onClick={() => handleViewDetails && handleViewDetails(car)}
                  >
                    View details
                  </Button>
                </LinkContainer>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <h3 className="text-center my-5">No cars to show.</h3>
      )}
      </>
    )
  }
  </section>
);

export default PurchaseResults;
