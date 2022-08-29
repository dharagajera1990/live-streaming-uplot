import React, { useState } from 'react'
import "./UplotChart.css"
import { Responsive, WidthProvider } from "react-grid-layout";
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import Plot from './Plot';
import Plot2 from './Plot2';

const ResponsiveGridLayout = WidthProvider(Responsive);

const UplotChart = () => {
    let w = 0,h=0;
    if(window.innerWidth < 500){
      w = window.innerWidth-50;
    }else{
      w = 5*100;
    }
    h = 3*100+80;

    const [chart1width,setChart1width] = useState(w);
    const [chart1height,setChart1height] = useState(h);
    const [chart2width,setChart2width] = useState(w);
    const [chart2height,setChart2height] = useState(h);

    const layout = [
        { i: 'a', x: 0, y: 0, w: 5, h: 3 },
        { i: 'b', x: 5, y: 0, w: 5, h: 3 },
        { i: 'c', x: 2, y: 8, w: 5, h: 1 }
      ];

      const onResize = (event) => {
        setChart1width(event[0].w*100);
        setChart1height(event[0].h*100+80);
        setChart2width(event[1].w*100);
        setChart2height(event[1].h*100+80);
      };

  return (
    <div className="main-wrapper">
          <ResponsiveGridLayout
            className="layout"
            measureBeforeMount={true}
            isDragable={true}
            isResizable={true}
            layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} 
            onResize={onResize}
          >
            <div key="a">
            <div className="chart-wrapper chart-1"> <Plot width={chart1width} height={chart1height} /></div>
            </div>
            <div key="b">
            <div className="chart-wrapper"><Plot2 width={chart2width} height={chart2height}  /></div>
            </div>
            <div key="c" >
            <b className='conditional-note'>
              <>Note* </>
              <ol>
                <li>You can zoom in/out the chart using mouse wheel </li>
                <li>Pub/Sub: implemented using redux </li>
                <li>Generating random data using javascript and data changes every 2 seconds</li>
              </ol></b>
            </div>
        </ResponsiveGridLayout>
    </div>
  )
}

export default UplotChart