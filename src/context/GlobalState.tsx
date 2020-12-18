import React, { createContext, useReducer } from "react";
import useFetch from "use-http";

import AppReducer, { IReducerAction, EOnChangeHandler } from "./AppReducer";

export type ICarDetails = {
  stockNumber: number;
  pictureUrl: string;
  manufacturerName: string;
  modelName: string;
  mileage: {
    number: number;
    unit: string;
  };
  fuelType: string;
  color: string;
};

export interface IGlobalContext {
  isCarsLoading?: boolean;
  cars?: Array<ICarDetails>;
  selectedManufacturer?: string;
  selectedColor?: string;
  page?: string;
  totalPageCount?: number;
  totalCarsCount?: number;
  setCarsLoading?: (isCarsLoading: boolean) => void;
  setDisplayCars?: (value: Record<string, unknown>) => void;
  setPageNo?: (pageNo: string) => void;
}

const initialState: IGlobalContext = {
  cars: [],
  selectedManufacturer: "",
  selectedColor: "",
  page: "1",
  totalPageCount: 0,
  totalCarsCount: 0,
  isCarsLoading: false,
  setCarsLoading: () => {
    return null;
  },
  setDisplayCars: () => {
    return null;
  },
  setPageNo: () => {
    return null;
  },
};
export const GlobalContext: React.Context<IGlobalContext> = createContext(
  initialState
);

export const GlobalProvider: React.FunctionComponent<any> = ({ children }) => {
  const { get, response } = useFetch(
    "https://auto1-mock-server.herokuapp.com/api"
  );
  const [state, dispatch] = useReducer<
    React.Reducer<IGlobalContext, IReducerAction>
  >(AppReducer, initialState);

  const setCarsLoading = (isCarsLoading: boolean) => {
    const loadingAction: IReducerAction = {
      type: EOnChangeHandler.IS_CARS_LOADING,
      isCarsLoading,
    };
    dispatch({ ...loadingAction });
  };

  /**
   *
   *
   * @param {*} {
   *     selectedManufacturer = state.selectedManufacturer,
   *     selectedColor = state.selectedColor,
   *     page = state.page,
   *   }
   */
  const setDisplayCars = async ({
    selectedManufacturer = state.selectedManufacturer,
    selectedColor = state.selectedColor,
    page = state.page,
  }) => {
    try {
      const { cars, totalPageCount, totalCarsCount } = await get(
        `/cars?manufacturer=${selectedManufacturer}&color=${selectedColor}&sort=asc&page=${page}`
      );
      console.log("cars>>>>>", cars);

      const displayListObject: IReducerAction = {
        type: EOnChangeHandler.CARS_DISPLAY_LIST,
        cars,
        totalPageCount,
        selectedManufacturer,
        selectedColor,
        totalCarsCount,
      };
      if (response.ok) {
        dispatch({ ...displayListObject });
      }
    } catch (error) {
      console.error("error--->", error);
    }
  };

  const setPageNo = (pageNo: string) => {
    const pageNoObject: IReducerAction = {
      type: EOnChangeHandler.SET_PAGE_NUMBER,
      page: pageNo,
    };
    dispatch({ ...pageNoObject });
  };
  return (
    <GlobalContext.Provider
      value={{
        cars: state.cars,
        isCarsLoading: state.isCarsLoading,
        setCarsLoading,
        setDisplayCars,
        setPageNo,
        page: state.page,
        totalPageCount: state.totalPageCount,
        totalCarsCount: state.totalCarsCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
