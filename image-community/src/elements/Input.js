import React from "react";
import styled from "styled-components";

const Input = (props) => {

    const {label,value, _onChange, placeholder,border_color} = props;

    return (
        <div>

            <P>{label}</P>
            <Wrap>
            <In onChange = {_onChange} placeholder = {placeholder}></In>
            </Wrap>
        </div>
    );
}

Text.defaultProps ={
    label : false,
    value : false,
    onChange : false,
    placeholder : false,
    border_color : "black",

};

const Wrap = styled.div`
    display : flex;
    justify-content : center; 
    flex-wrap : wrap;
    align-items : center;
`;

const In = styled.input`
    border : ${(props)=> props.border_color} 1.5px solid;
    justify-content : center; 
    height : 35px;
    margin : auto;
    width : 100%;
`;
const P = styled.div`
    font-size : 12px;
    margin : 1px
`;

export default Input;