import React from "react";
import { render } from "@testing-library/react";
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
  const screen = render(<ArticleCard article={article} />);
  





 
});
