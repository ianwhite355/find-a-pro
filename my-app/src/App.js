import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import Confirmation from "./confirmation";
import BusinessJobs from "./businessjobs";
import Schedule from "./weeklycalendar";
import { GlobalStyles } from "./globalstyles";
const App = () => {
	const key = "userData";
	const type = "type";

	const [isBusinessUser, setIsBusinessUser] = useState(false);
    const [confirmationData, setConfirmationData] = useState()

	useEffect(() => {
		const storedType = localStorage.getItem("type");
        const parsedType = JSON.parse(storedType);

        if (parsedType === "business") {
            setIsBusinessUser(true);
        }
	}, []);

	const handleBeforeUnload = (event) => {
		const storedUserData = localStorage.getItem(key);
		const storedType = localStorage.getItem(type);
		const someType = JSON.parse(storedType);
		const userData = JSON.parse(storedUserData);

		if (!userData || !userData.staySignedIn) {
			event.preventDefault();
			event.returnValue = "";
			localStorage.removeItem(key);
			localStorage.removeItem(type);
		} else {
			window.onbeforeunload = null;
		}
	};

	// useEffect(() => {
	// 	window.onbeforeunload = handleBeforeUnload;

	// 	return () => {
	// 		window.onbeforeunload = null;
	// 	};
	// }, []);

	return (
		<BrowserRouter>
		<GlobalStyles />
            <Header/>
			<Routes>
				<Route path="" element={<HomePage />} />
				<Route path="/company/:companyId" element={<CompanyPage setConfirmationData={setConfirmationData}/>}  />
				<Route path="/usersjobs" element={<UsersJobs />} />
				<Route path="/businessSignUp" element={<BusinessSignUp />} />
				<Route path="/businesssignin" element={<BusinessSignIn />} />
				<Route path="/businesspage" element={<BusinessPage />} />
                <Route path="/businessjobs" element={<BusinessJobs/>}/>
				<Route path="business/schedule" element={<Schedule/>}/>
				<Route path="/usersignin" element={<SignIn />} />
				<Route path="/usersignup" element={<UserSignUp />} />
				<Route path="/support" element={<Support />} />
                <Route path="/confirmation" element={<Confirmation confirmationData={confirmationData}/>} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
