import { useState } from "react"
import styled from "styled-components"
import hideImage from "./images/hide.png"
import viewImage from "./images/view.png"

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
            
            <EmailContainer>
                <Placeholder>Email:</Placeholder>
                <EmailInput type="text" placeholder="example@mail.com" onChange={(event) => handleChange("name", event.target.value)}></EmailInput>
            </EmailContainer>
            
            <PassWordContainer>
                <Placeholder>PassWord:</Placeholder>
                <PasswordInput type={showPassword ? "text" : "password"} placeholder="password" onChange={(event) => handleChange("name", event.target.value)}></PasswordInput>
                <TogglePasswordButton onClick={handleTogglePassword}>
                    <ToggleIcon src={showPassword ? hideImage : viewImage} alt={showPassword ? "Hide" : "Show"}/>
                </TogglePasswordButton>
            </PassWordContainer>

            <SignInButton>Sign in!</SignInButton>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top:50px;

`;

const EmailContainer = styled.div`
    display: Flex;
    align-items: center;
`

const Placeholder = styled.p`
    font-size: 2em;
    padding-right: 10px;
    @media (min-width: 200px) and (max-width:850px){
        font-size:1.4em;
    }
`

const EmailInput = styled.input`
    text-align: center;
    border-radius: 10px;
    font-size: 1.5em;
    width: 300px;
    height: 40px;
    top:300px;
    @media (min-width: 200px) and (max-width:850px){
        top:200px;
        height: 30px;
        width:270px;
    }
`


const PassWordContainer = styled.div`
    display: flex;
    align-items: center;
    
`

const PasswordInput = styled.input`
    text-align: center;
    border-radius: 10px;
    font-size: 1.5em;
    width: 300px;
    height: 40px;
    @media (min-width: 200px) and (max-width:850px){
        @media (min-width: 200px) and (max-width:850px){
        top:200px;
        height: 30px;
        width:205px;
    }
    }
`

const TogglePasswordButton = styled.button`
    background: white;
    border: none;
    position: relative;
    left: 10px;
    width: 50px;
`;

const ToggleIcon = styled.img`
    width: 100%;
    height: 100%;
`;

const SignInButton = styled.button`

`

export default SignIn