import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import HighchartsReact from "highcharts-react-official";
import "./HIghChartExample.css"
const ResponsiveGridLayout = WidthProvider(Responsive);

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

var data = [
  [1220832000000, 22.56],
  [1220918400000, 21.67],
  [1221004800000, 21.66],
  [1221091200000, 21.81],
  [1221177600000, 21.28],
  [1221436800000, 20.05],
  [1221523200000, 19.98],
  [1221609600000, 18.26],
  [1221696000000, 19.16],
  [1221782400000, 20.13],
  [1222041600000, 18.72],
  [1222128000000, 18.12],
  [1222214400000, 18.39],
  [1222300800000, 18.85],
  [1222387200000, 18.32],
  [1222646400000, 15.04],
  [1222732800000, 16.24],
  [1222819200000, 15.59],
  [1222905600000, 14.3],
  [1222992000000, 13.87],
  [1223251200000, 14.02],
  [1223337600000, 12.74],
  [1223424000000, 12.83],
  [1223510400000, 12.68],
  [1223596800000, 13.8],
  [1223856000000, 15.75],
  [1223942400000, 14.87],
  [1224028800000, 13.99],
  [1224115200000, 14.56],
  [1224201600000, 13.91],
  [1224460800000, 14.06],
  [1224547200000, 13.07],
  [1224633600000, 13.84],
  [1224720000000, 14.03],
  [1224806400000, 13.77],
  [1225065600000, 13.16],
  [1225152000000, 14.27],
  [1225238400000, 14.94],
  [1225324800000, 15.86],
  [1225411200000, 15.37],
  [1225670400000, 15.28],
  [1225756800000, 15.86],
  [1225843200000, 14.76],
  [1225929600000, 14.16],
  [1226016000000, 14.03],
  [1226275200000, 13.7],
  [1226361600000, 13.54],
  [1226448000000, 12.87],
  [1226534400000, 13.78],
  [1226620800000, 12.89],
  [1226880000000, 12.59],
  [1226966400000, 12.84],
  [1227052800000, 12.33],
  [1227139200000, 11.5],
  [1227225600000, 11.8],
  [1227484800000, 13.28],
  [1227571200000, 12.97],
  [1227657600000, 13.57],
  [1227830400000, 13.24],
  [1228089600000, 12.7],
  [1228176000000, 13.21],
  [1228262400000, 13.7],
  [1228348800000, 13.06],
  [1228435200000, 13.43],
  [1228694400000, 14.25],
  [1228780800000, 14.29],
  [1228867200000, 14.03],
  [1228953600000, 13.57],
  [1229040000000, 14.04],
  [1229299200000, 13.54]
];

var config = {
  rangeSelector: {
    selected: 1
  },
  title: {
    text: "AAPL Stock Price"
  },
  series: [
    {
      name: "AAPL",
      data: data,
      tooltip: {
        valueDecimals: 2
      }
    }
  ]
};

function Header() {
  return (
    <>
      <header className="window-header">
        <div className="logo-container">
          <div className="app-logo">
            <span className="app-name">Widget Name</span>
          </div>
        </div>
        <div className="actions-container">
          <button className="settings-window window-button-style">
            <svg className="window-controls-icon">
              <use href="#window-settings"></use>
            </svg>
          </button>
          <button className="close-window window-button-style">
            <svg className="window-controls-icon">
              <use href="#window-close"></use>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}

export default class HIghChartExample extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.conRef = React.createRef();

    this.chartRefs = [];

    this.setChartRef = (ref) => {
      this.chartRefs.push(ref);
    };
  }

  render() {
    const gridItems = [
      { id: 1, name: "Item One" },
      { id: 2, name: "Item Two" }
    ];
    const layout = [
      { i: "1", x: 0, y: 0, w: 2, h: 1, minW: 2, minH: 1 },
      { i: "2", x: 5, y: 0, w: 2, h: 1, minW: 2, minH: 1 }
    ];

    return (
      <ResponsiveGridLayout
        layouts={{ lg: layout }}
        measureBeforeMount={true}
        className="layout"
        // rowHeight={this.props.rowHeight}
        isDragable={true}
        isResizable={true}
        onDrag={this.onDragging}
        onDragStop={this.onMoveCard}
        margin={[30, 30]}
        onResizeStop={function (e, layout) {
          this.chartRefs[layout.i - 1].chart.reflow();
        }.bind(this)}
      >
        {gridItems.map((item, i) => {
          return (
            <div key={item.id} ref={this.conRef} className="grid-item">
              <Header />
              <HighchartsReact
                ref={this.setChartRef}
                containerProps={{ style: { width: "100%", height: "100%" } }}
                options={config}
                // highcharts={Highcharts}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    );
  }
}
