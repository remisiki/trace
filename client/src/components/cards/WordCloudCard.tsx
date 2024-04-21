import WordCloud from "react-d3-cloud";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import BaseCard from "./BaseCard";
import { AppStateContext } from "../../providers/AppStateProvider";

/**
 * Word cloud card
 * @constructor
 */
const WordCloudCard = () => {
  const context = useContext(AppStateContext);
  const data = context?.state.data;

  return (
    <BaseCard name={"word-cloud"} title={"Word Cloud"}>
      {data && (
        <Box
          className={"column-flex"}
          sx={{
            gap: 1,
            width: "70%",
            alignSelf: "center",
          }}
        >
          <WordCloud
            data={data.keywords}
            width={100}
            height={30}
            rotate={0}
            spiral={"archimedean"}
          />
        </Box>
      )}
    </BaseCard>
  );
};

export default WordCloudCard;
