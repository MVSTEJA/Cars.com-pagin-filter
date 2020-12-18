import { IPurchaseRouteContext } from './PurchaseRouteState';

export enum EOnChangeHandler {
  IS_CARS_LOADING = 'IS_CARS_LOADING',
  CARS_DISPLAY_LIST = 'CARS_DISPLAY_LIST',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
}
export interface IReducerAction extends IPurchaseRouteContext {
  type: EOnChangeHandler;
}

const PurchaseReducer = (state: IPurchaseRouteContext, action: IReducerAction) => {
  switch (action.type) {
    case EOnChangeHandler.IS_CARS_LOADING:
      return {
        ...state,
        isCarsLoading: action.isCarsLoading,
      };
    case EOnChangeHandler.CARS_DISPLAY_LIST:
      return {
        ...state,
        cars: action.cars,
        totalPageCount: action.totalPageCount,
        selectedManufacturer: action.selectedManufacturer,
        selectedColor: action.selectedColor,
        totalCarsCount: action.totalCarsCount,
      };
    case EOnChangeHandler.SET_PAGE_NUMBER:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};

export default PurchaseReducer;
