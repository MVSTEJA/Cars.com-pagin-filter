import React from "react";
import { renderWithRouter, screen, act } from "test-utils";

import App from "../App";

test("landing on a bad page", () => {
  act(() => {
    renderWithRouter(<App />, { route: "/something-that-does-not-match" });
  });
  expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument();
});
