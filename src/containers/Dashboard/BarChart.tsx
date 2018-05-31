import {
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLabel
} from "victory";
import * as React from "react";
import { IPoint } from "./IDashboardData";
import { grey600, grey200 } from "material-ui/styles/colors";
import * as Numeral from "numeral";

export interface IBarchartProps {
  bars: IPoint[];
  tickValues: string[];
}

class Barchart extends React.PureComponent<IBarchartProps> {
  public render() {
    let chartwidth = this.props.bars.length * 60;

    if (chartwidth < 250) {
      chartwidth = 250;
    }
    const VictoryContainerResponsive: any = VictoryContainer;

    return (
      <VictoryChart
        width={chartwidth}
        height={200}
        containerComponent={<VictoryContainerResponsive responsive={false} />}
      >
        <VictoryAxis
          // y
          dependentAxis={true}
          tickFormat={value => Numeral(value).format("0 a")}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: grey200 },
            tickLabels: {
              fontSize: 10,
              padding: 30,
              stroke: grey600,
              strokeWidth: 0.1
            }
          }}
        />
        <VictoryBar
          standalone={false}
          style={{
            data: {
              fill: "#c7b5e3",
              width: 30,
              strokeLinejoin: "round",
              strokeWidth: 6
            }
          }}
          data={this.props.bars}
        />

        <VictoryAxis
          standalone={false}
          crossAxis={true}
          width={chartwidth}
          domain={[-1, this.props.tickValues.length]}
          tickValues={this.props.tickValues}
          tickLabelComponent={
            <VictoryLabel angle={340} dy={-10} textAnchor={"end"} />
          }
          theme={VictoryTheme.material}
          style={
            {
              axis: { stroke: "none" },
              tickLabels: { fontSize: 10, stroke: grey600, strokeWidth: 0.1 }
            } as any
          }
        />
      </VictoryChart>
    );
  }
}

export default Barchart;
