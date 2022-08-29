import React, {useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../redux/actions/productsActions";

const Data = () => {
   // const stateData = useSelector((state) => state.data.data);
    const NOW = Math.floor(Date.now() / 1e3);
    let LENGTH =200;
    function getData(min) {
      let xs = [];
      let ys = [];

      for (let i = min; i < min + LENGTH; i++) {
          xs.push(NOW + i * 60 * 5);
          ys.push(Math.random(i/10) * 5);
      }
      return [xs, ys];
    }

    const dispatch = useDispatch();
    const [shift, setShift] = useState(0);
    const [datas, setDatas] = useState(getData(shift));
    
    useEffect(() => {
        setTimeout(function() {
                  setShift((prevShift) => prevShift + 5);
                  setDatas((prev) => getData(shift));
        }, 2000);
        dispatch(setData(datas));
    }, [datas]);

  return (
    <></>
  )
}

export default Data