import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PollDisplay from '../components/PollDisplay';
import styled from 'styled-components';
import io from 'socket.io-client';

const Div = styled.div`
    padding: 1%;
    margin-bottom: 1%;
    border: 2px solid black;
    background-color: lightgray;
    text-align: left;
    height: 310px;
    overflow-y: auto;
`;

const H2 = styled.h2`
    margin-left: 1%;
`;

const Top3Polls = (props) => {
    const [socket] = useState(() => io(':8000'));
    const [polls, setPolls] = useState([]);
    const NUMBEROFVOTES = 3;

    useEffect(() => {
        getTopPolls(); 
        socket.on("send_data_to_all_other_clients", (arg) => {
            console.log(arg);
            getTopPolls();   
        });
    }, []);

    const getTopPolls = () => {
        axios.get(`http://localhost:8000/api/polls/top/${NUMBEROFVOTES}`)
            .then(res => {
                setPolls(res.data)
            })   
            .catch(err => console.log(err));    
    }

    return (
        <Div>
            <H2>Top {NUMBEROFVOTES} Polls</H2>
            {
                polls.length > 0 && polls.map((poll, i) => {
                    return(
                        <PollDisplay 
                            key={i} 
                            poll={poll}
                        ></PollDisplay>
                    );
                })
            }
        </Div>
    );
}

export default Top3Polls;