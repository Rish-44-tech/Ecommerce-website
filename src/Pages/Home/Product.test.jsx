import { screen, render } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import React from "react";
import Product from "./Product.jsx";

describe("Product", () => {
  it("displays product details correctly", () => {
    const loadCart = vi.fn();

    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
  });
});
