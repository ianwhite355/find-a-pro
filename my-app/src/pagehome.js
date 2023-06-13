// import { windowWashing, poolCleaning, carCleaning } from "./datatemp"
import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [windowWashing, setWindowWashing] = useState([]);
    const [poolCleaning, setPoolCleaning] = useState([]);
    const [carCleaning, setCarCleaning] = useState([]);


    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
      // Perform search or other actions with searchValue
        console.log('Search value:', searchValue);
    };

    
    useEffect(() => {
        fetch("/api/windowWashing")
        .then((response) => response.json())
        .then((parse) => {
            setWindowWashing(parse.data);
        })
        .catch((error) => {
            console.error('Error fetching window washing data:', error);
        });

        fetch('/api/poolCleaning')
        .then((response) => response.json())
        .then((data) => {
            console.log("testting")
            setPoolCleaning(data);
        })
        .catch((error) => {
            console.error('Error fetching pool cleaning data:', error);
        });

        fetch('/api/carCleaning')
        .then((response) => response.json())
        .then((data) => {
            console.log("testting")
            setCarCleaning(data);
        })
        .catch((error) => {
            console.error('Error fetching car cleaning data:', error);
        });
    }, []);


    return (
        <DisFlex>
        <MainBar>
            <SearchBar>
                <SearchInput type="text" placeholder="Search" value={searchValue} onChange={handleInputChange}/>
                <SubmitButton type="submit" onClick={handleSubmit}>Search</SubmitButton>
            </SearchBar>
        </MainBar>
        <Background>

            <MyProjects>
                <WindowTitle>Window Washing</WindowTitle>
                <Window>
                {windowWashing.map((user) => (
                    <ADiv key={user.id}>
                        <ProjectName>{user.name}</ProjectName>
                        <ProjectBook to={`/company/${user.id}`}>Book Now!</ProjectBook>
                        <ProjectImg src={user.image}/>
                    </ADiv>
                ))}
                </Window>
            </MyProjects>

            <MyProjects>
                <PoolTitle>Pool Cleaning</PoolTitle>
                <Pool>
                {poolCleaning.map((user) => (
                    <ADiv key={user.id}>
                        <ProjectName>{user.name}</ProjectName>
                        <ProjectBook to={`/company/${user.id}`}>Book Now!</ProjectBook>
                        <ProjectImg src={user.image}/>
                    </ADiv>
                ))}
                </Pool>
            </MyProjects>

            <MyProjects>
                <CarTitle>Car Detailing</CarTitle>
                <Car>
                {carCleaning.map((user) => (
                    <ADiv key={user.id}>
                        <ProjectName>{user.name}</ProjectName>
                        <ProjectBook to={`/company/${user.id}`}>Book Now!</ProjectBook>
                        <ProjectImg src={user.image}/>
                    </ADiv>
                ))}
                </Car>
            </MyProjects>

        </Background>
        </DisFlex>
    )

}

const DisFlex = styled.div`
    
`

const MainBar = styled.div`
    background-color:blue;
    width: 1000px;
    height: 150px;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius:10px;

    @media (min-width: 200px) and (max-width: 850px) {
        width: 80%;
    }

`;

const SearchBar = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
`;

const SearchInput = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 8px;
`;

const SubmitButton = styled.button`
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;



const Background = styled.div`
`


const MyProjects = styled.div`
    align-items: center;
    height: 100%;
    

`

const WindowTitle = styled.p`
    font-size:3em;
    text-align: center;
    color: white;
    font-weight: bold;
    position: relative;
    top: 250px;
    color: black;

    @media (min-width: 200px) and (max-width: 850px) {
        font-size: 2.2em;
    }
    
`

const Window = styled.div`
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    top: 650px;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    background-color: rgba(73, 77, 95, 0.9);
    width: 70%;
    border-radius: 15px;
    height: 300px;
    overflow-x: scroll;
    overflow-y: hidden;

    scrollbar-width: thin;
    scrollbar-color: #888888 #f4f4f4;
    scrollbar-track-color: #f4f4f4;
    scrollbar-face-color: #888888;

    @media (min-width: 200px) and (max-width: 1200px) {
        height: 225px;
        top: 550px;
    }

    @media (min-width: 1922px) and (max-width: 2562px) {
        height: 350px;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f4f4f4;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888888;
        border-radius: 4px;
    }
