import "../../css/news-card.css";
import BaseCard from "./BaseCard";
import { Link, List, ListItemButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AppStateContext } from "../../providers/AppStateProvider";

/**
 * News card
 * @constructor
 */
const NewsCard = () => {
  const context = useContext(AppStateContext);
  const data = context?.state.data;

  return (
    <BaseCard name={"news"} title={"News"}>
      <List className={"fill-box"}>
        {data?.news.map((n, i) => {
          return (
            <ListItemButton
              key={i}
              className={"news-item"}
              disableGutters={true}
              component={Link as any}
              href={n.link}
              sx={{
                pl: 1,
                pr: 1,
                borderRadius: 1,
              }}
            >
              {/* Thumbnail */}
              <img src={n.thumbnail} alt={n.title} />
              {/* Title */}
              <Typography className={"two-line"}>{n.title}</Typography>
            </ListItemButton>
          );
        })}
      </List>
    </BaseCard>
  );
};

export default NewsCard;
