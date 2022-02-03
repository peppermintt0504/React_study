import React from "react";
import styled from "styled-components";


const Button = (props) => {
    console.log(props)
    const {color,text, _onClick, background_color,children} = props;
    const sytles = {
        color : color,
        background_color : background_color,

    }

    return (
    
    
    <div>
        <Btn {...sytles} onClick={()=>_onClick()} >{text}</Btn>

    </div>
    
    
    );
}
Button.defaultProps ={
    text : false,
    _onClick : false,
    background_color : "black",
    color : "white",

};

const Btn = styled.button`
    
    background-color : ${(props) => (props.background_color)};
    height : 40px;
    width : 100%;
    color : ${(props) => props.color};


`;

export default Button;