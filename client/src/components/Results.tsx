import React from "react";
import SummaryCard from "./cards/SummaryCard";
import TrendPlotCard from "./cards/TrendPlotCard";
import WordCloudCard from "./cards/WordCloudCard";
import ArticleListCard from "./cards/ArticleListCard";
import NewsCard from "./cards/NewsCard";

/**
 * Result cards, layout in a grid
 * @constructor
 */
const Results = () => {
  return (
    <>
      <SummaryCard />
      <TrendPlotCard />
      <WordCloudCard />
      <ArticleListCard />
      <NewsCard />
    </>
  );
};

export default Results;
