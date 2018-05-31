import { GridList, GridTile } from "material-ui/GridList";

import * as React from "react";
import { ILineChartData } from "./IDashboardData";
import LineChart from "./LineChart";
import { grey500, white } from "material-ui/styles/colors";
import { compose } from "redux";
import Dimensions from "react-dimensions";

const styles: any = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  gridList: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    overflowY: "none",
    overflowX: "none",
    justifyContent: "center"
  }
};

const LineChartGrid = (props: {
  lineChartData: ILineChartData[];
  containerWidth: number;
  containerHeight: number;
}) => {
  const lineChartItems = props.lineChartData || [];

  return (
    <div style={styles.root}>
      <GridList cols={12} cellHeight={200} padding={1} style={styles.gridList}>
        {lineChartItems.map(lineChartItem => {
          return (
            <GridTile
              key={lineChartItem.name}
              title={lineChartItem.name}
              //   actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              actionPosition="left"
              titlePosition="top"
              titleBackground="none"
              titleStyle={{ color: grey500 }}
              style={{ background: white, margin: 5 }}
              cols={props.containerWidth > 1500 ? 6 : 12}
              rows={1}
            >
              {/* <pre>{JSON.stringify(lineChartItem.tickValues, null, 2)}</pre> */}
              <LineChart
                points={lineChartItem.points}
                tickValues={lineChartItem.tickValues}
              />
            </GridTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default compose(Dimensions())(LineChartGrid);
