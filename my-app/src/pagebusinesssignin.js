import { useState } from "react"
import styled from "styled-components"
import hideImage from "./images/hide.png"
import viewImage from "./images/view.png"
import { Link, useNavigate } from "react-router-dom"

const BusinessSignIn = () => {
    const [signIn, setSignIn] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [wrongMessage, setWrongMessage] = useState(null)

    const navigate = useNavigate()

    const handleChange = (key,value) => {
        setSignIn({ ...signIn, [key]: value })
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const handleSignIn = () => {
        fetch('/login/business', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(signIn)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful') {
                const userData = data.userData;
                localStorage.setItem('userData', JSON.stringify(userData._id));
                localStorage.setItem('type', JSON.stringify("business") )
                navigate("/businesspage")
                window.location.reload()
            }  else if (data.message === 'Invalid email') {
                setWrongMessage("Wrong email")
            } else if (data.message === 'Invalid password') {
                setWrongMessage("Wrong password")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    return (
        <Container>
            <Title>Log in!</Title>
            
            <EmailContainer>
                <EmailInput type="email" placeholder={`email`} value={signIn.email} onChange={(event) => handleChange("email", event.target.value)}></EmailInput>
            </EmailContainer>
            
            <PassWordContainer>
                <PasswordInput type={showPassword ? "text" : "password"} placeholder="password" value={signIn.password} onChange={(event) => handleChange("password", event.target.value)}></PasswordInput>
                <TogglePasswordButton onClick={handleTogglePassword}>
                    <ToggleIcon src={showPassword ? hideImage : viewImage} alt={showPassword ? "Hide" : "Show"}/>
                </TogglePasswordButton>
            </PassWordContainer>
            {wrongMessage && (
                <p>{wrongMessage}</p>
            )}
            <SignInButton onClick={handleSignIn}>Sign in!</SignInButton>
            <SignUp to="/businessSignUp">Your business is not registered yet?</SignUp>
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
    width: 350px;
    height: 40px;
    top:300px;
    padding-left: 10px;
    @media (min-width: 200px) and (max-width:850px){
        top:200px;
        height: 30px;
        width:250px;
    }
    @media (min-width: 200px) and (max-width:320px){
        top:200px;
        height: 30px;
        width:150px;
        font-size: 1em;
    }
`


const PassWordContainer = styled.div`
    position: relative;
    margin-top: 25px;
`

const PasswordInput = styled.input`
    border-radius: 10px;
    font-size: 1.5em;
    width: 350px;
    height: 40px;
    padding-left: 10px;

    @media (min-width: 321px) and (max-width:850px){
        top:200px;
        height: 30px;
        width:250px;
        font-size:1.3;
    }
    @media (min-width: 200px) and (max-width:320px){
        top:200px;
        height: 30px;
        width:150px;
        font-size: 1.1em;
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
`;

const ToggleIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const SignInButton = styled.button`
    background-color: #3457D5;
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

export default BusinessSignIn