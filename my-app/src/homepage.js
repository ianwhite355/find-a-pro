import { windowWashing } from "./datatemp"
import styled from "styled-components"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { poolCleaning } from "./datatemp";

const HomePage = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
      // Perform search or other actions with searchValue
        console.log('Search value:', searchValue);
    };

    return (
        <div>
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
                        <ProjectBook>Book Now!</ProjectBook>
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
                        <ProjectBook>Book Now!</ProjectBook>
                        <ProjectImg src={user.image}/>
                    </ADiv>
                ))}
                </Pool>
            </MyProjects>
        </Background>
        </div>
    )

}

const MainBar = styled.div`
    background-color:blue;
    width: 1000px;
    height: 150px;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius:10px;
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
    top: 180px;
    color: black;
`

const Window = styled.div`
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    background-color: rgba(73, 77, 95, 0.9);
    width: 80%;
    border-radius: 15px;
    height: 300px;
    overflow-x: scroll;

    scrollbar-width: thin;
    scrollbar-color: #888888 #f4f4f4;
    scrollbar-track-color: #f4f4f4;
    scrollbar-face-color: #888888;

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
    top: 500px;
    color: black;
`

const Pool = styled.div`
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    background-color: rgba(73, 77, 95, 0.9);
    width: 80%;
    border-radius: 15px;
    height: 300px;
    overflow-x: scroll;

    scrollbar-width: thin;
    scrollbar-color: #888888 #f4f4f4;
    scrollbar-track-color: #f4f4f4;
    scrollbar-face-color: #888888;

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
`;

const ProjectImg = styled.img`
    border-radius: 15px;
    width: 250px;
    height: 250px;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.3s ease;
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
    /* ${ADiv}:hover & {
    opacity: 1;
    } */
`;

const ProjectBook = styled.p`
    background-color: rgba(73, 77, 95, 0.8);
    width:200px;
    padding: 10px;
    font-weight: bold;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    text-align: center;
    z-index: 1;
    ${ADiv}:hover & {
    opacity: 1;
    }
`;



export default HomePage