import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Search is loading indicator with a timer
 * @constructor
 */
const Loading = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Update timer once a second
    const timerUpdater = setInterval(() => {
      setTimer((x) => x + 1);
    }, 1000);
    // Must clear interval on umount
    return () => {
      clearInterval(timerUpdater);
    };
  }, []);

  return (
    <Box
      className={"column-flex align-items-center"}
      sx={{
        justifyContent: "flex-start",
        gap: 5,
        p: 5,
      }}
    >
      {/* Text box */}
      <Box
        className={"column-flex align-items-center"}
        sx={{
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        <Typography variant={"h5"}>Please wait while searching...</Typography>
        <Typography>{timer}s</Typography>
      </Box>
      {/* Loading circle */}
      <CircularProgress />
    </Box>
  );
};

export default Loading;
