import { windowWashing, poolCleaning, carCleaning } from "./datatemp"
import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';






const CompanyPage = () => {
    const { companyId } = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const allData = [...windowWashing, ...poolCleaning, ...carCleaning]
        const filteredData = allData.find((company) => company.id === companyId)
        setData(filteredData);
        setLoading(false);
    }, [companyId]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${data.image});
    background-repeat: no-repeat;
    background-size: cover;
    width: 80%;
    height: 400px;
    margin: 0 auto;
    `

    return (
        <>
            <Container>
                
                <Name>{data.name}</Name>
                <BottomBar></BottomBar>
            </Container>
        </>
    )
}


const Name = styled.p`
    font-size: 3em;
`

const BottomBar = styled.div`
`

export default CompanyPage



