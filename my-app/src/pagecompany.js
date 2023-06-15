
import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CompanyPage = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [calendar, setCalendar] = useState(null)
    const { companyId } = useParams();

    const handleCalendarChange = (date) => {
        setCalendar(date)
    }

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
            <StyledCalendar onChange={handleCalendarChange}/>
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

const StyledCalendar = styled(Calendar)`
    /* Custom styles for the Calendar component */
    /* Add your desired styles here */
    padding: 10px;

    .react-calendar__navigation {
        /* Custom styles for the navigation section */
        
    }

    .react-calendar__tile {
        /* Custom styles for each date tile */
        
        
    }

    .react-calendar__tile--active {
        /* Custom styles for the active date tile */
        
    }

    .react-calendar__tile--today {
        /* Custom styles for the today's date tile */
        
    }

    .react-calendar__tile--weekend {
        /* Custom styles for the weekend date tiles */
        
    }
`;


export default CompanyPage



