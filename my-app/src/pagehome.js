import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const HomePage = () => {
	const [query, setQuery] = useState("");
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isBusinessUser, setIsBusinessUser] = useState(false);

	const navigate = useNavigate();

	// const handleInputChange = (event) => {
	// 	setSearchValue(event.target.value);
	// };

	const handleClear = (event) => {
		event.preventDefault();
		setQuery("");
		// Perform search or other actions with searchValue
	};

	useEffect(() => {
		fetch("/api/alldata")
			.then((response) => response.json())
			.then((parse) => {
				setData(parse.data);
				setLoading(false);
			});
	}, []);

	const type = "type";

	useEffect(() => {
		const storedType = localStorage.getItem(type);
		const parsedType = JSON.parse(storedType);

		if (parsedType === "business") {
			setIsBusinessUser(true);
		}
	}, []);

	const windowWashingData = data.filter((company) => company.services.includes("windowwashing"));

	const poolCleaningData = data.filter((company) => company.services.includes("poolcleaning"));

	const paintingData = data.filter((company) => company.services.includes("painting"));

	if (loading) {
		return <Loader />;
	}

	if (isBusinessUser) {
		return (
			<>
				<p>this page is restricted to businesses, if you would like to use please make a regular account</p>
			</>
		);
	}

	return (
		<DisFlex>
			<MainBar>
				<SearchBar>
					<FlexDiv>
						<SearchInput type="text" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
						<SubmitButton type="submit" onClick={handleClear}>
							Clear
						</SubmitButton>
					</FlexDiv>
					{query &&
						data
							.filter((post) => {
								if (query === "") {
									return;
								} else if (post.name && post.name.toLowerCase().includes(query.toLowerCase())) {
									return post;
								}
							})
							.map((post, index) => {
								//they were printing as in the database so this is my solutio to making the services part better
								let services = "";
								if (post.services.includes("windowwashing")) {
									services = "Window Washing";
								}
								if (post.services.includes("painting")) {
									services = "Painting";
								}
								if (post.services.includes("poolcleaning")) {
									services = "Pool Cleaning";
								}
								return (
									<Suggestions key={post._id}>
										<StyledLink to={`/company/${post._id}`}>
											<p>{post.name}</p>
											<p>
												<i>services: {services}</i>
											</p>
										</StyledLink>
									</Suggestions>
								);
							})}
				</SearchBar>
			</MainBar>

			<ServicesDiv>
				<ServiceTitle>Window Washing</ServiceTitle>
				<Service>
					{windowWashingData.map((user) => (
						<ADiv key={user._id} onClick={() => navigate(`/company/${user._id}`)}>
							<ProjectImg src={user.image} />
							<ProjectName>{user.name}</ProjectName>
							<ProjectBook>Book Now!</ProjectBook>
						</ADiv>
					))}
				</Service>

				<ServiceTitle>Pool Cleaning</ServiceTitle>
				<Service>
					{poolCleaningData.map((user) => (
						<ADiv key={user._id} onClick={() => navigate(`/company/${user._id}`)}>
							<ProjectImg src={user.image} />
							<ProjectName>{user.name}</ProjectName>
							<ProjectBook>Book Now!</ProjectBook>
						</ADiv>
					))}
				</Service>

				<ServiceTitle>Painting</ServiceTitle>
				<Service>
					{paintingData.map((user) => (
						<ADiv key={user._id} onClick={() => navigate(`/company/${user._id}`)}>
							<ProjectImg src={user.image} />
							<ProjectName>{user.name}</ProjectName>
							<ProjectBook>Book Now!</ProjectBook>
						</ADiv>
					))}
				</Service>
			</ServicesDiv>
		</DisFlex>
	);
};

const DisFlex = styled.div``;

