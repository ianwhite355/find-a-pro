import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';


export const Header = () => {

    const navigate = useNavigate()

    const handleAbout = () => {
        navigate("/about")
    }

    return (
        <Heading>

                <Headertext>Ian White</Headertext>
                
                <div>
                    <About onClick={handleAbout}>About</About>
                </div>

                <div>
                    <Link to="https://www.linkedin.com/in/ian-white-1b652622b/" target="blank">
                        <HeaderLogo/>
                    </Link>
                </div>


        </Heading>
        
    )
}

const Heading = styled.div`
    position:relative;
    top:0%;
    color:white;
    font-size: 1.2em;
    background-color: #494D5F;
    display: flex;
    justify-content: space-between;
    height: 100px;
`


const About = styled.h1`
    transform: translate(-50%);
    &:hover {
        cursor: pointer;
    }

    & + div {
        cursor: pointer;
    }
`

const Headertext = styled.h1`
    padding-left: 25px;
    color: white;
`

const HeaderLogo = styled.img`
    padding-right: 25px;
    position:relative;
    top: 20px;
    width:75px;
    height:auto;
`

export default Header