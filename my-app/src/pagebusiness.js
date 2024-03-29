
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";


const BusinessPage = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [estimates, setEstimates] = useState(null)

    const storedUserId = localStorage.getItem("userData");

    const nonStringUserId = JSON.parse(storedUserId)

    useEffect(() => {
        Promise.all([
            fetch(`/api/company/${nonStringUserId}`).then((response) => response.json()),
            fetch(`/api/getestimatescompany/${nonStringUserId}`).then((response) => response.json())
        ])
        .then(([ companyData, estimateData]) => {
            setData(companyData.data)
            setEstimates(estimateData.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    },[nonStringUserId])



    if (loading) {
        return <Loader/>
    }

    return (
        <>
			<p>really not sure what is gonna go here, some of there jobs, maybe a link for the schedule, not sure what else</p>
		</>
    )
}


const Title = styled.h1`
	text-align: center;
`;

const JobDiv = styled.div`
	position: relative;
	left: 50%;
	transform: translate(-50%);
	width: 80%;
`;

const JobContainer = styled.div`
	padding: 20px;
	margin: 40px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const CompanyName = styled.h3`
    text-align: center;
	font-size: 16px;
	margin: 0;
`;

const EstimateTime = styled.p`
	margin: 0;
    padding:10px;
`;

const Status = styled.p`
	margin: 0;
	font-weight: bold;
    padding:5px;
`;

const Price = styled.p`
	margin: 0;
	color: green;
    padding:5px;
`;

const NoPrice = styled.p`
	margin: 0;
	color: red;
    padding:5px;
`;

const JobDetails = styled.div`
	margin-top: 10px;
    padding:5px;
`;

const JobDetail = styled.p`
	margin: 0;
    padding:5px;
`;


export default BusinessPage