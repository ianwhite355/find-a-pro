import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import Calendar from "react-calendar";
import downArrow from "./images/down-arrow.png";
import upArrow from "./images/up-arrow.png";

import "react-calendar/dist/Calendar.css";
//This was a good project learn alot its very practical, but working with a Calendar was the biggest pain, worth it tho

const theTimeSlots = Array.from({ length: 35 }, (_, index) => {
	const hours = Math.floor(index / 2) + 5; // Start from 5 AM
	const minutes = (index % 2) * 30;
	const time = new Date(0, 0, 0, hours, minutes);
	return time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
});

const Schedule = () => {
	const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

	const daysTimeSlots = {
		monday: theTimeSlots,
		tuesday: theTimeSlots,
		wednesday: theTimeSlots,
		thursday: theTimeSlots,
		friday: theTimeSlots,
		saturday: theTimeSlots,
		sunday: theTimeSlots,
	};

	const [selectedDay, setSelectedDay] = useState("");
	const [selectedTime, setSelectedTime] = useState(null);
	const [data, setData] = useState(null);
	const [timeSlots, setTimeSlots] = useState(null);
	const [exclusions, setExclusions] = useState([]);
	const [loading, setLoading] = useState(null);
	const [calendar, setCalendar] = useState(new Date());
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dayOfWeek, setDayOfWeek] = useState(null);
	const [sameTimeValue, setSameTimeValue] = useState(false);
	const [adding, setAdding] = useState(null);
	const [page, setPage] = useState("calendar");

	const storedUserId = localStorage.getItem("userData");

	const nonStringUserId = JSON.parse(storedUserId);

	const formattedDate = {
		day: calendar.getDate(),
		month: calendar.getMonth() + 1,
		year: calendar.getFullYear(),
		time: selectedTime,
	};

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

	const handleUp = (day, timeSlot) => {
		setTimeSlots((prevTimeSlots) => {
			const updatedTimeSlots = { ...prevTimeSlots };
			if (updatedTimeSlots[day]) {
				updatedTimeSlots[day] = [...prevTimeSlots[day], timeSlot];
			}
			return updatedTimeSlots;
		});
	};

	console.log(exclusions);

	const handleDown = (day, timeSlot) => {
		setTimeSlots((prevTimeSlots) => {
			const updatedTimeSlots = { ...prevTimeSlots };
			if (updatedTimeSlots[day]) {
				const value = updatedTimeSlots[day].indexOf(timeSlot);

				if (value >= 0 && day) {
					updatedTimeSlots[day].splice(value, 1);
				}
			}

			return updatedTimeSlots;
		});
	};

	const handleSave = () => {
		//got this solution online its so it sorts it out to make 9:00 AM or the earliest time slot always be first in the array and be in order
		const sortedTimeSlots = Object.keys(timeSlots).reduce((acc, day) => {
			acc[day] = timeSlots[day].sort((a, b) => {
				const timeA = new Date(`1970/01/01 ${a}`).getTime();
				const timeB = new Date(`1970/01/01 ${b}`).getTime();
				return timeA - timeB;
			});
			return acc;
		}, {});

		const changes = {
			companyId: nonStringUserId,
			schedule: sortedTimeSlots,
		};

		fetch("/api/schedulechanges", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(changes),
		})
			.then((parse) => {
				if (parse.status === 200) {
					window.location.reload();
				} else console.log("error");
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	console.log(timeSlots);

	const handleAddingChange = (event, timeSlot) => {
		setAdding(event);
		setSelectedTime(timeSlot.time);
	};

	let updatedExlusions = [];

	const handleExclusionSave = (event) => {
		const formattedDate = {
			day: calendar.getDate(),
			month: calendar.getMonth() + 1,
			year: calendar.getFullYear(),
			time: selectedTime,
		};

		for (let i = 0; i < adding; i++) {
			updatedExlusions.push(formattedDate);
		}
		console.log(updatedExlusions);

		console.log(exclusions);

		const exclusionData = {
			companyId: nonStringUserId,
			exclusion: updatedExlusions,
		};

		console.log(exclusionData);
		//not hooked up on server but this is just for the sake of having something

		fetch("/api/addexclusion", {
			method: "Post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(exclusionData),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status === 200) {
					window.location.reload();
				} else {
					console.log("error cancelling exclusion");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleCancel = (exclusion) => {
		const postData = {
			companyId: nonStringUserId,
			exclusion: exclusion,
		};

		//this is not hooked up, just to get it done

		fetch("/api/deleteexclusion", {
			method: "Post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status === 200) {
					window.location.reload();
				} else {
					console.log("error cancelling exclusion");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		Promise.all([
			fetch(`/api/company/${nonStringUserId}`).then((response) => response.json()),
			fetch(`/api/timeslots/${nonStringUserId}`).then((response) => response.json()),
		])
			.then(([companyData, timeslotData]) => {
				setData(companyData.data);
				setTimeSlots(timeslotData.data.available);
				setExclusions(timeslotData.data.exclusions);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [nonStringUserId]);

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

	// const getTileContent = ({ date, view }) => {
	// 	if (view === "month") {
	// 		// const selectedDayOfWeek = date.getDay();
	// 	}

	// 	return null;
	// };

	let selectedTimeSlots = [];

	if (dayOfWeek) {
		const timeAnotherSlot = Object.entries(timeSlots).find(([day]) => {
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

				return matchedCount <= mergedTimeSlots[index].adding;
			});
		}
	}

	let timeSlotButtons;

	if (selectedTimeSlots.length > 0) {
		timeSlotButtons = selectedTimeSlots.map((timeSlot, index) => (
			<TimeSlotDiv key={index}>
				<TimeSlot>{timeSlot.time}</TimeSlot>
				<TimeSlotinput placeholder="0" type="number" min="0" onChange={(event) => handleAddingChange(event.target.value, timeSlot)} />
			</TimeSlotDiv>
		));
	} else {
		timeSlotButtons = <p>Please choose an available day</p>;
	}

	if (loading) {
		return <Loader />;
	}

	return (
		<CalendarContainer>
			<ChoicesDiv>
				<Choices active={page === "calendar"} onClick={() => setPage("calendar")}>
					Calendar
				</Choices>
				<Choices active={page === "exclusions"} onClick={() => setPage("exclusions")}>
					Exclusions
				</Choices>
			</ChoicesDiv>
			{page === "calendar" && (
				<CalendarDiv>
					<WeekList>
						<Title>Calendar</Title>
						{daysOfWeek.map((day) => (
							<WeekListItem key={day}>
								<Day onClick={() => setSelectedDay(day)} selected={selectedDay === day}>
									{day}
								</Day>
								{selectedDay === day && (
									<TimeSlots>
										{daysTimeSlots[day].map((timeSlot) => {
											const isSelected = timeSlots && day in timeSlots && timeSlots[day].includes(timeSlot);
											const count = timeSlots && day in timeSlots ? timeSlots[day].filter((time) => time === timeSlot).length : "";

											return (
												<TimesDiv key={`${timeSlot}-${day}`}>
													<Count>{count}</Count>
													<Arrows>
														<ArrowButton direction="up" onClick={() => handleUp(day, timeSlot)}></ArrowButton>
														<ArrowButton direction="down" onClick={() => handleDown(day, timeSlot)}></ArrowButton>
													</Arrows>

													<ActualTime isSelected={isSelected} onClick={() => handleTimeSlotSelection(day, timeSlot)}>
														{timeSlot}
													</ActualTime>
												</TimesDiv>
											);
										})}
									</TimeSlots>
								)}
							</WeekListItem>
						))}
					</WeekList>

					<Submit onClick={handleSave}>Save schedule changes</Submit>
				</CalendarDiv>
			)}
			{page === "exclusions" && (
				<>
					<Title>Exclusions</Title>
					<Exclusions>
						<FlexColumn>
							<AnotherTitle>Live exclusions</AnotherTitle>
							{exclusions.map((exclusion, index) => (
								<CurrentExlusions key={`${exclusion.day}-${exclusion.month}-${index}`}>
									<p>
										Current exlusions: {exclusion.year}/{exclusion.month}/{exclusion.day} at {exclusion.time}
									</p>
									<CancelButton onClick={() => handleCancel(exclusion)}>Cancel exlusion</CancelButton>
								</CurrentExlusions>
							))}
						</FlexColumn>
						<AddExclusion>
							<AnotherTitle>Add exclusion</AnotherTitle>
							<BookingSelection>
								<StyledCalendar onChange={handleCalendarChange} value={calendar} />

								<DropdownContainer>
									<DropdownButton onClick={handleDropdownToggle}>Select a Time</DropdownButton>
									<DropdownMenu open={dropdownOpen}>{timeSlotButtons}</DropdownMenu>
								</DropdownContainer>
							</BookingSelection>
							<SubmitExclusion onClick={handleExclusionSave}>Save exclusion changes</SubmitExclusion>
						</AddExclusion>
					</Exclusions>
				</>
			)}
		</CalendarContainer>
	);
};

const CalendarContainer = styled.div`
	display: flex;
	flex-direction: column;
	/* max-width: 1200px; */
	margin: auto;
	font-family: Arial, sans-serif;
`;

const ChoicesDiv = styled.div`
	display: flex;
	margin: auto;
`;

const CalendarDiv = styled.div`
	margin: auto;
`;

const Choices = styled.p`
	font-size: 1.2em;
	margin-right: 20px;
	margin-left: 20px;
	cursor: pointer;
	text-decoration: ${(props) => (props.active ? "underline" : "none")};
`;

const WeekList = styled.ul`
	list-style-type: none;
	padding: 0;
	/* position: relative;
    right: 300px; */
	width: 1000px;
`;

const Title = styled.h1`
	text-align: center;
`;

const WeekListItem = styled.li`
	padding: 10px;
	border-bottom: 1px solid #ccc;
	display: flex;
	align-items: center;
`;

const Day = styled.div`
	/* flex: 0 0 100px; */
	font-weight: bold;
	/* can decide if i want it this way or the other */
	text-transform: uppercase;
`;

const TimesDiv = styled.div`
	width: 150px;
	height: 50px;
	display: flex;
	margin: 10px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	padding-left: 5px;
	border-radius: 5px;
`;

const Count = styled.p`
	position: relative;
	left: 5px;
	width: 20px;
	height: 20px;
	margin: auto;
`;

const Arrows = styled.div`
	display: flex;
	flex-direction: column;
`;

const ArrowButton = styled.button`
	margin-left: 5px;
	width: 40px;
	height: 50%;
	background-color: white;
	border: none;
	background-size: 20px;
	background-image: url(${(props) => (props.direction === "down" ? downArrow : upArrow)});
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
`;

const ActualTime = styled.p`
	margin: auto;
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	color: ${(props) => (props.isSelected ? "white" : "black")};
	background-color: ${(props) => (props.isSelected ? "green" : "white")};
`;

const BookingSelection = styled.div`
	display: flex;
`;

const TimeSlots = styled.ul`
	list-style-type: none;
	display: flex;
	flex-wrap: wrap;
	padding: 0;
	margin: 0;
`;

const TimeSlotDiv = styled.li`
	display: flex;
	align-items: center;
	/* margin-right: 20px;
  margin-bottom: 10px; */
`;

const TimeSlotinput = styled.input`
	width: 40px;
	height: 26px;
	margin-top: 11px;
`;

const TimeSlotButton = styled.button`
	width: 70px;
	height: 43px;
	padding: 5px;
	text-align: center;
	background-color: ${(props) => (props.isSelected ? "green" : "white")};
	color: ${(props) => (props.isSelected ? "white" : "black")};
	border: none;
	border-radius: 4px;
	border: 1px solid black;

	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #dcdcdc;
	}
`;

const TimeSlot = styled.p`
	display: block;
	width: 70px;
	padding: 8px;
	margin-bottom: 4px;
	background-color: #f8f8f8;
	border: none;
	border-radius: 4px;
`;

const StyledCalendar = styled(Calendar)`
	/* position: relative;
	top: 100px; */
	min-width: 600px;
	max-width: 100%;
	background-color: #fff;
	color: #222;
	border-radius: 8px;
	font-family: Arial, Helvetica, sans-serif;
	line-height: 1.125em;
	padding: 10px;
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
	display: inline-block;
`;

const DropdownButton = styled.button`
	padding: 8px 24px;
	font-size: 1em;
	color: white;
	background-color: #2196f3;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.5s ease-in-out;
	width: 167px;

	&:hover {
		background-color: darkblue;
	}
`;

const DropdownMenu = styled.div`
	width: 150px;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	display: ${({ open }) => (open ? "block" : "none")};
	max-height: 260px;
	overflow-y: auto;
	overflow-x: hidden;

	/* Scrollbar Styles */
	::-webkit-scrollbar {
		width: 6px;
		height: 6px; /* Add this line to set the height of the scrollbar */
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

const FlexColumn = styled.div`
	position: relative;
	right: 25px;
	display: flex;
	text-align: center;
	flex-direction: column;
	width: 500px;
	height: 100%;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 20px -10px;
	padding: 30px;
`;

const AnotherTitle = styled.h3`
	font-size: 1.5em;
`;

const Exclusions = styled.div`
	display: flex;
	margin: auto;
`;

const CurrentExlusions = styled.div`
	margin: 10px;
	display: flex;
	width: 500px;
	justify-content: flex-end;
`;

const AddExclusion = styled.div`
	position: relative;
	left: 25px;
	padding: 30px;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 500px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 20px -10px;
	text-align: center;
`;

const CancelButton = styled.button`
	background-color: red;
	font-size: 1.2em;
	color: white;
	border: none;
	border-radius: 10px;
	margin-left: 20px;
	padding: 8px 20px;
	cursor: pointer;
`;

const Submit = styled.button`
	position: relative;
	left: 50%;
	color: white;
	border: none;
	border-radius: 10px;
	background-color: #3457d5;
	transform: translate(-50%);
	width: 300px;
	padding: 10px;
	margin: 10px;
	height: 50px;
	font-size: 1.5em;
`;

const SubmitExclusion = styled.button`
	margin: auto;
	color: white;
	border: none;
	border-radius: 10px;
	background-color: #3457d5;
	width: 300px;
	padding: 10px;
	height: 50px;
	font-size: 1.5em;
`;

export default Schedule;
