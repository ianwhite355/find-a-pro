import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";

const BusinessJobs = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [estimates, setEstimates] = useState(null);
	const [jobStatus, setJobStatus] = useState({});
	const [originalEstimateStatus, setOriginalEstimateStatus] = useState(null);
	const [editedPrice, setEditedPrice] = useState("");
	const [deposit, setDeposit] = useState("");
    const [depositPaid, setDepositPaid] = useState(null)
	const [paidStatus, setPaidStatus] = useState(null);
	const [jobId, setJobId] = useState(null);
    const [userId, setUserId] = useState(null)
	const [editing, setEditing] = useState(false);
    const [page, setPage] = useState("pending")

	const storedUserId = localStorage.getItem("userData");

	const nonStringUserId = JSON.parse(storedUserId);



	const handleCancel = () => {

        setEditing(false)

        const cancelData = {
            userId: userId,
            companyId: nonStringUserId,
            estimateId: jobId
        }
    
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
                    window.location.reload()
                } else if (response.status === 404) {
                    console.log("error cancelling job")
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

	const handleSave = () => {

		const updatedEstimate = {
            estimateId: jobId,
            estimateStatus: jobStatus,
            price: editedPrice,
            paid: paidStatus,
            deposit: deposit,
            // depositPaid: true
        };
    
        fetch("/api/estimatesmodify", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEstimate),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();

                } else {
                    console.log("error changing data")
                }
            })
            .catch((error) => {
                console.error(error);
            });

        
	};

	const handleDiscard = () => {
		setJobStatus({});
		setEditedPrice("");
		setDeposit("");
		setPaidStatus(null);
		setJobId(null);
		setEditing(false);
	};

	const handleEdit = (jobId, userId) => {
		setEditing(true);
		setJobId(jobId);
        setUserId(userId)
	};

	useEffect(() => {
		Promise.all([
			fetch(`/api/company/${nonStringUserId}`).then((response) => response.json()),
			fetch(`/api/getestimatescompany/${nonStringUserId}`).then((response) => response.json()),
		])
			.then(([companyData, estimateData]) => {
				setData(companyData.data);
				setEstimates(estimateData.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [nonStringUserId]);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<Title>Your Jobs</Title>
            <ChoicesDiv>
                <Choices onClick={() => setPage("pending")}>Pending</Choices>
                <Choices onClick={() => setPage("estimate-given")}>Estimate Given</Choices>
                <Choices onClick={() => setPage("accepted")}>Accepted</Choices>
                <Choices onClick={() => setPage("completed")}>Completed</Choices>
                <Choices onClick={() => setPage("cancelled")}>Cancelled</Choices>
            </ChoicesDiv>
			<JobDiv>
				{estimates.filter((user) => user.estimateStatus === page).map((user) => (
						<JobContainer key={user._id}>
							<CompanyName>Name will go here when it's fixed</CompanyName>
							<EditButton disabled={editing} onClick={() => handleEdit(user._id, user.userId)}>
								Edit
							</EditButton>
							<EstimateTime>{user.estimateTime}</EstimateTime>
							<Status>
								<StatusButton
									disabled={!editing}
									selected={user.estimateStatus === "pending"}
									onClick={() => {
										user.estimateStatus = "pending";
										setJobStatus("pending");
									}}
								>
									Pending
								</StatusButton>
								<StatusButton
									disabled={!editing}
									selected={user.estimateStatus === "estimate-given"}
									onClick={() => {
										user.estimateStatus = "estimate-given";
										setJobStatus("estimate-given");
									}}
								>
									Estimate Given
								</StatusButton>
								<StatusButton
									disabled={!editing}
									selected={user.estimateStatus === "accepted"}
									onClick={() => {
										user.estimateStatus = "accepted";
										setJobStatus("accepted");
									}}
								>
									Accepted
								</StatusButton>
								<StatusButton
									disabled={!editing}
									selected={user.estimateStatus === "completed"}
									onClick={() => {
										user.estimateStatus = "completed";
										setJobStatus("completed");
									}}
								>
									Completed
								</StatusButton>
                                <StatusButton
									disabled={!editing}
									selected={user.estimateStatus === "cancelled"}
									onClick={() => {
										user.estimateStatus = "cancelled";
										setJobStatus("cancelled");
									}}
								>
									Completed
								</StatusButton>
							</Status>
							<JobDetails>
								{user.price ? (
									<JobDetail>{user.price}</JobDetail>
								) : (
									<PriceContainer>
										<PriceLabel>Price:</PriceLabel>
										<PriceInput
											disabled={!editing}
											type="text"
											placeholder="XXX.XX"
											value={editedPrice}
											onChange={(e) => setEditedPrice(e.target.value)}
										/>
									</PriceContainer>
								)}
								<JobDetail>
									Estimate Date: {user.estimateDate.month}/{user.estimateDate.day}/{user.estimateDate.year} at {user.estimateDate.time}
								</JobDetail>
								{user.deposit ? (
									<JobDetail>Deposit: {user.deposit}</JobDetail>
								) : (
									<PriceContainer>
										<PriceLabel>Deposit:</PriceLabel>
										<PriceInput
											disabled={!editing}
											type="text"
											placeholder="XXX.XX"
											value={deposit}
											onChange={(e) => setDeposit(e.target.value)}
										/>
									</PriceContainer>
								)}
								<PaidStatusContainer>
									<PaidStatusLabel>Paid:</PaidStatusLabel>
									<PaidStatusButton
										disabled={!editing}
										selected={user.paid === "Yes"}
										onClick={() => {
											user.paid = "Yes";
											setPaidStatus("Yes");
										}}
									>
										Yes
									</PaidStatusButton>
									<PaidStatusButton
										disabled={!editing}
										selected={user.paid === "No"}
										onClick={() => {
											user.paid = "No";
											setPaidStatus("No");
										}}
									>
										No
									</PaidStatusButton>
								</PaidStatusContainer>
							</JobDetails>
							<CancelButton disabled={!editing} onClick={handleCancel}>
								Cancel Job
							</CancelButton>
							<ButtonContainer>
								<SaveButton disabled={!editing} onClick={handleSave}>
									Save changes
								</SaveButton>
								<DiscardButton disabled={!editing} onClick={handleDiscard}>
									Discard changes
								</DiscardButton>
							</ButtonContainer>
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
    transform: translate(-16%);
    
`

const Choices = styled.p`
    margin-right:20px;
    margin-left:20px;

`

const EditButton = styled.button`
	background-color: ${({ disabled }) => (disabled ? "gray" : "green")};
	color: white;
	border: none;
	padding: 10px;
	cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
	font-size: 1em;
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

const Status = styled.div`
	margin: 0;
	font-weight: bold;
	display: flex;
	align-items: center;
`;

const StatusButton = styled.button`
	background-color: ${({ selected }) => (selected ? "green" : "inherit")};
	color: ${({ selected }) => (selected ? "white" : "inherit")};
	border: none;
	padding: 5px;
	margin-right: 10px;
	cursor: pointer;
`;

const JobDetails = styled.div`
	margin-top: 10px;
	padding: 5px;
`;

const JobDetail = styled.p`
	margin: 0;
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

const ButtonContainer = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 10px;
`;

const SaveButton = styled.button`
	background-color: green;
	color: #fff;
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const DiscardButton = styled.button`
	background-color: red;
	color: #fff;
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const PriceContainer = styled.div`
	display: flex;
	align-items: center;
`;

const PriceLabel = styled.span`
	margin-right: 10px;
	font-weight: bold;
`;

const PriceInput = styled.input`
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 100px;
`;

const PaidStatusContainer = styled.div`
	display: flex;
	align-items: center;
	padding-top: 10px;
`;

const PaidStatusLabel = styled.span`
	margin-right: 10px;
	font-weight: bold;
`;

const PaidStatusButton = styled.button`
	padding: 5px 10px;
	margin-right: 10px;
	background-color: ${(props) => (props.selected ? "green" : "red")};
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

export default BusinessJobs
