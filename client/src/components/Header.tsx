import SearchBar from "./SearchBar";
import React from "react";
import { Box } from "@mui/material";
import theme from "../theme/Theme";
import Logo from "./Logo";

/**
 * Header
 * @constructor
 */
const Header = () => {
  return (
    <header
      id={"header"}
      className={"row-flex align-items-center justify-content-center"}
      style={{ borderBottom: `5px ${theme.palette.primary.main} solid` }}
    >
      <Box
        boxShadow={2}
        className={"fill-box row-flex align-items-center"}
        sx={{
          justifyContent: "space-between",
          backgroundColor: theme.palette.background.default,
          pl: 2,
        }}
      >
        <Logo variant={"h4"} sx={{ flex: 1 }} />
        <SearchBar />
        {/* Right dummy padding */}
        <div style={{ flex: 1 }}></div>
      </Box>
    </header>
  );
};

export default Header;
