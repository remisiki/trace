import PropsWithSx from "../props/PropsWithSx";
import { GitHub } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import Values from "../../common/Values";

/**
 * Link button to GitHub repo
 * @param sx
 * @constructor
 */
const GithubLinkButton = ({ sx }: PropsWithSx) => {
  return (
    <IconButton
      color={"primary"}
      size={"large"}
      href={Values.GITHUB_LINK}
      sx={sx}
    >
      <GitHub />
    </IconButton>
  );
};

export default GithubLinkButton;
