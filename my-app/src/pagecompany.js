import styled, { keyframes } from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import 'react-clock/dist/Clock.css';
import emailjs from "@emailjs/browser";
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

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getMonthName = (monthNumber) => {
	return months[monthNumber - 1] || ""; // Adjust monthNumber index if necessary
};

const progressBarAnimation = keyframes`
    0% { transform: scaleX(1); }
    100% { transform: scaleX(0); }
`;

const CompanyPage = ({ setConfirmationData }) => {
	//every single useState, useParams that sort of stuff
	const [userData, setUserData] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [calendar, setCalendar] = useState(new Date());
	const { companyId } = useParams();
	const [successMessage, setSuccessMessage] = useState("");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedTime, setSelectedTime] = useState("");
	const [timeSlots, setTimeSlots] = useState([]);
	const [exclusions, setExclusions] = useState([]);
	const [dayOfWeek, setDayOfWeek] = useState(null);
	const [sameTimeValue, setSameTimeValue] = useState(false);
	const [alreadySent, setAlreadySent] = useState(false);
	const [notSelected, setNotSelected] = useState("")

	const navigate = useNavigate();

	//this is to format the data to {day: 21, month: 7, year: 2023} instead of Fri Jul 21 2023 00:00:00 GMT-0400 (Eastern Daylight Time), makes it easier to change
	//also wayyyyyyy easier to work with and gives it a real data structure

	const storedUserId = localStorage.getItem("userData");

	const formattedDate = {
		day: calendar.getDate(),
		month: calendar.getMonth() + 1,
		year: calendar.getFullYear(),
		time: selectedTime,
	};

	const stringFormattedDay = JSON.stringify(formattedDate.day);

	const stringFormattedMonth = calendar.toLocaleString(undefined, { month: "long" });

	const stringFormattedYear = JSON.stringify(formattedDate.year);
	const stringTime = JSON.stringify(selectedTime);

	const handleDropdownToggle = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleTimeSlotSelection = (time) => {
		setSelectedTime(time);
		setDropdownOpen(false);
	};

	const handleCalendarChange = (date) => {
		setCalendar(date);
		const selectedDayOfWeek = date.toLocaleDateString(undefined, { weekday: "long" });
		setDayOfWeek(selectedDayOfWeek);
	};

	const jsonUserId = JSON.parse(storedUserId);

	const sendEmail = (e) => {
		e.preventDefault();
		setConfirmationData({
			time: formattedDate,
			companyName: data.name,
		});

		if (!calendar) {
			setNotSelected("A date was not selected.");
			setShowSuccessMessage(true);
			return;
		}

		if (!selectedTime) {
			setNotSelected("A time was not selected.");
			setShowSuccessMessage(true);
			return;
		}



		if (alreadySent) {
			return;
		}

		const userName = userData.firstName + " " + userData.lastName;

		const emailData = {
			day: stringFormattedDay || "day was not selected",
			month: stringFormattedMonth || "month was not selected",
			year: stringFormattedYear || "Years was not selected",
			time: stringTime || "Time was not selected",
			data_email: data.email,
			firstName: userData.firstName,
			lastName: userData.lastName,
			userEmail: userData.email,
			userNumber: userData.phoneNumber,
		};

		formattedDate.type = "jobs";
		console.log(formattedDate);

		const postData = {
			companyId: companyId,
			userId: jsonUserId,
			estimateDate: formattedDate,
			companyName: data.name,
			userName: userName,
			userEmail: userData.email,
			userNumber: userData.phoneNumber,
		};

		Promise.all([
			fetch("/api/estimate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			}),
			emailjs.send("service_giwexjs", "template_7ri4ars", emailData, "EEwDD0w5lZNfVQ4V3"),
		])
			.then(([estimateResponse, emailResponse]) => {
				if (estimateResponse.status === 200 && emailResponse.status === 200) {
					setAlreadySent(true);
					navigate("/confirmation");
				} else {
					console.log("Post or email sending failed");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		let timer;
		if (showSuccessMessage) {
			timer = setTimeout(() => {
				setShowSuccessMessage(false);
			}, 5000);
		}

		return () => clearTimeout(timer);
	}, [showSuccessMessage]);

	useEffect(() => {
		Promise.all([
			fetch(`/api/companygetnopass/${companyId}`).then((response) => response.json()),
			fetch(`/api/timeslots/${companyId}`).then((response) => response.json()),
		])
			.then(([companyData, timeslotData]) => {
				setData(companyData.data);
				setTimeSlots(timeslotData.data);
				setExclusions(timeslotData.data.exclusions);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [companyId]);

	useEffect(() => {
		if (jsonUserId) {
			fetch(`/api/getuser/${jsonUserId}`)
				.then((response) => response.json())
				.then((parse) => {
					setUserData(parse.data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}, [jsonUserId]);

	if (
		exclusions.some(
			(exclusion) =>
				exclusion.day === formattedDate.day &&
				exclusion.month === formattedDate.month &&
				exclusion.year === formattedDate.year &&
				exclusion.time === formattedDate.time
		) &&
		!sameTimeValue
	) {
		setSameTimeValue(true);
	}

	const getTileContent = ({ date, view }) => {
		if (view === "month") {
			// const selectedDayOfWeek = date.getDay();
		}

		return null;
	};

	let selectedTimeSlots = [];

	//dont even ask about the following mess, It works, not sure how but it works and thats the important part, a mess to say the least

	if (dayOfWeek) {
		const timeAnotherSlot = Object.entries(timeSlots.available).find(([day]) => {
			return day.toLowerCase() === dayOfWeek.toLowerCase();
		});

		if (timeAnotherSlot) {
			const timeAnotherSlotFormatted = timeAnotherSlot[1].map((time) => {
				return {
					day: calendar.getDate(),
					month: calendar.getMonth() + 1,
					year: calendar.getFullYear(),
					time: time,
				};
			});

			const uniqueTimeSlots = [];

			timeAnotherSlotFormatted.forEach((time) => {
				const foundTime = uniqueTimeSlots.find((uniqueTimeSlot) => {
					return time.time === uniqueTimeSlot.time.time;
				});
				if (foundTime) {
					foundTime.adding += 1;
				} else {
					uniqueTimeSlots.push({
						day: calendar.getDate(),
						month: calendar.getMonth() + 1,
						year: calendar.getFullYear(),
						time: time.time,
						adding: 1,
					});
				}
			});

			const mergedTimeSlots = [];
			uniqueTimeSlots.forEach((timeSlot) => {
				const existingSlot = mergedTimeSlots.find((slot) => slot.time === timeSlot.time);
				if (existingSlot) {
					existingSlot.adding += timeSlot.adding;
				} else {
					mergedTimeSlots.push(timeSlot);
				}
			});

			const noAddingMergedTimeSlots = mergedTimeSlots.map(({ adding, ...rest }) => rest);

			selectedTimeSlots = noAddingMergedTimeSlots.filter((timeSlot, index) => {
				let matchedCount = 0;
				exclusions.forEach((exclusion) => {
					if (JSON.stringify(timeSlot) === JSON.stringify(exclusion)) {
						matchedCount += 1;
					}
				});

				return matchedCount < mergedTimeSlots[index].adding;
			});
		}
	}

	let timeSlotButtons;

	if (selectedTimeSlots.length > 0) {
		timeSlotButtons = selectedTimeSlots.map((timeSlot, index) => (
			<TimeSlotButton key={index} onClick={() => handleTimeSlotSelection(timeSlot.time)}>
				{timeSlot.time}
			</TimeSlotButton>
		));
	} else {
		timeSlotButtons = <p>Please choose an available day</p>;
	}

	if (loading) {
		return <Loader />;
	}

	let ratingTotal = 0;
	let reviews;
	let averageRating;
	let starPath;

	if (data.reviews.length === 0) {
		starPath = starImages[ratingTotal];
	} else if (data.reviews.length > 0) {
		reviews = data.reviews.map((review) => {
			ratingTotal += review.overallRating;
			
			return (
				<IndividualReview key={review._id}>
					<ReviewName>{review.userName}</ReviewName>
					<PartOfReview>
						<ReviewDataWrapper>
							<ReviewStarImage src={starImages[review.overallRating]} />
							<ReviewDate>
								Written in {getMonthName(review.date.month)} {review.date.year}
							</ReviewDate>
						</ReviewDataWrapper>
						<ReviewDataWrapper>
							<ReviewLabel>Overall <Red>{review.overallRating}</Red> &#8226;</ReviewLabel>
							<ReviewLabel>Service <Red>{review.serviceRating}</Red> &#8226;</ReviewLabel>
							<ReviewLabel>Quality <Red>{review.qualityRating}</Red></ReviewLabel>
						</ReviewDataWrapper>
						<p>{review.description}</p>
					</PartOfReview>
					
				</IndividualReview>
			);
		});
		averageRating = (ratingTotal / data.reviews.length).toFixed(1);
		const roundedRating = Math.round(averageRating * 2) / 2;
		starPath = starImages[roundedRating.toString()];
	}

	return (
		<Container>
			<BackgroundImage src={data.image} />
			<ContentContainer>
				<ContentWrapper>
					<MainHeader>
						<Logo src={data.logo} />
						<div>
							<Name>{data.name}</Name>
							{data.reviews.length === 0 ? (
								<>
									<StarImage src={starPath} alt="Rating" />
									<p>No reviews yet</p>
								</>
							) : (
								<>
									<StarImage src={starPath} alt="Rating" />
									<p>
										{averageRating}/5 out of {data.reviews.length} reviews
									</p>
								</>
							)}
							<p>{data.number}</p>
							<p>{data.email}</p>
						</div>
					</MainHeader>
					<Description>{data.description}</Description>
					{data.reviews.length === 1 ? (
						<ReviewTitle>What {data.reviews.length} person is saying</ReviewTitle>
					) : (
						<ReviewTitle>What {data.reviews.length} people are saying</ReviewTitle>
					)}
					{/* <ReviewTotal> reviews</ReviewTotal> */}
					<div>{reviews}</div>
				</ContentWrapper>
				<SeperateDiv>
					<BookTitle>Book a day!</BookTitle>
					<BookingSelection>
						<StyledCalendar onChange={handleCalendarChange} value={calendar} tileContent={getTileContent} />

						<DropdownContainer>
							<DropdownButton onClick={handleDropdownToggle}>Select a Time</DropdownButton>
							<DropdownMenu open={dropdownOpen}>{timeSlotButtons}</DropdownMenu>
							{selectedTime && <p>Selected Time: {selectedTime}</p>}
							{/* {sameTimeValue && <p>please choose an available day</p>} */}
						</DropdownContainer>
					</BookingSelection>
					<SubmitBook onClick={storedUserId ? sendEmail : () => navigate("/usersignin")}>Book it!</SubmitBook>

					
				</SeperateDiv>
			</ContentContainer>
			<SuccessContainer>
						{showSuccessMessage && (
							<SuccessWrapper>
								<SuccessMessage>{notSelected}</SuccessMessage>
								<ProgressBar />
							</SuccessWrapper>
						)}
			</SuccessContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	left: 50%;
	transform: translate(-50%);
	box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 20px -10px;
	width: 87%;
	min-height: 100vh;
	overflow: hidden;
`;

const SeperateDiv = styled.div`
	position: relative;
	top: -60px;
	background-color: #ffffff;
	/* position: relative;
	right: 300px; */
	padding: 20px;
	border-radius: 8px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 20px -10px;
	z-index: 1;
	margin: 20px;
	height: 600px;
	min-width: 650px;
`;

const ContentContainer = styled.div`
	display: flex;
`;

const BackgroundImage = styled.img`
	width: 100%;
	height: 60vh; /* Adjust the height as needed */
	object-fit: cover;
`;

const MainHeader = styled.div`
	display: flex;
`;

const Logo = styled.img`
	width: 200px;
	height: 200px;
	border-radius: 10px;
	border: 2px grey solid;
	margin-right: 15px;
`;

const ContentWrapper = styled.div`
	position: relative;
	top: -60px;
	background-color: #ffffff;
	width: 80%;
	margin: 0 auto;
	padding: 20px;
	border-radius: 8px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 20px -10px;
	z-index: 1;
	margin: 20px;
	min-height: 100%;
	width: 800px;

	@media (max-width: 768px) {
		width: 90%;
		padding: 10px;
	}
`;

const Name = styled.p`
	font-size: 3em;
	margin-bottom: 30px;
`;

const StarImage = styled.img`
	width: 110px;
	height: 19px;
`;

const Description = styled.p`
	padding: 20px;
`;

const ReviewTitle = styled.p`
	text-align: center;
	font-size: 2em;
`

const IndividualReview = styled.div`
	display: flex;
	border-bottom: 0.0625rem solid #d8d9db;
	align-items: center;
`;

const ReviewName = styled.p`
	padding: 20px;
	border-right: 0.0625rem solid #d8d9db;
	height: 60px;
`

const ReviewTotal = styled.p`
	font-size: .875rem;
    font-weight: 700;
    line-height: 1.25rem;
`

const PartOfReview = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
`;

const ReviewStarImage = styled.img`
	width: 110px;
	height: 19px;
	margin-top:	13px ;
	margin-right: 5px;
`;

const ReviewDate = styled.p`
	margin-bottom: 5px;
`

const ReviewDataWrapper = styled.div`
	display: flex;
`;

const Red = styled.span`
	color: red;
`

const ReviewLabel = styled.p`
	font-weight: bold;
	margin-right: 10px;
`;

const BookingSelection = styled.div`
	display: flex;
`;

const BookTitle = styled.p`
	text-align: center;
	font-size: 3em;
`;

const StyledCalendar = styled(Calendar)`
	position: relative;
	/* top: 100px; */
	min-width: 500px;
	max-width: 100%;
	background-color: #fff;
	color: #222;
	border-radius: 8px;
	font-family: Arial, Helvetica, sans-serif;
	line-height: 1.125em;
	padding: 10px;

	margin-right: 10px;

	.react-calendar__navigation button {
		color: #6f48eb;
		min-width: 44px;
		background: none;
		font-size: 16px;
		margin-top: 8px;

		&:enabled:hover,
		&:enabled:focus {
			background-color: #f8f8fa;
		}

		&[disabled] {
			background-color: #f0f0f0;
		}
	}

	abbr[title] {
		text-decoration: none;
	}

	.react-calendar__tile {
		&:enabled:hover,
		&:enabled:focus {
			background: #f8f8fa;
			color: #6f48eb;
			border-radius: 6px;
		}
	}

	.react-calendar__tile--now {
		background: #6f48eb33;
		border-radius: 6px;
		font-weight: bold;
		color: #6f48eb;

		&:enabled:hover,
		&:enabled:focus {
			background: #6f48eb33;
			border-radius: 6px;
			font-weight: bold;
			color: #6f48eb;
		}
	}

	.react-calendar__tile--hasActive:enabled:hover,
	.react-calendar__tile--hasActive:enabled:focus {
		background: #f8f8fa;
	}

	.react-calendar__tile--active {
		background: #6f48eb;
		border-radius: 6px;
		font-weight: bold;
		color: white;

		&:enabled:hover,
		&:enabled:focus {
			background: #6f48eb;
			color: white;
		}
	}

	.react-calendar--selectRange .react-calendar__tile--hover {
		background-color: #f8f8fa;
	}

	.react-calendar__tile--range {
		background: #f8f8fa;
		color: #6f48eb;
		border-radius: 0;
	}

	.react-calendar__tile--rangeStart {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		background: #6f48eb;
		color: white;
	}

	.react-calendar__tile--rangeEnd {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
		background: #6f48eb;
		color: white;
	}
`;

const DropdownContainer = styled.div`
	position: relative;
	display: inline-block;
`;

const DropdownButton = styled.button`
	padding: 8px 16px;
	font-size: 1em;
	color: white;
	background-color: #2196f3;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.5s ease-in-out;

	&:hover {
		background-color: darkblue;
	}
`;

const DropdownMenu = styled.div`
	position: absolute;
	top: 50px;
	left: 0;
	width: 100%;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	display: ${({ open }) => (open ? "block" : "none")};
	max-height: 260px;
	overflow-y: auto;

	/* Scrollbar Styles */
	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`;

const TimeSlotButton = styled.button`
	position: relative;
	display: block;
	width: 100%;
	padding: 8px;
	margin-bottom: 4px;
	background-color: #f8f8f8;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #ebebeb;
	}
`;

const SubmitBook = styled.button`
	margin-top: 30px;
	padding: 10px;
	position: relative;
	left: 50%;
	transform: translate(-50%);
	font-size: 1.5em;
	background-color: #17b169;
	color: white;
	border: none;
	border-radius: 10px;
	transition: background-color 0.3s ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: #018749;
	}
`;

const SuccessContainer = styled.div`
	position: fixed;
	top: 60px;
	right: 50px;
`;

const SuccessWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #4caf50;

	border-radius: 5px;
`;

const SuccessMessage = styled.div`
	color: white;
	padding: 20px;
	font-size: 1.5em;
`;

const ProgressBar = styled.div`
	position: relative;
	bottom: 0px;
	width: 100%;
	height: 10px;
	background-color: #2e1a47;
	animation: ${progressBarAnimation} 5s linear forwards;
	transform-origin: left;
	transform: translate(-100%);
	transform: scaleX(1);
	border-radius: 5px;
`;

export default CompanyPage;
