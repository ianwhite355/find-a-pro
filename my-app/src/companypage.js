import { windowWashing, poolCleaning, carCleaning } from "./datatemp"
import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';






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

    return (
        <Container>
            <MainImage src={data.image}/>
        </Container>
    )
}

const Container = styled.div`
`

const MainImage = styled.div`
    width: 100%;
    height: 0;
    
`
export default CompanyPage



