
import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [windowWashing, setWindowWashing] = useState([]);
    const [poolCleaning, setPoolCleaning] = useState([]);
    const [painting, setPainting] = useState([]);


    //for future use to get the users info
    // const storedUserData = localStorage.getItem("userData");
    // const userData = JSON.parse(storedUserData)


    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
      // Perform search or other actions with searchValue

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
        .then((parse) => {
            setPoolCleaning(parse.data);
        })
        .catch((error) => {
            console.error('Error fetching pool cleaning data:', error);
        });

        fetch('/api/painting')
        .then((response) => response.json())
        .then((parse) => {
            setPainting(parse.data);
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
                            <ADiv key={user._id}>
                                <ProjectImg src={user.image}/>
                                
                                    <ProjectName>{user.name}</ProjectName>
                            
                                <ProjectBook to={`/company/${user._id}`}>Book Now!</ProjectBook>
                            </ADiv>
                        ))}
                    </Window>
                </MyProjects>

                <MyProjects>
                    <PoolTitle>Pool Cleaning</PoolTitle>
                    <Pool>
                        {poolCleaning.map((user) => (
                            <ADiv key={user._id}>
                                <ProjectImg src={user.image}/>
                                <ProjectName>{user.name}</ProjectName>
                                <p>reviews here at a later date</p>
                                <ProjectBook to={`/company/${user._id}`}>Book Now!</ProjectBook>
                            </ADiv>
                        ))}
                    </Pool>
                </MyProjects>

                <MyProjects>
                    <PaintingTitle>Painting</PaintingTitle>
                    <Painting>
                        {painting.map((user) => (
                            <ADiv key={user._id}>
                                <ProjectImg src={user.image}/>
                                <ProjectName>{user.name}</ProjectName>
                                <p>reviews here at a later date</p>
                                <ProjectBook to={`/company/${user._id}`}>Book Now!</ProjectBook>
                            </ADiv>
                        ))}
                    </Painting>
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
    width: 70%;
    border-radius: 15px;
    height: 375px;
    overflow-x: scroll;
    overflow-y: hidden;

    scrollbar-width: thin;
    scrollbar-color: #888888 #f4f4f4;
    scrollbar-track-color: #f4f4f4;
    scrollbar-face-color: #888888;

    @media (min-width: 200px) and (max-width: 850px) {
        height: 300px;
        top: 550px;
        width:80%;
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
    top: 1175px;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    width: 70%;
    border-radius: 15px;
    height: 375px;
    overflow-x: scroll;
    overflow-y: hidden;

    scrollbar-width: thin;
    scrollbar-color: #888888 #f4f4f4;
    scrollbar-track-color: #f4f4f4;
    scrollbar-face-color: #888888;

    @media (min-width: 200px) and (max-width: 850px) {
        height: 300px;
        top: 950px;
        width:80%;
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

const PaintingTitle = styled.p`
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

const Painting = styled.div`
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    top: 1700px;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;

    /* background-color: rgba(73, 77, 95, 0.9); */
    width: 70%;
    border-radius: 15px;
    height: 375px;
    overflow-x: scroll;
    overflow-y: hidden;

    scrollbar-width: thin;
    scrollbar-color: #888888 #f4f4f4;
    scrollbar-track-color: #f4f4f4;
    scrollbar-face-color: #888888;

    @media (min-width: 200px) and (max-width: 850px) {
        width: 80%;
        height: 300px;
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
    bottom: 6px;
    display: inline-block;
    position: relative;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    border-radius: 11px;
    overflow: hidden;
    margin:15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    min-width: 275px;
    
    @media (min-width: 200px) and (max-width: 850px) {
        min-width: calc(100vw / 2) ;
        /* width: 275px;
        height: 500px; */
    }
    
`;



const AnotherOne = styled.div`
`

const ProjectImg = styled.img`
    width: 275px;
    height: 150px;
    object-fit: cover;
    opacity: 1;
    transition: transform 0.3s ease-in-out;
    overflow:hidden;


    @media (min-width: 200px) and (max-width: 850px) {
        max-width: calc(100vw / 1.8);
        height: 160px;
        flex-shrink: 0;
    }

    @media (min-width: 1922px) and (max-width: 2562px) {
        width: 300px;
        height: 300px;
    }

    ${ADiv}:hover & {
        transform: scale(1.1)
    }
`;




const ProjectName = styled.p`
    
    padding: 0px;
    font-weight: bold;
    position: relative;
    bottom: 15px;
    transition: opacity 0.3s ease;
    margin-left:10px;
    z-index: 1;
    color:black;
    font-size: 1.3em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 200px) and (max-width: 850px) {
  
        font-size: 1em;
    }

`;

const ProjectBook = styled(Link)`
    font-size:1.3em;
    padding: 10px;
    font-weight: bold;
    text-align: center;
    z-index: 1;
    opacity: 1;
    color: black;
    @media (min-width: 200px) and (max-width: 850px) {
        top: 80%;
        width: 85px;
        font-size: 0.8em;
        margin-left: 37.5px;
    }

    
`;



export default HomePage


