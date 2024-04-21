import BaseCard from "./BaseCard";
import { Link, List, ListItem, Typography } from "@mui/material";
import Utils from "../../common/Utils";
import React, { useContext } from "react";
import { AppStateContext } from "../../providers/AppStateProvider";

/**
 * List of articles, like a Google search result
 * @constructor
 */
const ArticleListCard = () => {
  const context = useContext(AppStateContext);
  const data = context?.state.data;

  return (
    <BaseCard name={"article-list"} title={"Latest Publications"}>
      <List>
        {data?.articles.map((article, i) => {
          return (
            <ListItem
              key={i}
              className={"column-flex"}
              sx={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {/* Title as a link */}
              <Link variant={"h6"} href={article.link}>
                {article.title}
              </Link>
              {/* List of authors */}
              <Typography className={"article-info"}>
                {article.authors.length > 3
                  ? article.authors.slice(0, 3).join(", ") + " et al."
                  : article.authors.join(", ")}
              </Typography>
              {/* Publish date */}
              <Typography className={"article-info"}>
                {Utils.dateToString(new Date(article.publishTime))}
              </Typography>
              {/* Abstract (Summary) */}
              <Typography paragraph={true} className={"two-line"}>
                {article.summary}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </BaseCard>
  );
};

export default ArticleListCard;
