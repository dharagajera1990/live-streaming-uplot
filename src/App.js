import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UplotChart from "./containers/UplotChart";
import Header from "./containers/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<UplotChart/>} />
          <Route>404 Not Found!</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;