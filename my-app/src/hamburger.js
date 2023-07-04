import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import menusvgclose from "./images/menusvgclose.png";
import menusvgopen from "./images/menusvgopen.png";
import { Link } from "react-router-dom";

const Hamburger = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isBusinessUser, setIsBusinessUser] = useState(false);

	const type = "type";

	useEffect(() => {
		const storedType = localStorage.getItem(type);
		const parsedType = JSON.parse(storedType);

		if (parsedType && parsedType === "business") {
			setIsBusinessUser(true);
		}
	}, []);

	const storedUserData = localStorage.getItem("userData");
	const userData = JSON.parse(storedUserData);
	const isLoggedIn = userData;

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	console.log(isBusinessUser);

	return (
		<>
			{isLoggedIn ? (
				<>
					<Burger isOpen={isOpen} onClick={toggleMenu} />
					<Menu isOpen={isOpen} onClick={toggleMenu}>
						<Nav isOpen={isOpen}>
							{isBusinessUser ? (
								<>
									<NavLink href="#" style={{ animationDelay: "0.2s" }} to="/">
										Home
									</NavLink>
									<NavLink href="#" style={{ animationDelay: "0.3s" }} to="/usersjobs">
										Your jobs
									</NavLink>
									<NavLink href="#" style={{ animationDelay: "0.4s" }} to="/business/schedule">
										Set up schedule
									</NavLink>
									<NavLink href="#" style={{ animationDelay: "0.5s" }} to="/support">
										Contact support
									</NavLink>
								</>
							) : (
								<>
									<NavLink href="#" style={{ animationDelay: "0.2s" }} to="/">
										Home
									</NavLink>
									<NavLink href="#" style={{ animationDelay: "0.3s" }} to="/usersjobs">
										Your jobs
									</NavLink>
									<NavLink href="#" style={{ animationDelay: "0.4s" }} to="/businessSignUp">
										Sign up your business
									</NavLink>
									<NavLink href="#" style={{ animationDelay: "0.5s" }} to="/support">
										Contact support
									</NavLink>
								</>
							)}
						</Nav>
					</Menu>
				</>
			) : (
				<>
					<Burger isOpen={isOpen} onClick={toggleMenu} />
					<Menu isOpen={isOpen} onClick={toggleMenu}>
						<Nav isOpen={isOpen}>
							<NavLink href="#" style={{ animationDelay: "0.2s" }} to="/">
								Home
							</NavLink>
							<NavLink href="#" style={{ animationDelay: "0.3s" }} to="/businesssignin">
								Business login
							</NavLink>
							<NavLink href="#" style={{ animationDelay: "0.4s" }} to="/businessSignUp">
								Sign up your business
							</NavLink>
							<NavLink href="#" style={{ animationDelay: "0.5s" }} to="/support">
								Contact support
							</NavLink>
						</Nav>
					</Menu>
				</>
			)}
		</>
	);
};

const MenuButton = styled.button`
	border: 0;
	padding: 0;
	background: transparent;
	cursor: pointer;
`;

const Burger = styled(MenuButton)`
	margin: 10px;
	position: absolute;
	z-index: 3;
	top: 0;
	left: 0;
	display: grid;
	place-items: center;
	width: 50px;
	height: 50px;
	background-image: url(${menusvgclose});
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;

	${({ isOpen }) =>
		isOpen &&
		`
            background-size: 110%;
            background-image: url(${menusvgopen});
    `}
	@media (min-width: 200px) and (max-width:850px) {
		width: 30px;
		height: 30px;
	}
`;

const Menu = styled.div`
	position: fixed;
	z-index: 2;
	top: 0;
	left: 0;
	display: grid;
	place-items: center;
	width: 400px;
	height: 100%;
	background: #07030a;
	transform: ${({ isOpen }) => (isOpen ? "translate(0)" : "translate(-100%, 0)")};
	opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
	visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
	transition: transform 0.375s cubic-bezier(0.175, 0.885, 0.32, 1);
	animation: ${({ isOpen }) => (isOpen ? menuInAnimation : "")} 0.375s;
	@media (min-width: 200px) and (max-width: 500px) {
		width: 100vw;
	}
`;

const menuInAnimation = keyframes`
    0% {
        clip-path: ellipse(60% 60% at 0% 50%);
    }
    100% {
        clip-path: ellipse(120% 120% at 0% 50%);
    }
`;

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
	opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
`;

const NavLink = styled(Link)`
	position: relative;
	color: #f9f9f9;
	font-size: 32px;
	font-family: "Euclid Circular A";
	padding: 20px 0;
	width: 300px;
	text-decoration: none;
	transition: 0.4s;

	&::before,
	&::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 10px;
		width: 100%;
		height: 2px;
		border-radius: 2px;
		transition: 0.4s;
	}

	&::before {
		opacity: 0;
		background: rgba(255, 255, 255, 0.2);
	}

	&::after {
		transform: scaleX(0);
		transform-origin: 0% 50%;
		background: #f7f7f7;
	}

	&:hover::before {
		opacity: 1;
	}

	&:hover::after {
		transform: scaleX(1);
	}

	${({ isOpen }) =>
		isOpen &&
		`
        animation: ${appearAnimation} 0.25s backwards;
    `}

	@media (min-width: 200px) and (max-width:320px) {
		margin-left: 15px;
		font-size: 3.2em;
	}
`;

const appearAnimation = keyframes`
    0% {
        opacity: 0;
    transform: translate(-30px, 0);
    }
    100% {
        opacity: 1;
    }
`;

export default Hamburger;
