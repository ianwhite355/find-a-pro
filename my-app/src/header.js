import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "./hamburger";

export const Header = () => {
	const key = "userData";
	const type = "type";

	const [isBusinessUser, setIsBusinessUser] = useState(false);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const storedType = localStorage.getItem(type);
		const parsedType = JSON.parse(storedType);

		if (parsedType === "business") {
			setIsBusinessUser(true);
		}

		setLoading(false);
	}, []);

	const storedUserData = localStorage.getItem("userData");
	const userData = JSON.parse(storedUserData);
	const isLoggedIn = userData;

	const handleSignOut = (event) => {
		localStorage.removeItem(type);
		localStorage.removeItem(key);
		navigate("/");
		window.location.reload();
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Heading>
			<Hamburger />
			{isBusinessUser ? <HomeLink to="/businessjobs">Find Your Pro</HomeLink> : <HomeLink to="/">Find Your Pro</HomeLink>}

			{isLoggedIn ? (
				<AlreadyIn>
					<SignOut onClick={handleSignOut}>Sign Out</SignOut>
				</AlreadyIn>
			) : (
				<Sign to="/usersignin">Sign in</Sign>
			)}
		</Heading>
	);
};

const Heading = styled.div`
	position: relative;
	top: 0%;
	color: white;
	display: flex;
	justify-content: space-between;
	height: 68px;
	border-bottom: 3px solid lightgrey;

	@media (min-width: 200px) and (max-width: 850px) {
		height: 60px;
		font-size: 0.5em;
	}
`;

const HomeLink = styled(Link)`
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	margin-top: 10px;
	text-decoration: none;
	color: black;
	font-size: 2.6em;
	font-weight: bold;

	&::before {
		content: "";
		position: absolute;
		display: block;
		width: 100%;
		height: 3px;
		bottom: 12px;
		left: 0;
		background-color: #3457D5;
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	&:hover::before {
		transform: scaleX(1);
		cursor: pointer;
	}
`;

const AlreadyIn = styled.div`
	display: flex;
	position: relative;
	right: 10px;
	bottom: 10px;
	align-items: center;
`;

const Welcome = styled.div`
	padding: 20px;
	font-size: 2em;

	color: black;
	@media (min-width: 200px) and (max-width: 850px) {
		bottom: 10px;
	}
`;

const SignOut = styled.p`
	position: relative;
	right: 10px;
	top: 10px;
	text-decoration: none;
	font-size: 2em;
	background-color: #3457D5;
	color: white;
	border-radius: 10px;
	padding-top: 8px;
	padding-bottom: 12px;
	padding-left: 20px;
	padding-right: 20px;

	@media (min-width: 200px) and (max-width: 850px) {
		bottom: 10px;
	}
`;

const Sign = styled(Link)`
	border-radius: 10px;
	text-decoration: none;
	max-height: 33px;
	padding-top: 8px;
	padding-bottom: 12px;
	padding-left: 20px;
	padding-right: 20px;
	/* padding: 10px 20px; */
	font-size: 2em;
	position: relative;
	background-color: #3457D5;
	color: white;
	right: 10px;
	top: 8px;

	@media (min-width: 200px) and (max-width: 850px) {
		bottom: 10px;
	}
`;

export default Header;
