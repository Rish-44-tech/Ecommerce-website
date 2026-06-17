import { screen, render } from "@testing-library/react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";
import Product from "./Product.jsx";

vi.mock("axios");

describe("Product", () => {
  let loadCart;
  let product;
  let user;

  beforeEach(() => {      //we also have afterEach, beforeAll, afterAll
    loadCart = vi.fn();
    product = {
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
    user = userEvent.setup();
  });

  it("displays product details correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );

    expect(screen.getByText(87)).toBeInTheDocument();
  });

  it("adds a product to cart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    await user.click(screen.getByTestId("add-to-cart-button"));

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled();
  });

  it("selects quantity",async ()=>{
    render(<Product product={product} loadCart={loadCart} />);

    await user.selectOptions(screen.getByTestId("quantity-selector"),"5");
    await user.click(screen.getByTestId("add-to-cart-button"));

    expect(screen.getByTestId("quantity-selector")).toHaveValue("5");
    expect(axios.post).toHaveBeenCalledWith('/api/cart-items',{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 5,
    })
  })
});
