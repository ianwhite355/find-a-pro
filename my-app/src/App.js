
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import Header from "./header";
import HomePage from "./pagehome";
import CompanyPage from "./pagecompany";
import BusinessSignUp from "./Pagebusinesssignup";
import SignIn from "./pagesignin";
import UserSignUp from "./pageusersignup";
import Support from "./pagesupport";
import UsersJobs from "./pageuserjobs";
import BusinessSignIn from "./pagebusinesssignin";
import BusinessPage from "./pagebusiness";


const App = () => {

  const key = 'userData';


  const handleBeforeUnload = (event) => {
    const storedUserData = localStorage.getItem(key);
    const userData = JSON.parse(storedUserData);
  
    if (!userData || !userData.staySignedIn) {
      event.preventDefault();
      event.returnValue = '';
      localStorage.removeItem(key);
    } else {
      window.onbeforeunload = null;
    }
  };
  
  useEffect(() => {
    window.onbeforeunload = handleBeforeUnload;
  
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="/company/:companyId" element={<CompanyPage/>}/>
                <Route path="/usersjobs" element={<UsersJobs/>}/>
                <Route path="/businessSignUp" element={<BusinessSignUp/>}/>
                <Route path="/businesssignin" element={<BusinessSignIn/>}/>
                <Route path="/businesspage" element={<BusinessPage/>}/>
                <Route path="/usersignin" element={<SignIn/>} />
                <Route path="/usersignup" element={<UserSignUp/>}/>
                <Route path="/support" element={<Support/>}/>
            </Routes>
        </BrowserRouter>
  );
}



export default App;
