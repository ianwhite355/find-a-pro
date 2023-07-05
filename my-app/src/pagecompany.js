import styled, { keyframes } from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import 'react-clock/dist/Clock.css';
import emailjs from "@emailjs/browser";
import Loader from "./Loader";

const progressBarAnimation = keyframes`
    0% { transform: scaleX(1); }
    100% { transform: scaleX(0); }
`;

const CompanyPage = () => {
	//every single useState, useParams that sort of stuff
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
    const [alreadySent, setAlreadySent] = useState(false)


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

	//all the following is on clicks and stuff

	const stringFormattedDay = JSON.stringify(formattedDate.day);

	const stringFormattedMonth = calendar.toLocaleString(undefined, { month: "long" });

	const stringFormattedYear = JSON.stringify(formattedDate.year);

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

	const sendEmail = (e) => {
		e.preventDefault();

		if (!calendar) {
			console.log("A date was not selected.");
			return;
		}

        if (alreadySent) {
            return;
        }

		const emailData = {
			day: stringFormattedDay || "day was not selected",
			month: stringFormattedMonth || "month was not selected",
			year: stringFormattedYear || "Years was not selected",
			data_email: data.email,
		};

        const jsonUserId = JSON.parse(storedUserId)

		const postData = {
			companyId: companyId,
			userId: jsonUserId,
			estimateDate: formattedDate,
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
					setSuccessMessage("Thank you!");
					setShowSuccessMessage(true);
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
			fetch(`/api/company/${companyId}`).then((response) => response.json()),
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

	// const timeSlotsForDay = dayOfWeek
	// 	? Object.entries(timeSlots.available).find(([day]) => {
	// 			return day.toLowerCase() === dayOfWeek.toLowerCase();
	// 	  })
	// 	: null;

	let selectedTimeSlots = [];

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

			selectedTimeSlots = timeAnotherSlotFormatted.filter((timeSlot) => {
				return !exclusions.some((exclusion) => {
					return JSON.stringify(timeSlot) === JSON.stringify(exclusion);
				});
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

	// console.log(selectedTimeSlots)

	return (
		<Container>
			<BackgroundImage src={data.image} />
			<ContentWrapper>
				<MainHeader>
					<Logo src={data.logo} />
					<div>
						<Name>{data.name}</Name>
						<p>reviews here later, on 5 stars</p>
					</div>
				</MainHeader>
				<Description>{data.description}</Description>
				<BookingSelection>
					<StyledCalendar onChange={handleCalendarChange} value={calendar} tileContent={getTileContent} />

					<DropdownContainer>
						<DropdownButton onClick={handleDropdownToggle}>Select a Time</DropdownButton>
						<DropdownMenu open={dropdownOpen}>{timeSlotButtons}</DropdownMenu>
						{selectedTime && <p>Selected Time: {selectedTime}</p>}
						{/* {sameTimeValue && <p>please choose an available day</p>} */}
					</DropdownContainer>
				</BookingSelection>

				{/* <form ref={form} onSubmit={sendEmail}>
                <input type="hidden" name="calendar" value={formattedDate || 'date was not selected'} />
                <input type="hidden" name="data_email" value={data.email} />
                <SubmitBook  type="submit">Book it!</SubmitBook>
            </form> */}
				<SubmitBook onClick={storedUserId ? sendEmail : () => navigate("/usersignin")}>Book it!</SubmitBook>

				<SuccessContainer>
					{showSuccessMessage && (
						<SuccessWrapper>
							<SuccessMessage>{successMessage}</SuccessMessage>
							<ProgressBar />
						</SuccessWrapper>
					)}
				</SuccessContainer>
			</ContentWrapper>
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
    
	width: 80%;
	min-height: 100vh;
	overflow: hidden;
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
	top: -50px;
	background-color: #ffffff;
	width: 80%;
	margin: 0 auto;
	padding: 20px;
	border-radius: 8px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 20px -10px;
	z-index: 1;
	min-height: 1000px;

	@media (max-width: 768px) {
		width: 90%;
		padding: 10px;
	}
`;

const Name = styled.p`
	font-size: 3em;
`;

const Description = styled.p`
	padding: 50px;
`;

const BookingSelection = styled.div`
	display: flex;
`;

const StyledCalendar = styled(Calendar)`
	position: relative;
	top: 100px;
	min-width: 600px;
	max-width: 100%;
	background-color: #fff;
	color: #222;
	border-radius: 8px;
	font-family: Arial, Helvetica, sans-serif;
	line-height: 1.125em;
	padding: 10px;
	box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
	visibility: visible;
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
	background-color: #f8f8f8;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #ebebeb;
	}
`;

const DropdownMenu = styled.div`
	position: absolute;
	top: 10%;
	left: 0;
	width: 100%;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	display: ${({ open }) => (open ? "block" : "none")};
`;

const TimeSlotButton = styled.button`
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
	position: relative;
	top: 150px;
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
	width: 200px;
	height: 10px;
	background-color: #2e1a47;
	animation: ${progressBarAnimation} 5s linear forwards;
	transform-origin: left;
	transform: translate(-100%);
	transform: scaleX(1);
	border-radius: 5px;
`;

export default CompanyPage;
