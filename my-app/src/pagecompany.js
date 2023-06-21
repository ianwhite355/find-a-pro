
import styled, { keyframes } from "styled-components";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
import emailjs from '@emailjs/browser';


const progressBarAnimation = keyframes`
    0% { transform: scaleX(1); }
    100% { transform: scaleX(0); }
`;


const CompanyPage = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [calendar, setCalendar] = useState('')
    const { companyId } = useParams();
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDateTimeChange = (date) => {
        
        setCalendar(date)
    }

    const sendEmail = (e) => {
        e.preventDefault();

        if (!calendar) {
            // Date not selected, display an error message or take necessary action
            return;
        }


        emailjs.sendForm('service_giwexjs', 'template_7ri4ars', form.current, 'EEwDD0w5lZNfVQ4V3')
        .then((result) => {
            console.log(calendar);
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
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [companyId]);

    


    if (loading) {
        console.log(data)
        return <div>Loading...</div>;
    }

    console.log(calendar)


    return (
        <Container>
            
            <Name>{data.name}</Name>
            <BottomBar></BottomBar>
            <StyledDateTimePicker onChange={handleDateTimeChange} value={calendar} />
            

            <form ref={form} onSubmit={sendEmail}>
                <input type="hidden" name="calendar" value={calendar || 'date was not selected'}/>
                <input type="hidden" name="data_email" value={data.email} />
                <SubmitBook  type="submit">Book it!</SubmitBook>
            </form>
            
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




const StyledDateTimePicker = styled(DateTimePicker)`
    width: 850px;
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

    .react-datetime-picker__inputGroup__leadingZero {
        visibility: hidden;
    }

    .react-datetime-picker__inputGroup__day,
    .react-datetime-picker__inputGroup__year,
    .react-datetime-picker__inputGroup__month,
    .react-datetime-picker__inputGroup__minute,
    .react-datetime-picker__inputGroup__hour{
        width: 60px !important;
    }

    .react-datetime-picker__button {
    // Styles for the button to open the calendar dropdown
        padding: 8px 12px;
        background-color: #6f48eb;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        margin: 10px;
        
    }

    .react-datetime-picker__inputGroup__input {
    // Styles for the input field displaying the date
        width: 100px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: #fff;
        color: #222;
    }

    

    .react-datetime-picker__inputGroup__hour,
    .react-datetime-picker__inputGroup__minute {
    // Styles for the hour and minute inputs
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: #fff;
        color: #222;
    }

    .react-datetime-picker__inputGroup__divider {
    // Styles for the colon separator between the hour and minute inputs
        margin: 20px;
    }

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



