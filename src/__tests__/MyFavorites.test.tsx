import React from "react";
import {
  waitFor,
  renderWithRouter,
  act,
  screen,
  fireEvent,
} from "test-utils";

import App from "App";

test("Adding cars to my favorites", async () => {
  act(() => {
    renderWithRouter(<App />);
  });

  await waitFor(() =>
    expect(screen.queryAllByText(/view details/i)[0]).toBeInTheDocument()
  );

  fireEvent.click(screen.queryAllByText(/view details/i)[0]);
  
  await waitFor(() =>
    expect(screen.getByTestId('car-details')).toBeInTheDocument()
  );

  const favoriteOptionToMatch = screen.getByTestId('car-manufacturer-model').innerHTML;

  fireEvent.click(screen.getByTestId('add-to-my-favorites'));

  await waitFor(() =>
    expect(screen.getByTestId('add-to-my-favorites')).toHaveAttribute('disabled')
  );
  
  await waitFor(() =>
    expect(screen.getByTestId('go-to-my-favorites')).toBeInTheDocument()
  );

  act(()=>{
    fireEvent.click(screen.getByTestId('go-to-my-favorites'));
  })

  const submitButton = screen.queryByTestId('add-to-my-favorites')
  expect(submitButton).not.toBeInTheDocument()

  await waitFor(() =>
    expect(screen.getByTestId('my-favorites-landing-page')).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(screen.getByTestId('row-item').innerHTML).toBe(favoriteOptionToMatch)
  );
  
});