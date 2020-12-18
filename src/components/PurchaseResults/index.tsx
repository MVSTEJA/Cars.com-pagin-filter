import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { GlobalContext, IGlobalContext, ICarDetails } from '../../context/GlobalState';

import './index.scss';
import CarDetails from '../modals/CarDetails';

const PurchaseResults: React.FunctionComponent<any> = () => {
  const { isCarsLoading, cars } = useContext<IGlobalContext>(GlobalContext);
  const [modalShow, setModalShow] = useState<any>(false);
  const [carDetailsJSON, setCarDetailsJSON] = useState<any>({});

  const handleViewDetails = (carDetails: ICarDetails) => {
    setModalShow(true);
    setCarDetailsJSON(carDetails);
  };
  console.log({ isCarsLoading, cars });
  return (
    <>
      <section>
        {cars && cars.length > 0 && cars.map((car) => (
          <Card className="d-flex flex-row mb-3" key={car.stockNumber}>
            <Card.Img
              variant="top"
              src={car.pictureUrl}
              className="m-3 border"
            />
            <Card.Body>
              <Card.Title>
                {car.manufacturerName} {car.modelName}
              </Card.Title>
              <Card.Text>
                Stock #: {car.stockNumber} - {car.mileage.number}{' '}
                {car.mileage.unit} - {car.fuelType} - {car.color}
              </Card.Text>
              <LinkContainer to="/" exact>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => handleViewDetails(car)}
                >
                  View details
                </Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        ))}
      </section>

      <CarDetails
        modalShow={modalShow}
        setModalShow={setModalShow}
        carDetailsJSON={carDetailsJSON}
      />
    </>
  );
};

export default PurchaseResults;
