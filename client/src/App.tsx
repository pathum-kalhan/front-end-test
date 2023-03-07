import React, { useState, useEffect } from "react";
import { Toolbar, Grid, CssBaseline, Alert } from "@mui/material";
import Header from "./components/layout/Header";
import { Article, Category } from "./types";
import ArticleCard from "./components/ArticleCard";
import { useQuery, gql } from "@apollo/client";
import DrawerComponent from "./components/layout/Drawer";
import { Box } from "@mui/system";
import Footer from "./components/layout/Footer";

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const [items, setItems] = useState<Article[]>([]);

  useEffect(() => {
    function searchItems(searchQuery: string, items: Article[]): Article[] {
      const searchRegex = new RegExp(searchQuery, "i");
      return items.filter((item) => {
        return (
          searchRegex.test(item.name) ||
          searchRegex.test(item.prices.regular.value.toString())
        );
      });
    }

    if (searchQuery && categories.length) {
      const searchedItems = searchItems(
        searchQuery,
        categories[0].categoryArticles.articles
      );
      setItems(searchedItems);
    } else if (categories.length) {
      setItems(categories[0].categoryArticles.articles);
    }
  }, [searchQuery, categories]);

  const drawerWidth = 200;

  const GET_LOCATIONS = gql`
    {
      categories: productLists(ids: "156126", locale: de_DE) {
        name
        articleCount
        childrenCategories: childrenProductLists {
          list {
            name
            urlPath
          }
        }
        categoryArticles: articlesList(first: 50) {
          articles {
            name
            variantName
            prices {
              currency
              regular {
                value
              }
            }
            images(format: WEBP, maxWidth: 200, maxHeight: 200, limit: 1) {
              path
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LOCATIONS);

  useEffect(() => {
    if (data) {
      console.log(data);
      setCategories(data.categories);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <Alert severity="error">Data loading failed</Alert>;
  }

  return (
    <Box >
      <CssBaseline />
      <Header
        toggleDrawer={toggleDrawer}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <Toolbar />
      <Grid container spacing={1} sx={{ padding: "1rem" }}>
        {items?.map((article) => (
          <ArticleCard article={article} key={article.name} />
        ))}
      </Grid>
      <Footer/>

      <DrawerComponent
        open={open}
        toggleDrawer={toggleDrawer}
        categories={categories}
        drawerWidth={drawerWidth}
      />
    </Box>
  );
}
