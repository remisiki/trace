import "../../css/base-card.css";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import BaseCardProps from "../props/BaseCardProps";

/**
 * A base card component
 * @param props
 * @constructor
 */
const BaseCard = (props: BaseCardProps) => {
  return (
    <Card
      variant={"elevation"}
      sx={{ gridArea: props.name }}
      className={props.name + " fill-box"}
      id={"card-" + props.name}
    >
      <CardContent className={"card-content column-flex"}>
        <Typography variant={"h5"}>{props.title}</Typography>
        {props.children}
      </CardContent>
    </Card>
  );
};

export default BaseCard;
