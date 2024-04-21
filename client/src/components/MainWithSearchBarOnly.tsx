import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import theme from "../theme/Theme";

/**
 * Main panel, but only the search bar. Similar to Google homepage
 * @constructor
 */
const MainWithSearchBarOnly = () => {
  return (
    <Box
      className={
        "fill-box column-flex align-items-center justify-content-center"
      }
      sx={{
        pb: 30,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Text box */}
      <Box className={"column-flex align-items-center justify-content-center"}>
        <Logo variant={"h1"} />
        <Typography variant={"h6"} color={theme.palette.primary.contrastText}>
          Trends in Academic Exploration Analysis Toolkit
        </Typography>
      </Box>
      {/* Search bar */}
      <Box sx={{ width: 600, mt: 10 }}>
        <SearchBar />
      </Box>
    </Box>
  );
};

export default MainWithSearchBarOnly;
