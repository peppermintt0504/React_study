import React from "react";
import styled from "styled-components";


const Button = (props) => {
    const {width, height, color, text, _onClick, background_color,is_float, children} = props;
    
    const sytles = {
        color : color,
        background_color : background_color,
        height : height,
        width: width,
    }
    
    
    if(is_float){

        return(
            <F_btn onClick={()=>_onClick()}>{text}</F_btn>
        )
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
    height : "40px",
    width : "100%",
    is_float : false,


};

const Btn = styled.button`
    
    background-color : ${(props) => (props.background_color)};
    height : ${(props) => props.height};
    width : ${(props) => props.width};
    color : ${(props) => (props.color)};
    


`;

const F_btn = styled.button`
    height : 50px;
    width : 50px;
    border : none;
    border-radius : 50px;
    background-color : yellow;
    color : black;
    box-sizing :border-box;
    font-size : 40px;
    font-weight : 600;
    position : fixed;
    right : 15px;
    bottom : 40px;
    text-align : center;
    vertical-align : middle;
`;

export default Button;