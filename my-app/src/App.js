
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Header from "./header";
import HomePage from "./pagehome";
import CompanyPage from "./pagecompany";
import BusinessSignUp from "./Pagebusinesssign";

const App = () => {
  return (
    <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="/company/:companyId" element={<CompanyPage/>}/>
                {/* <Route path="/about" element={<About/>} /> */}
                <Route path="/businessSignUp" element={<BusinessSignUp/>}/>
            </Routes>
        </BrowserRouter>
  );
}



export default App;
