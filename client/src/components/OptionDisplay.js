import React from 'react';
import styled from 'styled-components';
import NavigationButton from '../components/NavigationButton';

const Div = styled.div`
    background-color: white;
    padding: 1%;
    border: 2px solid black;
    text-align: center;
    height: 100px;
`;

const P = styled.p`
    margin-bottom: 5%;
`;

const OptionDisplay = (props) => {
    return(
        <Div>
            <P>{props.option.text}</P>
            <NavigationButton
                buttonText={`Vote ${props.option.text}`}
                buttonColor={props.color}
                onButtonClick={props.onButtonClick}
            />
        </Div>
    );
}

export default OptionDisplay;