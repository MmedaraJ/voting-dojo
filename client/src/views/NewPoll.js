import React from 'react'
import NavigationButton from '../components/NavigationButton';
import VotingDojoTitle from '../components/VotingDojoTitle';
import styled from 'styled-components';
import SubmitPoll from '../components/SubmitPoll';
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
    margin-top: 1%;
`;

const SubmitPollDiv = styled.div`
    padding: 2%;
`;

const NewPoll = (props) => {
    const navigate = useNavigate();

    const nav = () => {
        navigate('/');
    }
    
    return (
        <Main>
            <VotingDojoTitle></VotingDojoTitle>
            <Button>
                <NavigationButton
                    buttonText="Back to Home"
                    buttonColor="#6082B6"
                    onButtonClick={nav}
                />
            </Button>
            <BigDiv>
                <div>
                    <SubmitPoll/>
                </div>
            </BigDiv>
        </Main>  
    );
}

export default NewPoll;