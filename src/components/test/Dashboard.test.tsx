import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Dashboard from "../dashboard/Dashboard";
import "@testing-library/jest-dom/extend-expect";

describe("Dashboard component", () => {
  afterEach(cleanup);

  it("renders with the correct title and components", () => {
    render(<Dashboard />);
    // Check for the AppBar title
    expect(screen.getByText("Onyx Capital - ReactJs Test")).toBeInTheDocument();
  });
  it("renders the table with correct headers", () => {
    render(<Dashboard />);
    const headers = ["Trade ID", "Trade Pair", "Price", "Quantity", "Time"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
});
