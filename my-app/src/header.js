import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Hamburger from "./hamburger";

export const Header = () => {

    return (
        <Heading>
            <Hamburger/>
            <HomeLink>logo here</HomeLink>
            <Sign to="/signin">Sign in</Sign>
        </Heading>
        
    )
}

const Heading = styled.div`
    position:relative;
    top:0%;
    color:white;
    font-size: 1em;
    display: flex;
    justify-content: space-between;
    height: 75px;

    @media (min-width: 200px) and (max-width: 700px) {
        height: 60px;
        font-size: .5em;
    }

`


const HomeLink = styled(Link)`
    position: relative;
    left: 50%;
    transform: translate(-55%);
    padding: 10px;
    text-decoration: none;
    font-size: 1.8em;
    font-weight: bold;
    position: relative;

    &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: 20px;
    left: 0;
    background-color: white;
    transform: scaleX(0);
    transition: transform 0.3s ease;
    }

    &:hover::before {
    transform: scaleX(1);
        cursor: pointer;
    }

    & + div {
        cursor: pointer;
    }
`;


const Sign = styled(Link)`
    /* text-decoration:none; */
    padding: 20px;
    font-size:2em;
    position: relative;
    right: 10px;
    bottom:10px;
    color:black;
    @media (min-width: 200px) and (max-width: 700px) {
        bottom: 10px;
    }
`



export default Header