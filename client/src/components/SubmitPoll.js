import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const Div = styled.div`
    padding: 2%;
    border: 2px solid black;
    background-color: lightgray;
    overflow-y: auto;
`;

const FormDiv = styled.div`
    display: flex;
`;

const LeftDiv = styled.div`
    flex: 1;
    margin-right: 1%;
    padding: 2%;
    text-align: left;
`;

const RightDiv = styled.div`
    flex: 1;
    padding: 2%;
    margin-left: 1%;
`;

const SubmitButton = styled.div`
    text-align: center;
    justify-content: center;
    vertical-align: bottom;
`;

const TextArea = styled.textarea`
    background-color: white;
    margin-bottom: 2%;
    margin-top: 2%;
    width: 100%;
    border: 2px black solid;
    resize: none;
`;

const OptionDiv = styled.div`
    text-align: left;
`;

const Asteriks = styled.span`
    color: red;
`;

const Inputs = styled.input`
    width: 100%;
    height: 30px;
    margin-bottom: 2%;
    margin-top: 2%;
    border: 2px black solid;
`;

const SubmitInput = styled.input`
    width: 100%;
    background-color: green;
    height: 30px;
`;

const RedP = styled.p`
    color: red;
    font-size: xx-small;
    text-align: left;
`;

const Error = styled.p`
    color: red;
    font-size: xx-small;
    text-align: start;
`;

const Success = styled.p`
    color: green;
    font-size: xx-small;
    text-align: start;
`;

const SubmitPoll = (props) => {
    const [state, setState] = useState({
        question: "",
        options: ["", "", "", ""]
    });
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    const filterOptions = (op) => {
        let filtered = [];
        op.map((o) => {
            if(o.length > 0){
                filtered.push(o);
            }
        });
        return filtered;
    }

    const mapOptions = (op) => {
        let final = [];
        op.map((o) => {
            const m = {
                "text": o,
                "votes": 0
            }
            final.push(m);
        });
        return final;
    }

    const countDuplicates = (op) => {
        let dupExists = false;
        for(let i=0; i< op.length; i++){
            const l = op.filter((v) => (v.trim().toLowerCase() === op[i].trim().toLowerCase())).length;
            if(l > 1){
                dupExists = true;
                break;
            }
        }
        return dupExists;
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let filteredOptions = filterOptions([...state.options]);
        
        if(!countDuplicates(filteredOptions)){
            let optionsMapArray = mapOptions(filteredOptions);
            postPoll(optionsMapArray);
        }else{
            setErrors(["Options must be unique"]);
        }
    }

    const postPoll = (op) => {
        axios.post(
            "http://localhost:8000/api/polls/new", 
            {
                "question": state.question,
                "options": op,
                "votes": 0,
            }
        )
            .then(res => {
                console.log(res);
                setState({
                    question: "",
                    options: ["", "", "", ""]
                });
                setSuccess(res.data.msg);
            })
            .catch(err => {
                const errorArr = [];

                if(err.response.data.errors){
                    const errorResponse = err.response.data.errors;

                    for(const key of Object.keys(errorResponse)){
                        errorArr.push(errorResponse[key].message);
                    }
                }else if(err.errors.question.properties.kind === 'unique'){
                    errorArr.push("Question already exists");
                }
                setErrors(errorArr);
            });
    }

    const onInputChanged = (e) => {
        let question = state.question;
        let options = state.options;

        const name = e.target.name;
        const value = e.target.value;

        switch(name){
            case "question":
                question = value;
                break;
            case "option-1":
                options[0] = value;
                break;
            case "option-2":
                options[1] = value;
                break;
            case "option-3":
                options[2] = value;
                break;
            case "option-4":
                options[3] = value;
                break;
            default:
        }

        if(success.length > 0){setSuccess("");}
        if(errors.length > 0){setErrors([]);}
        setState({
            question: question,
            options: options
        });
    }

    return(
        <Div>
            <form id="submit-poll" onSubmit={onSubmitHandler}>
                <FormDiv>
                    <LeftDiv>
                        <label>Your question: <Asteriks>*</Asteriks></label>
                        <div>
                            <TextArea
                                required
                                name="question"
                                rows={5}
                                minLength={10}
                                value={state.question}
                                onChange={onInputChanged}
                            />
                        </div>
                        <SubmitButton>
                            <SubmitInput
                                type="submit"
                                value="Submit Poll"
                            />
                            <RedP>* Indicates a required field</RedP>
                        </SubmitButton>
                    </LeftDiv>
                    <RightDiv>
                        <OptionDiv>
                            <label>Option 1: <Asteriks>*</Asteriks></label>
                            <div>
                                <Inputs
                                    required
                                    name="option-1"
                                    type="text"
                                    minLength={3}
                                    value={state.options[0]}
                                    onChange={onInputChanged}
                                />
                            </div>
                        </OptionDiv>
                        <OptionDiv>
                            <label>Option 2: <Asteriks>*</Asteriks></label>
                            <div>
                                <Inputs
                                    required
                                    name="option-2"
                                    type="text"
                                    minLength={3}
                                    value={state.options[1]}
                                    onChange={onInputChanged}
                                />
                            </div>
                        </OptionDiv>
                        <OptionDiv>
                            <label>Option 3:</label>
                            <div>
                                <Inputs
                                    type="text"
                                    name="option-3"
                                    minLength={3}
                                    value={state.options[2]}
                                    onChange={onInputChanged}
                                />
                            </div>
                        </OptionDiv>
                        <OptionDiv>
                            <label>Option 4:</label>
                            <div>
                                <Inputs
                                    type="text"
                                    name="option-4"
                                    minLength={3}
                                    value={state.options[3]}
                                    onChange={onInputChanged}
                                />
                            </div>
                        </OptionDiv>
                        {errors.map((err, index) => <Error key={index}>{err}</Error>)}
                        {success && <Success>{success}</Success>}
                    </RightDiv>
                </FormDiv>
            </form>
        </Div>
    );
}

export default SubmitPoll;