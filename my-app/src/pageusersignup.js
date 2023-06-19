import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import hideImage from "./images/hide.png"
import viewImage from "./images/view.png"
import passwordIcon from "./images/passwordicon.png"


const UserSignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        password:""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allData = {
            address: formData.address,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password
        };


        fetch("/api/add-user", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
        })
            // .then((response) => response.json())
            .then((response) => {
                if (response.status === 201) {
                    navigate("/");
                    response.json()
                } else if (response.status === 409) {
                    setErrorMessage("Email is already taken. Please choose a different email.");
                } else {
                    setErrorMessage("An unknown error occurred during sign up, please contact support.");
                    throw new Error("An unknown error occurred during sign up, please contact support.");
                }
            })
            .catch((error) => {
                console.error(error);
            });


    };

    return (
        <Container>
            <FormContainer onSubmit={handleSubmit}>
                <Label>Email:</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required/>

                <Label>First Name:</Label>
                <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required/>

                <Label>Last Name:</Label>
                <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <Label>Address:</Label>
                <Input type="text" name="address" value={formData.address} onChange={handleChange} required/>

                <Label>Phone Number:</Label>
                <Input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/>

                <PassWordContainer>
                    <PasswordInput type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required/>
                    <TogglePasswordButton onClick={handleTogglePassword}>
                        <ToggleIcon src={showPassword ? hideImage : viewImage} alt={showPassword ? "Hide" : "Show"} />
                    </TogglePasswordButton>
                </PassWordContainer>

                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                <Button type="submit">Submit</Button>
            </FormContainer>
        </Container>
    )
};

const Container = styled.div`
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top:50px;
    padding: 40px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    @media (min-width: 200px) and (max-width:850px){
        width: 90%;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
`;

const Label = styled.label`
    margin-bottom: 5px;
`;

const Input = styled.input`
    padding: 5px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
`;



const PassWordContainer = styled.div`
    position: relative;
    margin-top: 25px;
    
`

const PasswordInput = styled.input`

    border-radius: 10px;
    font-size: 1.5em;
    width: 300px;
    height: 40px;
    padding-left: 60px;
    background-image: url(${passwordIcon});
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 30px;

    @media (min-width: 200px) and (max-width:850px){
        top:200px;
        height: 30px;
        width:250px;
    }

`

const TogglePasswordButton = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    /* background: white;
    border: none;
    position: relative;
    left: 10px;
    width: 50px; */
`;

const ToggleIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const ErrorMessage = styled.p`
`

export default UserSignUp;
