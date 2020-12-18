import { render, queries } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const customRender = (ui, options) => render(ui, { queries, ...options });

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return customRender(ui, { wrapper: BrowserRouter });
};
// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, renderWithRouter };
