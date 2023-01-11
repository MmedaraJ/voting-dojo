import React, { useEffect, useState } from 'react'
import Top3Polls from './TopPolls';
import RecentPolls from './RecentPolls';
import VotingDojoTitle from '../components/VotingDojoTitle';
import styled from 'styled-components';
import { PieChart } from 'react-minimal-pie-chart';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate,
  useParams
} from "react-router-dom";
import axios from 'axios';
import OptionDisplay from '../components/OptionDisplay';
import NavigationButton from '../components/NavigationButton';
import io from 'socket.io-client';

const Main = styled.div`
    text-align: center;
    padding: 2%;
    height: fit-content;
`;

const Button = styled.div`
    text-align: end;
`;

const Pick = styled.div`
    background-color: lightgray;
    padding: 1%;
    border: 2px solid black;
    height: fit-content;
`;

const Options = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; /* set column sizes here */
    grid-template-rows: auto auto; /* we want two rows */

    grid-gap: 10px; /* how far between cells? */
    grid-auto-flow: row; /* fill in by column, not row */
`;

const BigDiv = styled.div`
    margin-top: 1%;
    background-color: lightgray;
    padding: 1%;
    border: 2px solid black;
    height: fit-content;
`;

const Green = styled.div`
    background-color: green;
    position: relative;
    height: 20px;
    padding: 1%;
    font-size: small;
    border: black 2px solid;
`;

const Left = styled.div`
    text-align: left;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`;

const Right = styled.div`
    text-align: right;
    position: absolute;
    right: 1%;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`;

const ThePieChart = styled.div`
    display: inline-block;
    width: 400px;
    height: 400px;
    margin-right: 10px;
`;

const Votes = styled.div`
    width: 100%;
    vertical-align: top;
`;

const VotesText = styled.div`
    width: 50%;
    display: inline-block;
    position: relative;
    padding-left: 5%;
    padding-right: 5%;
    vertical-align: top;
`;

const LabelDiv = styled.div`
    width: 100%;
    display: inline-block;
    //height: 20px;
    position: relative;
    margin-bottom: 2%;
    margin-top: 2%;
`;

const LeftSpan = styled.div`
    width: 50%;
    text-align: left;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`;

const RightSpan = styled.div`
width: 50%;
    text-align: right;
    display: inline-block;
    position: absolute;
    right: 0%;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`;

const Home = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [poll, setPoll] = useState({});
    const [sortedOptionsByVotes, setSortedOptionsByVotes] = useState([]);
    const colors = [
        '#FFFF00',
        '#FF0000',
        '#A020F0',
        '#FFA500'
    ];
    const [voted, setVoted] = useState(false);
    const [socket] = useState(() => io(':8000'));

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/polls/${id}`)
            .then(res => {
                console.log(res);
                setPoll(res.data);
            })   
            .catch(err => console.log(err));    
    }, []);

    const sortOptionsByVotes = (updatedPoll) => {
        let sortedArr = [];
        if(updatedPoll.options.length > 0){
            let votesMap = new Map();
            //populate map
            updatedPoll.options.map((option, i) => {
                votesMap.set(option.text, option.votes);
            });
            //map to array
            const unsortedArr = [...votesMap];
            //sort array
            sortedArr = unsortedArr.sort(
                function(a, b){
                    return b[1] - a[1];
                }
            );
        }
        setSortedOptionsByVotes(sortedArr);
        pieChartArray();
    }

    const pieChartArray = () => {
        let arr = [];
        const colors = ['#E38627', '#C13C37', '#6A2135', '#1e68a2']
        sortedOptionsByVotes.map((option, i) => {
            const m = {
                title: option[0],
                value: option[1],
                color: colors[i]
            }
            arr.push(m);
        });
        return arr;
    }

    const mapOptions = (index) => {
        let final = [];
        poll.options.map((o, i) => {
            let m = {};
            if(i !== parseInt(index)){
                m = {
                    "text": o.text,
                    "votes": o.votes
                }
            }else{
                console.log(`i: ${i} -- index: ${index}`);
                m = {
                    "text": o.text,
                    "votes": o.votes + 1
                }
            }
            final.push(m);
        });
        return final;
    }

    const updateVote = (index) => {
        let optionsMapArray = mapOptions(index);
        axios.put(
            `http://localhost:8000/api/polls/update/${id}`, 
            {
                "question": poll.question,
                "options": optionsMapArray,
                "votes": poll.votes + 1
            },
        )
            .then(res => {
                setPoll(res.data);
                sortOptionsByVotes(res.data);
                console.log(res);
                broadcast();
                setVoted(true);
            })
            .catch(err => console.log(err));
    }

    const broadcast = () => {
        socket.emit("event_from_client", "world");
    }

    const buttonClick = (i) => {
        updateVote(i);
    }

    const nav = () => {
        navigate('/');
    }

    return (
        <Main>
            <VotingDojoTitle></VotingDojoTitle>
            {
                voted?
                <div>
                    <Button>
                        <NavigationButton
                            buttonText="Back to Home"
                            buttonColor="#6082B6"
                            onButtonClick={nav}
                        />
                    </Button>
                    <BigDiv>
                        <Green>
                            <Left>
                                <span>i</span>
                                &nbsp;
                                <span>
                                    Thanks for voting! Here are the results...
                                </span>
                            </Left>
                            <Right>
                                <span>x</span>
                            </Right>
                        </Green>
                        <h1>{poll.question}</h1>
                        <br></br>
                        <Votes>
                            <ThePieChart>
                                <PieChart
                                    data={pieChartArray()}
                                    label={({ dataEntry }) => dataEntry.value}
                                />
                            </ThePieChart>
                            <VotesText>
                                {
                                    sortedOptionsByVotes.length > 0 && sortedOptionsByVotes.map((option, i) => {
                                        return(
                                            <LabelDiv key={i}>
                                                <LeftSpan key={`${i}-left`}><span>{option[0]}</span></LeftSpan>&nbsp;
                                                <RightSpan key={`${i}-right`}><span>{option[1]} votes</span></RightSpan>
                                            </LabelDiv>
                                        );
                                    })
                                }
                            </VotesText>
                        </Votes>
                    </BigDiv>
                </div>:
                <Pick>
                    <h3>{poll.question}</h3>
                    <Options>
                        {
                            poll.options && poll.options.map((op, i) => {
                                return(
                                    <OptionDisplay
                                        key={i}
                                        option={op}
                                        color={colors[i]}
                                        onButtonClick={(e) => buttonClick(i)}
                                    />
                                );
                            })
                        }
                    </Options>
                </Pick>
            }
        </Main>  
    );
}

export default Home;