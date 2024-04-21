import React from "react";

type BaseCardProps = {
  // Name of card. Will be set as id and class name, so must follow kebab naming convention
  name: string;
  // Title
  title: string;
  // Children
  children?: React.ReactNode;
};

export default BaseCardProps;
