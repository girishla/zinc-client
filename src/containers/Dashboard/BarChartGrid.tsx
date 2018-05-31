import { GridList, GridTile } from "material-ui/GridList";

import * as React from "react";
import { IBarChartData } from "./IDashboardData";
import BarChart from "./BarChart";
import { white, grey600 } from "material-ui/styles/colors";

const styles: any = {
  root: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  gridList: {
    display: "flex",
    width: "100%",
    height: 220,
    flexWrap: "nowrap",
    overflowY: "auto",
    overflowX: "auto",
    justifyContent: "center"
  }
};

const BarChartGrid = (props: { barChartData: IBarChartData[] }) => {
  const barChartItems = props.barChartData || [];

  return (
    <div style={styles.root}>
      <GridList cols={12} cellHeight={200} padding={1} style={styles.gridList}>
        {barChartItems.map(barChartItem => {
          let cols = 0;
          if (barChartItem.bars.length <= 3) {
            cols = 3;
          } else if (
            barChartItem.bars.length > 3 &&
            barChartItem.bars.length <= 15
          ) {
            cols = 6;
          } else if (
            barChartItem.bars.length > 15 &&
            barChartItem.bars.length <= 20
          ) {
            cols = 12;
          } else if (barChartItem.bars.length > 20) {
            cols = 15;
          }

          return (
            <GridTile
              key={barChartItem.name}
              title={barChartItem.name}
              //   actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              actionPosition="left"
              titlePosition="top"
              titleBackground="none"
              titleStyle={{ color: grey600 }}
              style={{ background: white, margin: 5 }}
              cols={cols}
              rows={1}
            >
              <BarChart
                bars={barChartItem.bars}
                tickValues={barChartItem.tickValues}
              />
            </GridTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default BarChartGrid;
