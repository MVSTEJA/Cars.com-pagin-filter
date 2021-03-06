import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import useFetch from "use-http";
import Skeleton from "react-loading-skeleton";

import {
  PurchaseRouteContext,
  IPurchaseRouteContext,
} from "context/PurchaseRouteState";

import "./index.scss";

const PurchaseItemSearch: React.FunctionComponent<any> = () => {
  const { setDisplayCars } = useContext<IPurchaseRouteContext>(
    PurchaseRouteContext
  );

  const [colorFilters, setColorFilters] = useState<any[]>([]);
  const [manufacturerFilters, setManufacturerFilters] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<any>("");
  const [selectedManufacturer, setSelectedManufacturer] = useState<any>("");

  const { get, loading, response } = useFetch(
    // const { get, response } = useFetch(
    "https://auto1-mock-server.herokuapp.com/api"
  );

  async function initializeColors() {
    const { colors } = await get("/colors");
    if (response.ok) {
      setColorFilters(colors);
    }
  }

  async function initializeManufacturers() {
    const { manufacturers } = await get("/manufacturers");

    if (response.ok) {
      setManufacturerFilters(manufacturers);
    }
  }

  useEffect(() => {
    void initializeColors();
    void initializeManufacturers();
    void handleFilterClick();
  }, []);

  const colorDropdownSelect = (
    eventKey: string | null,
    e: React.SyntheticEvent<unknown, Event>
  ) => {
    setSelectedColor((e.target as Element).getAttribute("value"));
  };

  const manufacturerDropdownSelect = (
    eventKey: string | null,
    e: React.SyntheticEvent<unknown, Event>
  ) => {
    setSelectedManufacturer((e.target as Element).getAttribute("value"));
  };

  const handleFilterClick = () => {
    // setting manufacturer and color, only to local stage. As passing them to global would result in Filter button going useless.
    // Also resetting page number to '1'.
    setDisplayCars &&
      setDisplayCars({ selectedManufacturer, selectedColor, page: 1 });
  };

  return (
    <Card className="m-3">
      <Card.Body>
        <DropdownButton
          id="dropdown-basic-button"
          title={selectedColor || "All car colors"}
          variant="info"
          onSelect={colorDropdownSelect}
          menuAlign="right"
        >
          <Dropdown.Item eventKey="All car colors" value="">
            All car colors
          </Dropdown.Item>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {colorFilters.map((color) => (
                <Dropdown.Item
                  key={color}
                  eventKey={color}
                  value={color}
                  data-testid={color}
                >
                  {color}
                </Dropdown.Item>
              ))}
            </>
          )}
        </DropdownButton>

        <DropdownButton
          id="dropdown-basic-button"
          title={selectedManufacturer || "All manufacturers"}
          variant="info"
          className="mt-3"
          onSelect={manufacturerDropdownSelect}
        >
          <Dropdown.Item eventKey="All manufacturers" value="">
            All manufacturers
          </Dropdown.Item>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {manufacturerFilters.map((manufacturer) => (
                <Dropdown.Item
                  key={manufacturer.name}
                  eventKey={manufacturer.name}
                  value={manufacturer.name}
                  data-testid={manufacturer.name}
                >
                  {manufacturer.name}
                </Dropdown.Item>
              ))}
            </>
          )}
        </DropdownButton>

        <div className="d-flex mt-3 justify-content-end">
          <Button
            variant="lightOrange"
            onClick={handleFilterClick}
            className="col-5"
          >
            Filter
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PurchaseItemSearch;
