import { useState } from "react"
import styled from "styled-components"
import hideImage from "./images/hide.png"
import viewImage from "./images/view.png"
import emailIcon from "./images/emailicon.png"
import passwordIcon from "./images/passwordicon.png"
import { Link } from "react-router-dom"

const SignIn = () => {
    const [signIn, setSignIn] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (key,value) => {
        setSignIn(value)
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container>
            <Title>Log in!</Title>
            
            <EmailContainer>
                <EmailInput type="email" placeholder={`email`} onChange={(event) => handleChange("name", event.target.value)}></EmailInput>
            </EmailContainer>
            
            <PassWordContainer>
                <PasswordInput type={showPassword ? "text" : "password"} placeholder="password" onChange={(event) => handleChange("name", event.target.value)}></PasswordInput>
                <TogglePasswordButton onClick={handleTogglePassword}>
                    <ToggleIcon src={showPassword ? hideImage : viewImage} alt={showPassword ? "Hide" : "Show"}/>
                </TogglePasswordButton>
            </PassWordContainer>

            <SignInButton>Sign in!</SignInButton>
            <SignUp to="/usersignup">Don't have an account yet, sign up!</SignUp>
        </Container>
    )
}

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
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    @media (min-width: 200px) and (max-width:850px){
        width: 90%;
    }
`;

const Title = styled.h1`
`

const EmailContainer = styled.div`
    display: Flex;
    flex-direction: column;
    padding: 20px;
    
`

const EmailInput = styled.input`
    border-radius: 10px;
    font-size: 1.5em;
    width: 300px;
    height: 40px;
    top:300px;
    padding-left: 60px;
    background-image: url(${emailIcon});
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 30px;
    @media (min-width: 200px) and (max-width:850px){
        top:200px;
        height: 30px;
        width:250px;
    }
`


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

const SignInButton = styled.button`
    background-color: #007bff;
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
`

const SignUp = styled(Link)`
    position: relative;
    right:150px;
    padding: 10px;
    @media (min-width: 200px) and (max-width:850px){
        right:0px;
    }
`

export default SignIn