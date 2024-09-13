import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Creacion } from "../pages/Creacion";
import { Partido } from "../pages/Partido";
// import { Estadistica } from "../pages/Estadistica";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Creacion />} />
        <Route path="/partido" element={<Partido />} />
        {/* <Route path="/estadistica" element={<Estadistica />} /> */}
      </Routes>
    </Router>
  );
};
