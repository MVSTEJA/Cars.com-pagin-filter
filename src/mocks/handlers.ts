// src/mocks/handlers.js
import { rest } from "msw";

const FiatCar = {
  stockNumber: 41400,
  manufacturerName: "Fiat",
  modelName: "Marea",
  mileage: {
    number: 100141,
    unit: "km",
  },
  fuelType: "Diesel",
  color: "white",
  pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
};
const TeslaCar = {
  stockNumber: 75745,
  manufacturerName: "Tesla",
  modelName: "Roadster",
  color: "blue",
  mileage: {
    number: 100199,
    unit: "km",
  },
  fuelType: "Petrol",
  pictureUrl:
    "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
};

export const handlers = [
  rest.get(
    "https://auto1-mock-server.herokuapp.com/api/colors",
    (req, res, ctx) => {
      return res(
        ctx.json({
          colors: ["white"],
        })
      );
    }
  ),
  rest.get(
    "https://auto1-mock-server.herokuapp.com/api/manufacturers",
    (req, res, ctx) => {
      return res(
        ctx.json({
          manufacturers: [
            {
              name: "Fiat",
              models: [
                {
                  name: "Marea",
                },
              ],
            },
          ],
        })
      );
    }
  ),

  rest.get(
    "https://auto1-mock-server.herokuapp.com/api/cars",
    (req, res, ctx) => {
      const manufacturer = req.url.searchParams.get("manufacturer");
      const color = req.url.searchParams.get("color");
      if(manufacturer === '' && color === ''){
        return res(
          ctx.json({
            cars: [
              TeslaCar,
              FiatCar
            ],
            totalPageCount: 2,
            totalCarsCount: 16,
          })
        );  
      }

      if(manufacturer === 'Fiat' && color === 'white'){
        return res(
          ctx.json({
            cars: [
              FiatCar
            ],
            totalPageCount: 2,
            totalCarsCount: 16,
          })
        );  
      }

      return res(ctx.status(500));
      
    }
  ),
];
