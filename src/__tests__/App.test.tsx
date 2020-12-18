import React from "react";
import {
  waitFor,
  renderWithRouter,
  act,
  screen,
  fireEvent,
} from "test-utils";

import App from "App";

test("full app rendering/navigating", async () => {
  act(() => {
    renderWithRouter(<App />);
  });

  await waitFor(() =>
    expect(screen.getByText(/Available cars/i)).toBeInTheDocument()
  );
});

test("landing on sell page", async () => {
  act(() => {
    renderWithRouter(<App />, { route: "/sell" });
  });
  await waitFor(() =>
    expect(screen.getByTestId("sell-page")).toBeInTheDocument()
  );
});

test("select white color and Fiat model and click filter, And result list should display only fiat car row item", async () => {
  act(() => {
    renderWithRouter(<App />);
  });

  await waitFor(() => expect(screen.getByText(/tesla/i)).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText(/fiat/i)).toBeInTheDocument());

  await waitFor(() =>
    expect(screen.getByText(/All car colors/i)).toBeInTheDocument()
  );
  fireEvent.click(screen.getByText(/All car colors/i));

  await waitFor(() => expect(screen.getByTestId("white")).toBeInTheDocument());
  fireEvent.click(screen.getByTestId("white"));

  await waitFor(() =>
    expect(screen.getByText(/All manufacturers/i)).toBeInTheDocument()
  );
  fireEvent.click(screen.getByText(/All manufacturers/i));

  await waitFor(() => expect(screen.getByTestId('Fiat')).toBeInTheDocument());
  fireEvent.click(screen.getByTestId('Fiat'));

  act(() => {
    fireEvent.click(screen.getByText(/Filter/i));
  });
  const teslaRowItem = screen.queryByText(/100199/i);
  const fiatRowItem = screen.queryByText(/100141/i);

  await waitFor(() => expect(fiatRowItem).toBeInTheDocument());
  await waitFor(() => expect(teslaRowItem).not.toBeInTheDocument());
});
