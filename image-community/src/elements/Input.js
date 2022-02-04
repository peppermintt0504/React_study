import React from "react";
import styled from "styled-components";

const Input = (props) => {

    const {width,height, type, label, value, _onChange, placeholder,border_color} = props;
    const styles ={
        width : width,
        height : height,
        border_color : border_color,
    }

    return (
        <div>

            <P>{label}</P>
            <Wrap>
            <In {...styles} type = {type} onChange = {_onChange} placeholder = {placeholder}></In>
            </Wrap>
        </div>
    );
}

Input.defaultProps ={
    label : false,
    value : false,
    onChange : false,
    placeholder : false,
    border_color : "gray",
    type : "text",
    width : "100%",
    height : "40px",

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
    height : ${(props) => props.height};
    width : ${(props) => props.width};
    margin : auto;
`;
const P = styled.div`
    font-size : 12px;
    margin : 1px
`;

export default Input;