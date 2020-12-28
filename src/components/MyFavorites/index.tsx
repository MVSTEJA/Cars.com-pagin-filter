import React from "react";
import { RowItem } from "components/PurchaseResults";
import { useLocalStorage } from "hooks/UseLocalStorage";
import { ICarDetails } from "context/PurchaseRouteState";

export const notInlocalStorageDataCheck = (
  myFavorites: [],
  carDetailsJSON: ICarDetails
): never[] =>
  myFavorites.filter(
    (storeObj: ICarDetails) =>
      storeObj.stockNumber !== carDetailsJSON.stockNumber
  );


const MyFavoritesComponent: React.FunctionComponent = () => {
  const [myFavorites, setMyFavorites] = useLocalStorage("myFavorites", []);

  const removeFromFavorites = (itemToRemove: ICarDetails) => {
    if (notInlocalStorageDataCheck(myFavorites, itemToRemove).length > 0) {
      setMyFavorites(notInlocalStorageDataCheck(myFavorites, itemToRemove));
    }
  };

  return (
    <>
    <h1 className="text-center mb-5">My Favorites</h1>
    <div data-testid="my-favorites-landing-page"></div>
    <RowItem cars={myFavorites} removeFromFavorites={removeFromFavorites} />
    </>
  );
};

export default MyFavoritesComponent;
