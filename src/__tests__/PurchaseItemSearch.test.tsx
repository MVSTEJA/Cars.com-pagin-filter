import React from "react";
import { waitFor, renderWithRouter, act, screen, fireEvent } from "test-utils";

import PurchaseItemSearch from "components/PurchaseItemSearch";

test("select white color", async () => {
  act(() => {
    renderWithRouter(<PurchaseItemSearch />);
  });

  await waitFor(()=>expect(screen.getByText(/All car colors/i)).toBeInTheDocument());
  fireEvent.click(screen.getByText(/All car colors/i))

  await waitFor(() =>expect(screen.getByText(/white/i)).toBeInTheDocument());
});


test("select Fiat model", async () => {
  act(() => {
    renderWithRouter(<PurchaseItemSearch />);
  });

  await waitFor(()=>expect(screen.getByText(/All manufacturers/i)).toBeInTheDocument());
  fireEvent.click(screen.getByText(/All manufacturers/i))

  await waitFor(() =>expect(screen.getByText(/Fiat/i)).toBeInTheDocument());
});
