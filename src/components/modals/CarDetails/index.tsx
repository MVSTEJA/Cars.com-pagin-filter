import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import { useLocalStorage } from "hooks/UseLocalStorage";

export const inlocalStorageDataCheck = (
  myFavorites: [],
  carDetailsJSON: Record<string, any>
): never[] =>
  myFavorites.filter(
    (storeObj: Record<string, any>) =>
      storeObj.stockNumber === carDetailsJSON.stockNumber
  );

const CarDetails: React.FunctionComponent<any> = ({
  modalShow,
  setModalShow,
  carDetailsJSON,
}: {
  modalShow: boolean;
  setModalShow: (arg0: boolean) => void;
  carDetailsJSON: Record<string, any>;
}) => {
  const [myFavorites, setMyFavorites] = useLocalStorage("myFavorites", []);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(
      inlocalStorageDataCheck(myFavorites, carDetailsJSON).length > 0
    );
  }, [carDetailsJSON.stockNumber]);

  const handleFavorites = () => {
    if (inlocalStorageDataCheck(myFavorites, carDetailsJSON).length === 0) {
      myFavorites.push(carDetailsJSON);
      setMyFavorites(myFavorites);
      setIsInFavorites(true);
    }
  };

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
      data-testid="car-details"
    >
      <Modal.Body className="d-flex justify-content-around">
        <section className="col-md-6">
          <h1
            id="car-details"
            data-testid="car-manufacturer-model"
            className="my-2 font-weight-bold"
          >
            {manufacturerName} {modelName}
          </h1>
          <h4 className="my-4">
            Stock # {stockNumber} - {mileage.number} {mileage.unit} - {fuelType}{" "}
            - {color}
          </h4>
        </section>
        <article className="border col-md-4 p-4">
          {isInFavorites ? (
            <p>Car already added to favorites.</p>
          ) : (
            <p>
              If you like this car, click the button and save it in your
              collection of favorite items.
            </p>
          )}
          {isInFavorites && (
            <LinkContainer to="/my-favorites" exact>
              <Button
                variant="link"
                className="px-0"
                onClick={handleFavorites}
                data-testid="go-to-my-favorites"
              >
                Go to Favorites
              </Button>
            </LinkContainer>
          )}
          <Button
            variant="lightOrange"
            className="float-right col-5"
            onClick={handleFavorites}
            disabled={isInFavorites}
            data-testid="add-to-my-favorites"
          >
            Save
          </Button>
        </article>
      </Modal.Body>
    </Modal>
  );
};
export default CarDetails;
