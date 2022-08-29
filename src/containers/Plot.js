import React, { useEffect, useState, useRef } from "react";
import uPlot from "uplot";
import "/node_modules/uplot/dist/uPlot.min.css";
import Sidebar from './Sidebar'
import { BsPencilSquare,BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Data from "./Data";

export default function Plot({width,height}) {
  console.log("plot contanier width:",width)
  const [toggle, setToggle] = useState(false);
  const [plot, setPlot] = useState();
  

  const plotRef = useRef();
  const stateData = useSelector((state) => state.data.data);

  let strokeColor = "red";  let range = [0, 6];
  if(localStorage.getItem('chart1Data') !== null){
     strokeColor ="green";
     range= [1, 5];
  }

  function wheelZoomPlugin(opts) {
    let factor = opts.factor || 0.75;

    let xMin, xMax, yMin, yMax, xRange, yRange;

    function clamp(nRange, nMin, nMax, fRange, fMin, fMax) {
      if (nRange > fRange) {
        nMin = fMin;
        nMax = fMax;
      }
      else if (nMin < fMin) {
        nMin = fMin;
        nMax = fMin + nRange;
      }
      else if (nMax > fMax) {
        nMax = fMax;
        nMin = fMax - nRange;
      }

      return [nMin, nMax];
    }

    return {
      hooks: {
        ready: u => {
          xMin = u.scales.x.min;
          xMax = u.scales.x.max;
          yMin = u.scales.y.min;
          yMax = u.scales.y.max;

          xRange = xMax - xMin;
          yRange = yMax - yMin;

          let over = u.over;
          let rect = over.getBoundingClientRect();

          // wheel drag pan
          over.addEventListener("mousedown", e => {
            if (e.button === 1) {
            //	plot.style.cursor = "move";
              e.preventDefault();

              let left0 = e.clientX;
            //	let top0 = e.clientY;

              let scXMin0 = u.scales.x.min;
              let scXMax0 = u.scales.x.max;

              let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');

              function onmove(e) {
                e.preventDefault();

                let left1 = e.clientX;
              //	let top1 = e.clientY;

                let dx = xUnitsPerPx * (left1 - left0);

                u.setScale('x', {
                  min: scXMin0 - dx,
                  max: scXMax0 - dx,
                });
              }

              function onup(e) {
                document.removeEventListener("mousemove", onmove);
                document.removeEventListener("mouseup", onup);
              }

              document.addEventListener("mousemove", onmove);
              document.addEventListener("mouseup", onup);
            }
          });

          // wheel scroll zoom
          over.addEventListener("wheel", e => {
            e.preventDefault();

            let {left, top} = u.cursor;

            let leftPct = left/rect.width;
            let btmPct = 1 - top/rect.height;
            let xVal = u.posToVal(left, "x");
            let yVal = u.posToVal(top, "y");
            let oxRange = u.scales.x.max - u.scales.x.min;
            let oyRange = u.scales.y.max - u.scales.y.min;

            let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
            let nxMin = xVal - leftPct * nxRange;
            let nxMax = nxMin + nxRange;
            [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

            let nyRange = e.deltaY < 0 ? oyRange * factor : oyRange / factor;
            let nyMin = yVal - btmPct * nyRange;
            let nyMax = nyMin + nyRange;
            [nyMin, nyMax] = clamp(nyRange, nyMin, nyMax, yRange, yMin, yMax);

            u.batch(() => {
              u.setScale("x", {
                min: nxMin,
                max: nxMax,
              });

              u.setScale("y", {
                min: nyMin,
                max: nyMax,
              });
            });
          });
        }
      }
    };
  }

  function getSize() {
    return {
      width: width *100 ,//(window.innerWidth ) /3,
      height: height*100+80//(window.innerHeight )/2 + 50,
    }
  }
  
  const opts = {
    title: "Chart 1 Live streaming",
    //width: 500,
    //height: 235,
    ...getSize(),
    pxAlign: false,
    plugins: [
      wheelZoomPlugin({factor: 0.75})
    ],
    scales: {
      y: {
          //	auto: false,
          range:range
      }
    },
    series: [
      {},
      {
          label: "Sine",
          stroke: strokeColor
      }
    ]
};

  useEffect(() => {
    const plot = new uPlot(opts, stateData, plotRef.current);
    if (!plot) return;
    setPlot(plot);
    return () => {
      plot.destroy();
    };
  }, [stateData]);

  const handleToggle = () => {
    setToggle(pre => !pre)
  }

  const handleDelete = ()=>{
    let boxResult = window.confirm("Are you sure you want to change configurations!");
    if(boxResult === true){
      localStorage.removeItem("chart1Data");
      setPlot(plot);
    }
  }
  /*window.addEventListener("resize", e => {
    console.log("-------------------");
    setPlot(plot);
  });*/

  return (
    <div>
      <button onClick={handleDelete}><BsTrash fill='#0e0d0d' size={22} /></button>
      <button onClick={handleToggle}><BsPencilSquare fill='#0e0d0d' size={22} /></button>
      {toggle && <Sidebar close={() => setToggle(false)} chart="chart1" />}
      <div ref={plotRef} />
      <Data chart="chart1" />
    </div>
  );
}
