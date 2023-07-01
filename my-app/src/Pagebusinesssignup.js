import styled, { keyframes } from "styled-components"
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';


const progressBarAnimation = keyframes`
    0% { transform: scaleX(1); }
    100% { transform: scaleX(0); }
`;


const BusinessSignUp  = () => {
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        let timer;
        if (showSuccessMessage) {
            timer = setTimeout(() => {
            setShowSuccessMessage(false);
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [showSuccessMessage]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_f2jwoos', 'template_wrachpx', form.current, 'EEwDD0w5lZNfVQ4V3')
        .then((result) => {
            setSuccessMessage("Thank you!");
            setShowSuccessMessage(true);
        })
        .catch((error) => {
            console.log(error.text);
        });
    };

    return (
        <Container>
            <Title>Want to sign up for Find-Your-Pro</Title>
            <Form ref={form} onSubmit={sendEmail}>
                <DifferentNames>
                    <Label>
                        Business Name:
                        <Input type="text" name="user_businessname"/>
                    </Label>
                    <Label>
                        Owner's Name:
                        <Input type="text" name="user_ownername"/>
                    </Label>
                </DifferentNames>
                <DifferentNames>
                    <Label>
                        Email:
                        <Input type="email" name="user_email"/>
                    </Label>
                    <Label>
                        Phone Number:
                        <Input type="number" name="user_phoneNumber"/>
                    </Label>
                </DifferentNames>
                <Services>What services Do you offer?</Services>
                <ThereServices>
                <label>
                    <input type="checkbox" name="user_services" value="Window Washing" />
                    Window Washing
                </label>
                <label>
                    <input type="checkbox" name="user_services" value="Pool Cleaning" />
                    Pool Cleaning
                </label>
                <label>
                    <input type="checkbox" name="user_services" value="Car Detailing" />
                    Car Detailing
                </label>
                </ThereServices>
                <Button type="submit">Sign Up</Button>
            </Form>
            <SuccessContainer>
                    {showSuccessMessage && (
                        <SuccessWrapper>
                            <SuccessMessage>{successMessage}</SuccessMessage>
                            <ProgressBar />
                        </SuccessWrapper>
                    )}
                </SuccessContainer>
            <ContactShortly>We will respond to you as soon as we can through your email</ContactShortly>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    padding: 10px;
    left:50%;
    transform: translate(-50%);
    width: 800px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    
    @media (min-width: 200px) and (max-width: 850px) {
        width: 80%;
        padding: 20px;
    }
`

const Title = styled.h1`
    text-align:center;
    font-size: 2em;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DifferentNames = styled.div`
    display: flex;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 10px;
    font-size:2em;
    @media (min-width: 200px) and (max-width: 850px) {
        width: 150px;
        font-size:1.2em;
    }
`;

const Input = styled.input`
    padding: 5px;
    margin-top: 5px;
`;

const ThereServices = styled.div`
`


const Services = styled.p`
    font-size: 2em;
    text-align:center;
    @media (min-width: 200px) and (max-width: 850px) {
        font-size:1.8em;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
`;

const ContactShortly = styled.p`
    text-align: center;

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
    /* transform: translateX(100%); */
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


export default BusinessSignUp