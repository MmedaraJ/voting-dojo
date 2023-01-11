import React from 'react'
import NavigationButton from '../components/NavigationButton';
import Top3Polls from './TopPolls';
import RecentPolls from './RecentPolls';
import VotingDojoTitle from '../components/VotingDojoTitle';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";

const Main = styled.div`
    text-align: center;
    padding: 2%;
`;

const Button = styled.div`
    text-align: end;
`;

const BigDiv = styled.div`
    display: flex;
    margin-top: 1%;
`;

const Top3 = styled.div`
    flex: 1;
`;

const Recent = styled.div`
    flex: 1;
    margin-left: 1%;
`;

const Home = (props) => {
    const navigate = useNavigate();

    const nav = () => {
        navigate('/polls/new');
    }

    return (
        <Main>
            <VotingDojoTitle></VotingDojoTitle>
            <Button>
                <NavigationButton
                    buttonText="Create your own poll"
                    buttonColor="#6082B6"
                    onButtonClick={nav}
                />
            </Button>
            <BigDiv>
                <Top3>
                    <Top3Polls/>
                </Top3>
                <Recent>
                    <RecentPolls/>
                </Recent>
            </BigDiv>
        </Main>  
    );
}

export default Home;