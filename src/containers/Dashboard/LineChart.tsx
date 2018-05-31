import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryContainer
} from "victory";
import * as React from "react";
import { IPoint } from "./IDashboardData";
import { grey400, grey200 } from "material-ui/styles/colors";
import Theme from "../../theming/theme";
import { compose } from "redux";
import Dimensions from "react-dimensions";

export interface ILineChartProps {
  points: IPoint[];
  tickValues: string[];
  containerWidth: number;
  containerHeight: number;
}

class LineChart extends React.PureComponent<ILineChartProps> {
  public render() {
    const VictoryContainerResponsive: any = VictoryContainer;
    return (
      <VictoryChart
        width={this.props.containerWidth}
        height={this.props.containerHeight}
        containerComponent={<VictoryContainerResponsive responsive={false} />}
      >
        <VictoryLine
          data={this.props.points}
          style={{
            data: { stroke: Theme.defaultMainColor, strokeWidth: 4 }
          }}
        />
        <VictoryAxis
          // x
          tickValues={this.props.tickValues}
          //   tickFormat={tick => {
          //     if (data.length < 1) {
          //       return tick;
          //     }
          //     const time = data[tick - 1].time.split(":");
          //     return formatTime(time);
          //   }}
          style={{
            axis: { stroke: grey400 },
            ticks: { stroke: grey400 },
            tickLabels: { fontSize: 12, padding: 30, stroke: "#EAEDEF" }
          }}
        />
        <VictoryAxis
          // y
          dependentAxis={true}
          tickValues={[0, 30, 60]}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: grey400 },
            tickLabels: { fontSize: 12, padding: 30, stroke: grey200 }
          }}
        />
        <VictoryScatter
          data={this.props.points}
          style={{
            data: {
              stroke: grey200,
              strokeWidth: 3,
              fill: grey200
            },
            labels: { fontSize: 30 }
          }}
        />
      </VictoryChart>
    );
  }
}

export default compose(Dimensions())(LineChart);
