import React from "react";
import { waitFor, renderWithRouter, act, screen } from "utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import PurchaseItemSearch from "components/PurchaseItemSearch";

test("full PurchaseItemSearch rendering/navigating", async () => {
  act(() => {
    renderWithRouter(<PurchaseItemSearch />);
  });

  await waitFor(()=>expect(screen.getByText(/All car colors/i)).toBeInTheDocument());
  await waitFor(() =>expect(screen.getByText(/All manufacturers/i)).toBeInTheDocument());
});