const MainBar = styled.div`
	width: 80%;
	height: 170px;
	margin-top: 50px;
	/* left: 50%;
	transform: translate(-50%, -50%); */
	margin-left: 10%;
	border-radius: 10px;
	background: linear-gradient(0.647turn, #101a72cc, #071b4ccc 0.01%, #071b4ccc 51.04%, #071b4c 99.1%);
	background-image: linear-gradient(0.647turn, rgba(16, 26, 114, 0.8), rgba(7, 27, 76, 0.6) 0.01%, rgba(7, 27, 76, 0.8) 51.04%, rgb(7, 27, 76) 99.1%);

	@media (min-width: 200px) and (max-width: 850px) {
		width: 80%;
	}
`;

const FlexDiv = styled.div`
	display: flex;
	margin-top: 20px;
`;

const SearchBar = styled.form`
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: center;
`;

const Suggestions = styled.div`
	text-align: left;
	width: 269px;
	border: gray 1px;
	/* width: 20rem; */
	padding-left: 10px;
	background-color: white;
	z-index: 10;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
`;

const SearchInput = styled.input`
	width: 200px;
	padding: 8px;
	border: 1px solid #ccc;
	/* margin-right: 8px; */
`;

const SubmitButton = styled.button`
	padding: 8px 15px;
	background-color: #4caf50;
	color: white;
	border: none;

	cursor: pointer;

	&:hover {
		background-color: #45a049;
	}
`;

const Background = styled.div``;

const ServicesDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ServiceTitle = styled.p`
	font-size: 3em;
	text-align: center;
	color: white;
	font-weight: bold;
	color: black;

	@media (min-width: 200px) and (max-width: 850px) {
		font-size: 2.2em;
	}
`;

const Service = styled.div`
	display: flex;
	flex-wrap: nowrap;
	color: white;
	width: 75%;
	border-radius: 15px;
	height: 375px;
	overflow-x: scroll;
	overflow-y: hidden;

	scrollbar-width: thin;
	scrollbar-color: #888888 #f4f4f4;
	scrollbar-track-color: #f4f4f4;
	scrollbar-face-color: #888888;

	@media (min-width: 200px) and (max-width: 850px) {
		height: 300px;
		width: 80%;
	}

	@media (min-width: 1922px) and (max-width: 2562px) {
		height: 350px;
	}

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background-color: #f4f4f4;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #888888;
		border-radius: 4px;
	}
`;

const ADiv = styled.div`
	bottom: 6px;
	display: inline-block;
	border-top: 1px solid lightgrey;
	border-bottom: 1px solid lightgrey;
	border-left: 1px solid lightgrey;
	border-right: 1px solid lightgrey;
	border-radius: 11px;
	overflow: hidden;
	margin: 15px;

	min-width: 260px;
	max-width: 260px;
	cursor: pointer;

	@media (min-width: 200px) and (max-width: 850px) {
		min-width: calc(100vw / 2);
		max-width: calc(100vw / 2);
		/* width: 275px;
        height: 500px; */
	}
`;

const AnotherOne = styled.div``;

const ProjectImg = styled.img`
	width: 260px;
	height: 150px;
	object-fit: cover;
	opacity: 1;
	transition: transform 0.3s ease-in-out;
	overflow: hidden;

	@media (min-width: 200px) and (max-width: 850px) {
		min-width: calc(100vw / 2);
		max-width: calc(100vw / 2);
		height: 150px;
		flex-shrink: 0;
	}

	@media (min-width: 1922px) and (max-width: 2562px) {
		width: 300px;
		height: 300px;
	}

	${ADiv}:hover & {
		transform: scale(1.1);
	}
`;

const ProjectName = styled.p`
	padding: 0px;
	font-weight: bold;
	position: relative;
	bottom: 15px;
	transition: opacity 0.3s ease;
	margin-left: 10px;
	z-index: 1;
	color: black;
	font-size: 1.3em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 265px;
	overflow-wrap: break-word;

	@media (min-width: 200px) and (max-width: 850px) {
		font-size: 1em;
	}
`;

const ProjectBook = styled.p`
	font-size: 1.3em;
	padding: 10px;
	font-weight: bold;

	z-index: 1;
	opacity: 1;
	color: black;
	@media (min-width: 200px) and (max-width: 850px) {
		top: 80%;
		width: 85px;
		font-size: 0.8em;
		margin-left: 37.5px;
	}
`;

export default HomePage;
