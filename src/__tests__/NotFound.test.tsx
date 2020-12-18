import React from "react";
import { waitFor, renderWithRouter, screen, act } from "utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import App from "../App";

test("full app rendering/navigating", async () => {
  act(() => {
    renderWithRouter(<App />);
  });

  await waitFor(() =>
    expect(screen.getByText(/Available cars/i)).toBeInTheDocument()
  );
});

// test("landing on a bad page", async () => {
//   act(() => {
//     renderWithRouter(<App />, { route: "/something-that-does-not-match" });
//   });
//   await waitFor(() =>
//     expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument()
//   );
// });

// test("landing on sell page", async () => {
//   act(() => {
//     renderWithRouter(<App />, { route: "/sell" });
//   });
//   await waitFor(() =>
//     expect(screen.getByTestId("sell-page")).toBeInTheDocument()
//   );
//   // expect(screen.getByTestId("sell-page")).toBeInTheDocument();
// });
