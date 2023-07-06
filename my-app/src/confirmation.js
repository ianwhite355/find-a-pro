import styled from "styled-components";

const Confirmation = ({ confirmationData }) => {
	// how its being passed
	// {time: {…}, companyName: 'Clear Choice Cleaning'}
	// companyName: "Clear Choice Cleaning"
	// time: {day: 16, month: 10, year: 2023, time: '10:00 AM'}
	const { month } = confirmationData.time;

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const formattedMonth = monthNames[month - 1];
	console.log(confirmationData.time.time);

	return (
		<>
			<Title>Confirmation</Title>
			<Container>
				<Info>You booked an estimate from: {confirmationData.companyName}</Info>
				<Info>The time for this estimate is {confirmationData.time.time}, it is on {confirmationData.time.day} in {formattedMonth} </Info>
                <Info>If you would like more information click the menu on the top left and choose your jobs!</Info>
			</Container>
		</>
	);
};

const Title = styled.h1`
	text-align: center;
`;

const Container = styled.div`
	padding: 10px;
	margin: 0 auto;
	max-width: 400px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Info = styled.p``;

export default Confirmation;
