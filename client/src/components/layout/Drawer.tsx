import React from 'react'
import { Drawer } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DrawerProps } from '../../types';
export default function DrawerComponent(props:DrawerProps) {
   const { open, toggleDrawer, categories,drawerWidth } = props;
  return (
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
      <div style={{textAlign:"right",padding:"0 0.5rem"}}>
      <ChevronLeftIcon fontSize="large"  onClick={toggleDrawer} />

      </div>
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
  )
}
