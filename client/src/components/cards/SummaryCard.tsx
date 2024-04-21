import "../../css/summary-card.css";
import BaseCard from "./BaseCard";
import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AppStateContext } from "../../providers/AppStateProvider";

type TrendCountBarProps = {
  // Readable date range period
  period: string;
  // Count
  value: number;
};

/**
 * A barplot of trend count
 * @param props
 * @constructor
 */
const TrendCountBar = ({ period, value }: TrendCountBarProps) => {
  return (
    <Box className={"trend-count-bar row-flex align-items-center"}>
      {/* Date range */}
      <Typography sx={{ flex: 1 }}>{period}</Typography>
      {/* Linear bar plot */}
      <Box sx={{ flex: 4 }}>
        {/* Value will be in range [0, 1000], so divide by 10 to fit to within 100 */}
        <LinearProgress variant={"determinate"} value={value / 10} />
      </Box>
      {/* Count value */}
      <Typography align={"right"} sx={{ flex: 1 }}>
        {value}
      </Typography>
    </Box>
  );
};

/**
 * Summary card
 * @constructor
 */
const SummaryCard = () => {
  const context = useContext(AppStateContext);
  const data = context?.state.data;

  return (
    <BaseCard name={"trend-summary"} title={"Trend Summary"}>
      {data && (
        <>
          {/* Description */}
          <Box className={"row-flex"} sx={{ gap: 1 }}>
            <Typography display={"inline"}>
              Publications that are related to
            </Typography>
            <Typography display={"inline"} sx={{ fontStyle: "italic" }}>
              {`"${data.query}"`}
            </Typography>
          </Box>
          {/* Barplot */}
          <Box
            className={"column-flex"}
            sx={{
              gap: 3,
              width: "100%",
              mt: 4,
            }}
          >
            {data.percentiles.map((p, i) => {
              return (
                <TrendCountBar key={i} period={p.period} value={p.count} />
              );
            })}
          </Box>
        </>
      )}
    </BaseCard>
  );
};

export default SummaryCard;
