import styled from "styled-components";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const Support = () => {
	const form = useRef();

    const navigate = useNavigate()
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm("service_pli7r2q", "template_sj5nnmo", form.current, "EEwDD0w5lZNfVQ4V3")
			.then(() => {
				navigate("/")
			})
			.catch((error) => {
				console.log(error.text);
			});
	};

	return (
		<Container>
			<Title>Contact Support</Title>
			<Form ref={form} onSubmit={sendEmail}>
				<DifferentNames>
					<Label>
						Name:
						<Input type="text" name="user_name" />
					</Label>
				</DifferentNames>
				<DifferentNames>
					<Label>
						Email:
						<Input type="email" name="user_email" />
					</Label>
				</DifferentNames>
				<Services>What can we help you with?</Services>
				<DifferentNames>
					<Label>
						message
						<InputMessage type="text" name="message" />
					</Label>
				</DifferentNames>

				<Button type="submit">Submit</Button>
			</Form>
			<ContactShortly>We will respond to you as soon as we can through your email</ContactShortly>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	padding: 10px;
	left: 50%;
	transform: translate(-50%);
	width: 800px;
	box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
	@media (min-width: 200px) and (max-width: 850px) {
		width: 80%;
		padding: 20px;
	}
`;

const Title = styled.h1`
	text-align: center;
	font-size: 2em;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const DifferentNames = styled.div`
	display: flex;
`;

const Label = styled.label`
	display: flex;
	flex-direction: column;
	width: 400px;
	margin: 10px;
	font-size: 2em;
	@media (min-width: 200px) and (max-width: 850px) {
		width: 150px;
		font-size: 1.2em;
	}
`;

const Input = styled.input`
	padding: 5px;
	margin-top: 5px;
	font-size: 0.8em;
`;

const InputMessage = styled.textarea`
	font-size: 0.8em;
	padding: 5px;
	margin-top: 5px;
	height: 100px;
	resize: vertical;
	overflow-y: auto;
`;

const Services = styled.p`
	font-size: 2em;
	text-align: center;
	@media (min-width: 200px) and (max-width: 850px) {
		font-size: 1.8em;
	}
`;

const Button = styled.button`
	background-color: #3457d5;
	color: white;
	border: none;
	border-radius: 10px;
	padding: 10px 20px;
	margin: 20px;
	font-size: 1.2em;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
`;

const ContactShortly = styled.p`
	text-align: center;
`;

export default Support;
