import React from "react";
import { AppBar, Toolbar, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderProps } from "../types";
import { Box } from "@mui/system";

export default function Header(props: HeaderProps) {
  const { toggleDrawer, searchQuery, handleSearch } = props;
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box>
            <IconButton>
              <MenuIcon onClick={toggleDrawer} sx={{color:"white"}} />
            </IconButton>
            <strong>home24</strong>
          </Box>
          <Box>
            <TextField
              placeholder="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              sx={{backgroundColor:'rgba(255,255,255,0.5)'}}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