`;

const PoolTitle = styled.p`
    font-size:3em;
    text-align: center;
    color: white;
    font-weight: bold;
    position: relative;
    top: 650px;
    color: black;

    @media (min-width: 200px) and (max-width: 850px) {
        font-size: 2.5em;
        top: 550px;
    }

`

const Pool = styled.div`
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    top: 1150px;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    background-color: rgba(73, 77, 95, 0.9);
    width: 70%;
    border-radius: 15px;
    height: 300px;
    overflow-x: scroll;
    overflow-y: hidden;

    scrollbar-width: thin;
    scrollbar-color: #888888 #f4f4f4;
    scrollbar-track-color: #f4f4f4;
    scrollbar-face-color: #888888;

    @media (min-width: 200px) and (max-width: 600px) {
        height: 225px;
        top: 950px;
    }

    @media (min-width: 1922px) and (max-width: 2562px) {
        height: 350px;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f4f4f4;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888888;
        border-radius: 4px;
    }
`;

const CarTitle = styled.p`
    font-size:3em;
    text-align: center;
    color: white;
    font-weight: bold;
    position: relative;
    top: 1050px;
    color: black;

    @media (min-width: 200px) and (max-width: 850px) {
        font-size: 2.5em;
        top: 850px;
    }

`

const Car = styled.div`
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    top: 1650px;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    background-color: rgba(73, 77, 95, 0.9);
    width: 70%;
    border-radius: 15px;
    height: 300px;
    overflow-x: scroll;
    overflow-y: hidden;

    scrollbar-width: thin;
    scrollbar-color: #888888 #f4f4f4;
    scrollbar-track-color: #f4f4f4;
    scrollbar-face-color: #888888;

    @media (min-width: 200px) and (max-width: 1200px) {
        height: 225px;
        top: 1350px;
    }

    @media (min-width: 1922px) and (max-width: 2562px) {
        height: 350px;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f4f4f4;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888888;
        border-radius: 4px;
    }
`;



const ADiv = styled.div`
    position: relative;
    margin:15px;
    height: 100px;
    width: 100px;
    width: 22%;
    
    @media (min-width: 200px) and (max-width: 850px) {
        margin-right: 75px; 
        width: 100px;
        height: 100px;
    }
    
`;

const ProjectImg = styled.img`
    border-radius: 15px;
    width: 250px;
    height: 250px;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.3s ease;
    margin: 10px;

    @media (min-width: 200px) and (max-width: 850px) {
        width: 160px;
        height: 160px;
        flex-shrink: 0;
    }

    @media (min-width: 1922px) and (max-width: 2562px) {
        width: 300px;
        height: 300px;
    }

    ${ADiv}:hover & {
        opacity: 0.5;
    }
`;

const ProjectName = styled.p`
    background-color: rgba(73, 77, 95, 0.8);
    width:200px;
    padding: 10px;
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    transition: opacity 0.3s ease;
    text-align: center;
    z-index: 1;

    @media (min-width: 200px) and (max-width: 850px) {
        width: 85px;
        font-size: 0.8em;
        margin-left: 37.5px; /* Half of the width */
    }

`;

const ProjectBook = styled(Link)`
    color: white;
    background-color: rgba(73, 77, 95, 0.8);
    width:200px;
    padding: 10px;
    font-weight: bold;
    position: absolute;
    top: 160%;
    left: 50%;
    transform: translate(-50%, 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    text-align: center;
    z-index: 1;

    @media (min-width: 200px) and (max-width: 850px) {
        top: 80%;
        width: 85px;
        font-size: 0.8em;
        margin-left: 37.5px;
    }

    ${ADiv}:hover & {
    opacity: 1;
    }
`;



export default HomePage


