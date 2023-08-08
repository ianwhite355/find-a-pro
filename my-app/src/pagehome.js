import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import star0 from "./images/0stars.png";
import star05 from "./images/0.5stars.png";
import star1 from "./images/1stars.png";
import star15 from "./images/1.5stars.png";
import star2 from "./images/2stars.png";
import star25 from "./images/2.5stars.png";
import star3 from "./images/3stars.png";
import star35 from "./images/3.5stars.png";
import star4 from "./images/4stars.png";
import star45 from "./images/4.5stars.png";
import star5 from "./images/5stars.png";

//alot of the css on this page is not really "clean" code but its all temporary so please do ignore that

const starImages = {
	0: star0,
	0.5: star05,
	1: star1,
	1.5: star15,
	2: star2,
	2.5: star25,
	3: star3,
	3.5: star35,
	4: star4,
	4.5: star45,
	5: star5,
};

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
		fetch("/api/alldata")
			.then((response) => response.json())
			.then((parse) => {
				setData(parse.data);
				setLoading(false);
			});
	}, []);

	const windowWashingData = data.filter((company) => company.services.includes("Window Washing"));

	const poolCleaningData = data.filter((company) => company.services.includes("Pool Cleaning"));

	const paintingData = data.filter((company) => company.services.includes("Painting"));

	if (loading) {
		return <Loader />;
	}

	//this is to not allow a business to go to the home page, so they cant book jobs and do all that unless they make another account as a normal user

	if (isBusinessUser) {
		navigate("/businessjobs");
	}

	return (
		<div>
			<div className="MainBar">
				<div className="SearchBar">
					<div className="FlexDiv">
						<input className="SearchInput" type="text" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
						<button className="SubmitButton" type="submit" onClick={handleClear}>
							Clear
						</button>
					</div>
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
									<div key={post._id} className="Suggestions">
										<a href={`/company/${post._id}`}>
											<p>{post.name}</p>
											<p>
												<i>services: {services}</i>
											</p>
										</a>
									</div>
								);
							})}
				</div>
			</div>

			<div className="ServicesDiv">
				<div className="ServiceTitle">Window Washing</div>
				<div className="Service">
					{windowWashingData.map((user) => {
						let ratingTotal = 0;
						let reviews;
						let averageRating;
						let starPath;

						if (user.reviews.length === 0) {
							starPath = starImages[ratingTotal.toString()];
						} else if (user.reviews.length > 0) {
							reviews = user.reviews.map((review) => {
								ratingTotal += review.overallRating;
							});
							averageRating = (ratingTotal / user.reviews.length).toFixed(1);
							const roundedRating = Math.round(averageRating * 2) / 2;
							starPath = starImages[roundedRating.toString()];
						}

						return (
							<div key={user._id} className="ADiv" onClick={() => navigate(`/company/${user._id}`)}>
								<img className="ProjectImg" src={user.image} />
								<div className="NonImage">
									<div className="ProjectName">{user.name}</div>
									<div className="RatingDiv">
										<img className="ProjectStarImage" src={starPath} />
										<div className="RatingCount">{user.reviews.length} reviews</div>
									</div>
									<div className="LittleServiceDiv">
										{user.services.map((user) => (
											<div key={user} className="ServiceLittleOne">
												{user}
											</div>
										))}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className="ServiceTitle">Pool Cleaning</div>
				<div className="Service">
					{poolCleaningData.map((user) => {
						let ratingTotal = 0;
						let reviews;
						let averageRating;
						let starPath;

						if (user.reviews.length === 0) {
							starPath = starImages[ratingTotal.toString()];
						} else if (user.reviews.length > 0) {
							reviews = user.reviews.map((review) => {
								ratingTotal += review.overallRating;
							});
							averageRating = (ratingTotal / user.reviews.length).toFixed(1);
							const roundedRating = Math.round(averageRating * 2) / 2;
							starPath = starImages[roundedRating.toString()];
						}

						return (
							<div key={user._id} className="ADiv" onClick={() => navigate(`/company/${user._id}`)}>
								<img className="ProjectImg" src={user.image} />
								<div className="NonImage">
									<div className="ProjectName">{user.name}</div>
									<div className="RatingDiv">
										<img className="ProjectStarImage" src={starPath} />
										<div className="RatingCount">{user.reviews.length} reviews</div>
									</div>
									<div className="LittleServiceDiv">
										{user.services.map((user) => (
											<div key={user} className="ServiceLittleOne">
												{user}
											</div>
										))}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className="ServiceTitle">Painting</div>
				<div className="Service">
					{paintingData.map((user) => {
						let ratingTotal = 0;
						let reviews;
						let averageRating;
						let starPath;

						if (user.reviews.length === 0) {
							starPath = starImages[ratingTotal.toString()];
						} else if (user.reviews.length > 0) {
							reviews = user.reviews.map((review) => {
								ratingTotal += review.rating;
							});
							averageRating = (ratingTotal / user.reviews.length).toFixed(1);
							const roundedRating = Math.round(averageRating * 2) / 2;
							starPath = starImages[roundedRating.toString()];
						}

						return (
							<div key={user._id} className="ADiv" onClick={() => navigate(`/company/${user._id}`)}>
								<img className="ProjectImg" src={user.image} />
								<div className="NonImage">
									<div className="ProjectName">{user.name}</div>
									<div className="RatingDiv">
										<img className="ProjectStarImage" src={starPath} />
										<div className="RatingCount">{user.reviews.length} reviews</div>
									</div>
									<div className="LittleServiceDiv">
										{user.services.map((user) => (
											<div key={user} className="ServiceLittleOne">
												{user}
											</div>
										))}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
