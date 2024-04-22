import { Box, Typography } from "@mui/material";

/**
 * Page to show when something goes wrong
 * @constructor
 */
const ErrorPage = () => {
  return (
    <Box className={"column-flex align-items-center justify-content-center"}>
      <Typography variant={"h6"} fontStyle={"italic"} sx={{ mt: 10 }}>
        Nobody here but us chickens!
      </Typography>
    </Box>
  );
};

export default ErrorPage;
