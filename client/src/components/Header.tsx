import SearchBar from "./SearchBar";
import React from "react";
import { Box } from "@mui/material";
import theme from "../theme/Theme";
import Logo from "./Logo";
import GithubLinkButton from "./buttons/GithubLinkButton";

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
        {/* Left logo */}
        <Logo variant={"h4"} sx={{ flex: 1 }} />
        {/* Search bar */}
        <SearchBar />
        {/* Right button bar */}
        <Box
          sx={{ flex: 1, justifyContent: "flex-end" }}
          className={"row-flex align-items-center"}
        >
          <GithubLinkButton sx={{ mr: 1 }} />
        </Box>
      </Box>
    </header>
  );
};

export default Header;
