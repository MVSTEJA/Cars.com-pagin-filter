import { cleanup, render, queries, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

const customRender = (ui: ReactElement, options?: Record<string, unknown>): RenderResult => render(ui, { queries, ...options });

const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return customRender(ui, { wrapper: BrowserRouter });
};

afterEach(cleanup)

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, renderWithRouter };
