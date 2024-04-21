import { Typography, TypographyProps } from "@mui/material";
import theme from "../theme/Theme";
import React from "react";

/**
 * Logo
 * @param props
 * @constructor
 */
const Logo = (props: TypographyProps) => {
  return (
    <Typography {...props} fontStyle={"bold"}>
      <span style={{ color: "white" }}>TR</span>
      <span style={{ color: theme.palette.primary.main }}>ACE</span>
    </Typography>
  );
};

export default Logo;
