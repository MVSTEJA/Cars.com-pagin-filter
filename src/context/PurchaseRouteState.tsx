import React, { createContext, useReducer, useEffect, useState } from "react";
import useFetch, { CachePolicies } from "use-http";
import Toaster from "components/common/Toaster";

import PurchaseReducer, {
  IReducerAction,
  EOnChangeHandler,
} from "./PurchaseReducer";

export type ICarDetails = {
  stockNumber?: number;
  pictureUrl?: string;
  manufacturerName?: string;
  modelName?: string;
  mileage?: {
    number?: number;
    unit?: string;
  };
  fuelType?: string;
  color?: string;
};

export interface IPurchaseRouteContext {
  isCarsLoading?: boolean;
  cars?: Array<ICarDetails>| [];
  selectedManufacturer?: string;
  selectedColor?: string;
  page?: string;
  totalPageCount?: number;
  totalCarsCount?: number;
  setCarsLoading?: (isCarsLoading: boolean) => void;
  setDisplayCars?: (value: Record<string, unknown>) => void;
  setPageNo?: (pageNo: string) => void;
}

const initialState: IPurchaseRouteContext = {
  cars: [],
  selectedManufacturer: "",
  selectedColor: "",
  page: "1",
  totalPageCount: 0,
  totalCarsCount: 0,
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
export const PurchaseRouteContext: React.Context<IPurchaseRouteContext> = createContext(
  initialState
);

export const PurchaseRouteProvider: React.FunctionComponent = ({
  children,
}) => {
  const [state, dispatch] = useReducer<
    React.Reducer<IPurchaseRouteContext, IReducerAction>
  >(PurchaseReducer, initialState);

  const { get, loading, response, error } = useFetch(
    "https://auto1-mock-server.herokuapp.com/api",
    {
      cachePolicy: CachePolicies.NETWORK_ONLY,
    }
  );

  const [showToaster, setShowErrorToaster] = useState(false);

  const setCarsLoading = (isCarsLoading = false) => {
    dispatch({
      type: EOnChangeHandler.IS_CARS_LOADING,
      isCarsLoading,
    });
  };

  useEffect(() => {
    setCarsLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (error) {
      setShowErrorToaster(true);
      dispatch({ type: EOnChangeHandler.CARS_DISPLAY_LIST, cars: [] });
    }
  }, [error]);

  const setDisplayCars = async ({
    selectedManufacturer = state.selectedManufacturer,
    selectedColor = state.selectedColor,
    page = state.page,
  }) => {
    try {
      await get(
        `/cars?manufacturer=${selectedManufacturer}&color=${selectedColor}&sort=asc&page=${page}`
      );

      const { cars, totalPageCount, totalCarsCount } = response.data;

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
      } else {
        setCarsLoading(false);
        setShowErrorToaster(true);
      }
    } catch (error) {
      setCarsLoading(false);
      setShowErrorToaster(true);
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
    <PurchaseRouteContext.Provider
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
      <Toaster
        show={showToaster}
        setShow={setShowErrorToaster}
        hasError={true}
        message={error && error.message}
      />
      {children}
    </PurchaseRouteContext.Provider>
  );
};
