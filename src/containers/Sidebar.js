import React, { useState,useEffect } from "react";
import { BsXLg } from "react-icons/bs";

const Sidebar = ({close,chart}) => {
  const [inputdata,setInputdata] =useState("");
    const handleClick =()=>{
        console.log("configurations to save:",inputdata);
        if(chart ==="chart1"){
          localStorage.setItem('chart1Data', inputdata);
        }else{
          localStorage.setItem('chart2Data', inputdata);
        }
        
        close();
    }
    const handleChange =(event)=>{
      setInputdata(event.target.value);
    }
  return <aside className='sidebar' >
    <div onClick={() => close()} >
      <BsXLg />
    </div>
    <ul className="input-list">
        <li><label>Enter JSON object Name </label></li>
        <li><input type="text" onChange={handleChange} /></li>
        <li><button onClick={()=>handleClick()}>save</button></li>
    </ul>
</aside>
}

export default Sidebar;