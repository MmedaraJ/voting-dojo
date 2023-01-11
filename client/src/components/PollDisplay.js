import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";

const MainDiv = styled.div`
    text-align: left;
    border: 2px solid black;
    margin-bottom: 12px;
    padding: 0.5%;
    background-color: white;
`;

const ThePieChart = styled.div`
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const Info = styled.div`
    display: inline-block;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    line-height: 4px;
    text-align: left;
`;

const Question = styled.p`
    font-size: small;
    color: blue;
    text-decoration: underline;
`;

const Label = styled.label`
    font-size: x-small;
`;

const Time = styled.p`
    font-size: xx-small;
    font-style: italic; 
`;

const PollDisplay = (props) => {
    const {poll, path} = props;
    const [sortedOptionsByVotes, setSortedOptionsByVotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        sortOptionsByVotes(poll.options);
    }, [poll]);

    const relativeTime = (timestamp) => {
        const date = new Date();
        const todayTimestamp = date.getTime();
        const seconds = Math.floor(todayTimestamp / 1000);
        const newTimeStamp =  Math.floor(new Date(timestamp).getTime() / 1000);
        const difference = seconds - newTimeStamp;
        let output = ``;

        if (difference < 60) {
            // Less than a minute has passed:
            output = `${difference} seconds ago`;
        } else if (difference < 3600) {
            // Less than an hour has passed:
            output = `${Math.floor(difference / 60)} minutes ago`;
        } else if (difference < 86400) {
            // Less than a day has passed:
            output = `${Math.floor(difference / 3600)} hours ago`;
        } else if (difference < 2620800) {
            // Less than a month has passed:
            output = `${Math.floor(difference / 86400)} days ago`;
        } else if (difference < 31449600) {
            // Less than a year has passed:
            output = `${Math.floor(difference / 2620800)} months ago`;
        } else {
            // More than a year has passed:
            output = `${Math.floor(difference / 31449600)} years ago`;
        }

        return output;
    }

    const sortOptionsByVotes = () => {
        let sortedArr = [];
        if(poll.options.length > 0){
            let votesMap = new Map();
            //populate map
            poll.options.map((option, i) => {
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

    const nav = () => {
        navigate(`/polls/${poll._id}`);
    }

    return (
        <MainDiv onClick={nav}>
            <ThePieChart>
                <PieChart
                    data={pieChartArray()}
                    label={({ dataEntry }) => dataEntry.value}
                />
            </ThePieChart>
            <Info>
                <Question>{poll.question}</Question>
                {
                    sortedOptionsByVotes.length > 0 && sortedOptionsByVotes.map((option, i) => {
                        return(
                            <Label key={i}>
                                {
                                    i === poll.options.length - 1 ?
                                    <span>{option[0]}: {option[1]} votes </span>:
                                    <span>{option[0]}: {option[1]} votes | </span>
                                }
                            </Label>
                        );
                    })
                }
                <Time>({relativeTime(poll.createdAt)})</Time>
            </Info>
        </MainDiv>
    );
}

export default PollDisplay;