import * as React from "react";
import * as ReactDOM from "react-dom";
import { keys } from "lodash";

import AreaDemo from "./components/victory-area-demo";
import AxisDemo from "./components/victory-axis-demo";
import BarDemo from "./components/victory-bar-demo";
import BoxPlotDemo from "./components/victory-box-plot-demo";
import BrushContainerDemo from "./components/victory-brush-container-demo";
import BrushLineDemo from "./components/victory-brush-line-demo";
import CandlestickDemo from "./components/victory-candlestick-demo";
import ChartDemo from "./components/victory-chart-demo";
import CursorContainerDemo from "./components/victory-cursor-container-demo";
import ErrorBarDemo from "./components/victory-errorbar-demo";
import GroupDemo from "./components/group-demo";
import HorizontalDemo from "./components/horizontal-demo";
import LegendDemo from "./components/victory-legend-demo";
import LineDemo from "./components/victory-line-demo";
import PieDemo from "./components/victory-pie-demo";
import PolarAxisDemo from "./components/victory-polar-axis-demo";
import ScatterDemo from "./components/victory-scatter-demo";
import TooltipDemo from "./components/victory-tooltip-demo";
import VictoryDemo from "./components/victory-demo";
import VictorySelectionContainerDemo from "./components/victory-selection-container-demo";
import VictorySharedEventsDemo from "./components/victory-shared-events-demo";
import VoronoiDemo from "./components/victory-voronoi-demo";

const MAP = {
  "/area": { component: AreaDemo, name: "AreaDemo" },
  "/axis": { component: AxisDemo, name: "AxisDemo" },
  "/bar": { component: BarDemo, name: "BarDemo" },
  "/box-plot": { component: BoxPlotDemo, name: "BoxPlotDemo" },
  "/brush-container": { component: BrushContainerDemo, name: "BrushContainerDemo" },
  "/brush-line": { component: BrushLineDemo, name: "BrushLineDemo" },
  "/group-demo": { component: GroupDemo, name: "GroupDemo" },
  "/horizontal-demo": { component: HorizontalDemo, name: "HorizontalDemo" },
  "/candlestick": { component: CandlestickDemo, name: "CandlestickDemo" },
  "/chart": { component: ChartDemo, name: "ChartDemo" },
  "/cursor-container": { component: CursorContainerDemo, name: "CursorContainerDemo" },
  "/error-bar": { component: ErrorBarDemo, name: "ErrorBarDemo" },
  "/legend": { component: LegendDemo, name: "LegendDemo" },
  "/line": { component: LineDemo, name: "LineDemo" },
  "/pie": { component: PieDemo, name: "PieDemo" },
  "/polar-axis": { component: PolarAxisDemo, name: "PolarAxisDemo" },
  "/scatter": { component: ScatterDemo, name: "ScatterDemo" },
  "/tooltip": { component: TooltipDemo, name: "TooltipDemo" },
  "/victory-demo": { component: VictoryDemo, name: "VictoryDemo" },
  "/victory-selection-container": {
    component: VictorySelectionContainerDemo,
    name: "VictorySelectionContainerDemo"
  },
  "/victory-shared-events": { component: VictorySharedEventsDemo, name: "VictorySharedEventsDemo" },
  "/voronoi": { component: VoronoiDemo, name: "VoronoiDemo" }
};

class Home extends React.Component {
  render() {
    return <h1>Pick A Demo</h1>;
  }
}

interface AppState {
  route: string;
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      route: window.location.hash.substr(1)
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        route: window.location.hash.substr(1)
      });
    });
  }

  getDemo() {
    const item = MAP[this.state.route] || {};
    return item.component || Home;
  }

  render() {
    const Child = this.getDemo();
    const routes = keys(MAP);
    return (
      <div>
        <h1>Demos (Typescript)</h1>
        <ul>
          {routes.map((route, index) => {
            const item = MAP[route] || {};
            return (
              <li key={index}>
                <a href={`#${route}`}>{item.name}</a>
              </li>
            );
          })}
        </ul>
        <Child />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
