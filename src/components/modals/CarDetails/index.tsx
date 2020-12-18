import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CarDetails: React.FunctionComponent<any> = ({
  modalShow,
  setModalShow,
  carDetailsJSON,
}) => {
  const {
    color,
    fuelType,
    mileage = {},
    manufacturerName,
    modelName,
    stockNumber,
  } = carDetailsJSON;
  return (
    <Modal
      size="xl"
      show={modalShow}
      onHide={() => setModalShow(false)}
      aria-labelledby="car-details"
      centered
    >
      <Modal.Body className="d-flex justify-content-around">
        <section className="col-md-6">
          <h1 id="car-details" className="my-2 font-weight-bold">
            {manufacturerName} {modelName}
          </h1>
          <h4 className="my-4">
            Stock # {stockNumber} - {mileage.number} {mileage.unit} - {fuelType}{' '}
            - {color}
          </h4>
        </section>
        <article className="border col-md-4 p-4">
          <p>
            If you like this car, click the button and save it in your
            collection of favorite items.
          </p>
          <Button variant="lightOrange" className="float-right col-5">
            Save
          </Button>
        </article>
      </Modal.Body>
    </Modal>
  );
};
export default CarDetails;
