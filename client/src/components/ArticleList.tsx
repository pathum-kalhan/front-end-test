import { AppBar, Drawer, Toolbar,Grid, CssBaseline, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Category } from "../types";
import ItemCard from "./ItemCard";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface Item {
  name: string;
  variantName: string;
  prices: {
    currency: string;
    regular: {
      value: number;
    };
  };
  images: {
    path: string;
  }[];
}
export default function ArticleList() {
  const drawerWidth = 200;
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(
      JSON.stringify({
        query: `{
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
                  images(
                    format: WEBP
                    maxWidth: 200
                    maxHeight: 200
                    limit: 1
                  ) {
                    path
                  }
                }
              }
            }
          }`,
      })
    );

    xhr.onload = () => {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.response);

        setCategories(response.data.categories);
      }
    };
  }, []);

  var articles = categories.map((category) => {
    return category.categoryArticles.articles.map((article) => {
      return <ItemCard item={article} key={article.name} />;
    });
  });

  const [open, setOpen] = React.useState(false);

  const toogleDrawer = () => {
    setOpen(!open);
  };

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  }

  useEffect(() => {

    function searchItems(searchQuery: string, items: Item[]): Item[] {
      const searchRegex = new RegExp(searchQuery, "i");
      return items.filter((item) => {
        return (
          searchRegex.test(item.name) ||
          searchRegex.test(item.prices.regular.value.toString())
        );
      });
    }

    if (searchQuery && categories.length) {
      const searchedItems = searchItems(searchQuery, categories[0].categoryArticles.articles);
      setItems(searchedItems);
      
    }else if(categories.length){
      setItems(categories[0].categoryArticles.articles)
    }


    
    // else{
    //   setItems(categories[0].categoryArticles.articles)
    // }

    
    
  }, [searchQuery,categories])
  

  // if (true) {
  return (

    <div>
      <CssBaseline/>
      <AppBar
        position="fixed"
        // color="transparent"
        sx={
          {
            // width: { sm: `calc(100% - ${drawerWidth}px)` },
            // ml: { sm: `${drawerWidth}px` },
            // p: 1,
          }
        }
      >
        <Toolbar>
          <IconButton>
            <MenuIcon onClick={toogleDrawer} />
          </IconButton>
          <strong>home24</strong>
          <TextField placeholder="Search" value={searchQuery} onChange={handleSearch}  />
        </Toolbar>
      </AppBar>
     
        <Toolbar/>
       
      <Grid container className={"articles"} spacing={1} >
        {
          items?.map(item=>(
            <ItemCard item={item} key={item.name} />
          ))
        }
        {/* {articles} */}
        </Grid>
      <Drawer
        open={open}
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <div className={"sidebar"}>
          <ChevronLeftIcon onClick={toogleDrawer} />
          <h3>Kategorien</h3>
          {categories.length ? (
            <ul>
              {categories[0].childrenCategories.list.map(
                ({ name, urlPath }) => {
                  return (
                    <li key={name}>
                      <a href={`/${urlPath}`}>{name}</a>
                    </li>
                  );
                }
              )}
            </ul>
          ) : (
            "Loading..."
          )}
        </div>
      </Drawer>
          <div className={"footer"}>
        Alle Preise sind in Euro (€) inkl. gesetzlicher Umsatzsteuer und
        Versandkosten.
      </div>
    </div>
  );
  // }

  // return (
  //   <div className={"page"}>
  //     <div className={"header"}>
  //       <strong>home24</strong>
  //       <input placeholder={"Search"} />
  //     </div>

  //     <div className={"content"}>
  //       {categories.length ? (
  //         <h1>
  //           {categories[0].name}
  //           <small> ({categories[0].articleCount})</small>
  //         </h1>
  //       ) : (
  //         "Loading..."
  //       )}
  //       <div className={"articles"}>{articles}</div>
  //     </div>

  //     <div className={"footer"}>
  //       Alle Preise sind in Euro (€) inkl. gesetzlicher Umsatzsteuer und
  //       Versandkosten.
  //     </div>
  //   </div>
  // );
}
