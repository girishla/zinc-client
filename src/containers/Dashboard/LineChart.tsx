import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryContainer,
  VictoryLabel
} from "victory";
import * as React from "react";
import { IPoint } from "./IDashboardData";
import {
  grey400,
  grey200,
  red200,
  grey500,
  grey600
} from "material-ui/styles/colors";
import Theme from "../../theming/theme";
import { compose } from "redux";
import Dimensions from "react-dimensions";
import { format, parse } from "date-fns";
import * as Numeral from "numeral";

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
        domainPadding={{ x: 30, y: 0 }}
        containerComponent={<VictoryContainerResponsive responsive={false} />}
      >
        <VictoryAxis
          // x
          tickValues={this.props.tickValues}
          tickLabelComponent={
            <VictoryLabel angle={340} dy={-10} textAnchor={"end"} />
          }
          tickFormat={tick => {
            return formatToDateString(tick);
          }}
          style={{
            axis: { stroke: grey400 },
            ticks: { stroke: grey600 },
            tickLabels: { fontSize: 10, stroke: grey600, strokeWidth: 0.1 }
          }}
        />
        <VictoryAxis
          // y
          dependentAxis={true}
          tickFormat={value => Numeral(value).format("0a")}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: grey200 },
            tickLabels: {
              fontSize: 8,
              padding: 30,
              stroke: grey500,
              strokeWidth: 0.1
            }
          }}
        />
        <VictoryLine
          data={this.props.points}
          style={{
            data: { stroke: Theme.defaultMainColor, strokeWidth: 1 }
          }}
        />
        <VictoryScatter
          data={this.props.points}
          labels={datum => Numeral(datum.y).format("0 a")}
          style={{
            data: {
              stroke: red200,
              strokeWidth: 1,
              fill: red200
            },

            labels: { fontSize: 10 }
          }}
        />
      </VictoryChart>
    );
  }
}

function formatToDateString(tick: string) {
  return format(parse(tick, "YYYYMMDD", new Date()), "MM/DD/YY");
}

export default compose(Dimensions())(LineChart);
