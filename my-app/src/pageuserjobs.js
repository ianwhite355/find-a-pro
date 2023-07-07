import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";

const UserJobs = () => {
	const [loading, setLoading] = useState(true);
	const [estimates, setEstimates] = useState(null);
	const [companyData, setCompanyData] = useState(null);
	const [companyIds, setCompanyIds] = useState([]);
	const [companyId, setCompanyId] = useState(null);
	const [page, setPage] = useState("pending");

	const storedUserId = localStorage.getItem("userData");

	const nonStringUserId = JSON.parse(storedUserId);

	const jsonUserId = JSON.parse(storedUserId);

	const handleCancel = (companyId, estimateId) => {
		const cancelData = {
			userId: jsonUserId,
			companyId: companyId,
			estimateId: estimateId,
		};

		fetch("/api/deletejob", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cancelData),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status === 200) {
					window.location.reload();
				} else if (response.status === 404) {
					console.log("error cancelling job");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		fetch(`/api/getestimatesbyuser/${nonStringUserId}`)
			.then((response) => response.json())
			.then((parse) => {
				setEstimates(parse.data);
				// if (Array.isArray(parse.data)) {
				//     const ids = parse.data.map((estimate) => estimate.companyId);
				//     setCompanyIds(ids);
				// }
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [nonStringUserId]);

	useEffect(() => {
		if (estimates) {
		}
	}, [estimates, companyIds]);

	if (loading) {
		return <Loader />;
	}

	if (estimates.length === 0) {
		return (
			<>
				<Title>none, will make this better later</Title>
			</>
		);
	}

	return (
		<>
			<Title>Your Jobs</Title>
			<ChoicesDiv>
				<Choices active={page === "pending"} onClick={() => setPage("pending")}>
					Pending
				</Choices>
				<Choices active={page === "estimate-given"} onClick={() => setPage("estimate-given")}>
					Estimate Given
				</Choices>
				<Choices active={page === "accepted"} onClick={() => setPage("accepted")}>
					Accepted
				</Choices>
				<Choices active={page === "completed"} onClick={() => setPage("completed")}>
					Completed
				</Choices>
				<Choices active={page === "cancelled"} onClick={() => setPage("cancelled")}>
					Cancelled
				</Choices>
			</ChoicesDiv>
			<JobDiv>
				{estimates
					.filter((user) => user.estimateStatus === page)
					.map((user) => (
						<JobContainer key={user._id}>
							<CompanyName>Name will go here when it's fixed</CompanyName>
							<EstimateTime>{user.estimateTime}</EstimateTime>
							<Status>Status: {user.estimateStatus}</Status>
							{user.price ? <Price>{user.price}</Price> : <NoPrice>Price not available</NoPrice>}
							<JobDetails>
								<JobDetail>
									Estimate Date: {user.estimateDate.month}/{user.estimateDate.day}/{user.estimateDate.year} at {user.estimateTime}
								</JobDetail>
								<JobDetail>
									Booked Date: {user.workDate ? `${user.workDate.month}/${user.workDate.day}/${user.workDate.year}` : "Not booked yet"}
								</JobDetail>
								<JobDetail>Deposit: {user.deposit ? `${user.deposit}` : "No deposit yet"}</JobDetail>
								<JobDetail>Paid: {user.depositPaid ? "Yes" : "No"}</JobDetail>
								<JobDetail>Work Complete: {user.workComplete ? "Yes" : "No"}</JobDetail>
							</JobDetails>
							<CancelButton onClick={() => handleCancel(user.companyId, user._id)}>Cancel Job</CancelButton>
						</JobContainer>
					))}
			</JobDiv>
		</>
	);
};

const Title = styled.h1`
	text-align: center;
`;

const ChoicesDiv = styled.div`
	display: flex;
	position: relative;
	left: 50%;
	//fix the centering later
	transform: translate(-18%);
`;

const Choices = styled.p`
	font-size: 1.2em;
	margin-right: 20px;
	margin-left: 20px;
	cursor: pointer;
	text-decoration: ${(props) => (props.active ? "underline" : "none")};
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
	padding: 10px;
`;

const Status = styled.p`
	margin: 0;
	font-weight: bold;
	padding: 5px;
`;

const Price = styled.p`
	margin: 0;
	color: green;
	padding: 5px;
`;

const NoPrice = styled.p`
	margin: 0;
	color: red;
	padding: 5px;
`;

const JobDetails = styled.div`
	margin-top: 10px;
	padding: 5px;
`;

const CancelButton = styled.button`
	background-color: red;
	font-size: 1.2em;
	color: white;
	border: none;
	padding: 10px;
	cursor: pointer;
`;

const JobDetail = styled.p`
	margin: 0;
	padding: 5px;
`;

export default UserJobs;
