import Plot from "react-plotly.js";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import BaseCard from "./BaseCard";
import { AppStateContext } from "../../providers/AppStateProvider";

/**
 * Trend plot card
 * @constructor
 */
const TrendPlotCard = () => {
  const context = useContext(AppStateContext);
  const data = context?.state.data;

  return (
    <BaseCard name={"trend-plot"} title={"Graphic"}>
      {data && (
        <Box className={"fill-box"}>
          <Plot
            data={[
              {
                x: data.rangeX,
                y: data.rangeY,
                type: "scatter",
                mode: "lines",
                // Smooth line
                line: {
                  shape: "spline",
                  smoothing: 1,
                },
              },
            ]}
            layout={{
              showlegend: false,
              hovermode: "x",
              // Fixed size
              width: 500,
              height: 300,
              // Bad margins
              margin: { t: 0, l: 25, b: 30, r: 25 },
              // Hide grid
              xaxis: { showgrid: false },
              yaxis: { showgrid: false },
            }}
            config={{
              displayModeBar: false,
            }}
          />
        </Box>
      )}
    </BaseCard>
  );
};

export default TrendPlotCard;
