import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
    border: 2px solid black;
    background-color: lightgray;
    margin-bottom: 1%;
    padding: 1%;
    text-align: center;
`;

const VotingDojoTitle = () => {
    return (
        <Div>
            <h1>Voting Dojo</h1>
        </Div>
    );
}

export default VotingDojoTitle;