
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "./header";
import HomePage from "./homepage";


const App = () => {
  return (
    <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="" element={<HomePage />} />
                {/* <Route path="/about" element={<About/>} /> */}
            </Routes>
        </BrowserRouter>
  );
}

export default App;
