import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";

const Button = styled.button`
    background-color: ${props => props.color};
    padding: 0.5%;
    border: black 2px solid;
    color: black;
`;

const NavigationButton = (props) => {
    const {
        buttonText, 
        buttonColor, 
        onButtonClick
    } = props;

    Button.defaultProps = {
        color: buttonColor
    }

    return(
        <div>
            <Button onClick={onButtonClick}>
                {buttonText}
            </Button>
        </div>
    );
}

export default NavigationButton;