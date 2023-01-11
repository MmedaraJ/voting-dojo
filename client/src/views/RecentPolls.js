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
    overflow-y: auto;
    height: 310px;
`;

const H2 = styled.h2`
    margin-left: 1%;
`;

const RecentPolls = (props) => {
    const [socket] = useState(() => io(':8000'));
    const [polls, setPolls] = useState([]);

    useEffect(()=>{
        getRecentPolls();
        socket.on("send_data_to_all_other_clients", (arg) => {
            console.log(arg);
            getRecentPolls();   
        });  
    }, []);

    const getRecentPolls = () => {
        axios.get("http://localhost:8000/api/polls/recent")
            .then(res => {
                console.log(res.data);
                setPolls(res.data);
            })   
            .catch(err => console.log(err));     
    }

    return (
        <Div>
            <H2>Recent Polls</H2>
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

export default RecentPolls;