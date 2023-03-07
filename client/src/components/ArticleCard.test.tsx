import React from "react";
import { render, screen } from "@testing-library/react";
import ArticleCard from "./ArticleCard";

const article = {
  __typename: "Article",
  name: "Lattenrost Premium 42 Fix",
  variantName: "140 x 200cm",
  prices: {
    __typename: "ArticlePrices",
    currency: "EUR",
    regular: {
      __typename: "ArticleRegularPrice",
      value: 22999,
    },
  },
  images: [
    {
      __typename: "ArticleGalleryImage",
      path: "https://cdn1.home24.net/images/media/catalog/product/200x200/png/-/1/-1000022710-200211-14470100002-IMAGE-P000000001000022710.webp",
    },
  ],
};

test("renders ArticleCard component correctly", () => {
  render(<ArticleCard article={article} />);

  const imgElement = screen.getByRole("img", {
    name: /lattenrost premium 42 fix/i,
  });
  expect(imgElement).toBeInTheDocument();

  const nameElement = screen.getByText(/lattenrost premium 42 fix/i);
  expect(nameElement).toBeInTheDocument();

  const priceElement = screen.getByText(/229,99/i);
  expect(priceElement).toBeInTheDocument();

  const buttonElement = screen.getByRole("button", { name: /add to cart/i });
  expect(buttonElement).toBeInTheDocument();
});
