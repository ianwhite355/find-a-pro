import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "./hamburger";

export const Header = () => {
	const key = "userData";
	const type = "type";

	const [isBusinessUser, setIsBusinessUser] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const storedType = localStorage.getItem(type);
		const parsedType = JSON.parse(storedType);

		if (parsedType === "business") {
			setIsBusinessUser(true);
		}
	}, []);

	const storedUserData = localStorage.getItem("userData");
	const userData = JSON.parse(storedUserData);
	const isLoggedIn = userData;

	const handleSignOut = (event) => {
		localStorage.removeItem(type);
		localStorage.removeItem(key);
		navigate("/");
	};

	return (
		<Heading>
			<Hamburger />
			{isBusinessUser ? <HomeLink to="/businesspage">logo here</HomeLink> : <HomeLink to="/">logo here</HomeLink>}

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
	font-size: 1em;
	display: flex;
	justify-content: space-between;
	height: 75px;

	@media (min-width: 200px) and (max-width: 850px) {
		height: 60px;
		font-size: 0.5em;
	}
`;

const HomeLink = styled(Link)`
	position: relative;
	left: 50%;
	transform: translate(-55%);
	padding: 10px;
	text-decoration: none;
	font-size: 1.8em;
	font-weight: bold;
	position: relative;

	&::before {
		content: "";
		position: absolute;
		display: block;
		width: 100%;
		height: 2px;
		bottom: 20px;
		left: 0;
		background-color: white;
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	&:hover::before {
		transform: scaleX(1);
		cursor: pointer;
	}

	& + div {
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
	text-decoration: underline;
	font-size: 2em;

	color: black;
	@media (min-width: 200px) and (max-width: 850px) {
		bottom: 10px;
	}
`;

const Sign = styled(Link)`
	/* text-decoration:none; */
	padding: 20px;
	font-size: 2em;
	position: relative;
	right: 10px;
	bottom: 10px;
	color: black;
	@media (min-width: 200px) and (max-width: 850px) {
		bottom: 10px;
	}
`;

export default Header;
