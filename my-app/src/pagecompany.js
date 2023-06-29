
import styled, { keyframes } from "styled-components";
import React, { useState, useEffect, useRef } from 'react';
import { useAsyncValue, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
import emailjs from '@emailjs/browser';


const progressBarAnimation = keyframes`
    0% { transform: scaleX(1); }
    100% { transform: scaleX(0); }
`;


const CompanyPage = () => {
    //every single useState, useParams that sort of stuff
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [calendar, setCalendar] = useState(new Date())
    const { companyId } = useParams();
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [timeSlots, setTimeSlots] = useState([])


    //this is to format the data to {day: 21, month: 7, year: 2023} instead of Fri Jul 21 2023 00:00:00 GMT-0400 (Eastern Daylight Time), makes it easier to change
    const formattedDate = {
        day: calendar.getDate(),
        month: calendar.getMonth() + 1,
        year: calendar.getFullYear(),
        time: selectedTime
    };

    //all the following is on clicks and stuff

    const stringFormattedDate = JSON.stringify(formattedDate)

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    const handleTimeSlotSelection = (time) => {
        setSelectedTime(time);
        setDropdownOpen(false);
    };


    const handleCalendarChange = (date) => {
        
        setCalendar(date)
    }

    const sendEmail = (e) => {
        e.preventDefault()
        console.log("test")

        if (!calendar) {
            // Date not selected, display an error message or take necessary action
            console.log("this is where")
            return;
        }

        const emailData = {
            calendar: stringFormattedDate || 'date was not selected',
            data_email: data.email
            
        };

        emailjs.send('service_giwexjs', 'template_7ri4ars', emailData, 'EEwDD0w5lZNfVQ4V3')
        .then((result) => {
            setSuccessMessage("Thank you!");
            setShowSuccessMessage(true);
        })
        .catch((error) => {
            console.log(error.text);
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
        fetch("/api/allData")
        .then((response) => response.json())
        .then((parse) => {
            const filteredData = parse.data.find((company) => company._id.toString() === companyId);
            setData(filteredData);
            setLoading(false);
            setTimeSlots(filteredData.timeSlots)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [companyId]);


    if (loading) {
        return <div>Loading...</div>;
    }

    

    return (
        <Container>
            
            <Name>{data.name}</Name>
            <BottomBar></BottomBar>
            <BookingSelection>

                <StyledCalendar onChange={handleCalendarChange} value={calendar} />

                <DropdownContainer>
                    <DropdownButton onClick={handleDropdownToggle}>Select a Time</DropdownButton>
                    <DropdownMenu open={dropdownOpen}>

                    {Object.entries(timeSlots).map(([key, value]) => {
                        const time = value.time;
                        const availablePeople = value.availablePeople;
                        if (availablePeople) {
                            return (
                            <TimeSlotButton key={key} onClick={() => handleTimeSlotSelection(time)}>{time}</TimeSlotButton>
                        );
                        }
                    })}

                    </DropdownMenu>
                    {selectedTime && <p>Selected Time: {selectedTime}</p>}
                </DropdownContainer>

            </BookingSelection>

            {/* <form ref={form} onSubmit={sendEmail}>
                <input type="hidden" name="calendar" value={formattedDate || 'date was not selected'} />
                <input type="hidden" name="data_email" value={data.email} />
                <SubmitBook  type="submit">Book it!</SubmitBook>
            </form> */}
            <SubmitBook onClick={sendEmail}>Book it!</SubmitBook>
            
            <SuccessContainer>
                    {showSuccessMessage && (
                        <SuccessWrapper>
                            <SuccessMessage>{successMessage}</SuccessMessage>
                            <ProgressBar />
                        </SuccessWrapper>
                    )}
                </SuccessContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 80%;
    height: 400px;
    margin: 0 auto;
    `

const Name = styled.p`
    font-size: 3em;
`

const BottomBar = styled.div`
`
// box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

const BookingSelection = styled.div`
    display: flex;
`


const StyledCalendar = styled(Calendar)`
    width: 400px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    padding: 10px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
        rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    visibility: visible;
    margin-right:10px;

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
    /* Add your button styles here */
    `;

    const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    display: ${({ open }) => (open ? 'block' : 'none')};
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
    top: 400px;
`


const SuccessContainer = styled.div`
    position: fixed;
    top: 60px;
    right: 50px;
`;

const SuccessWrapper = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    background-color: #4caf50;

    border-radius: 5px;
`;

const SuccessMessage = styled.div`
    color: white;
    padding: 20px;
    font-size:1.5em;
`;

const ProgressBar = styled.div`
    position: relative;
    bottom: 0px;
    width: 200px;
    height: 10px;
    background-color: #2E1A47;
    animation: ${progressBarAnimation} 5s linear forwards;
    transform-origin: left;
    transform: translate(-100%);
    transform: scaleX(1);
    border-radius: 5px;
`;


export default CompanyPage



