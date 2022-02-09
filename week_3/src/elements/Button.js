import React from "react";
import styled from "styled-components";


const Button = (props) => {
    const { radius,border_color ,width, height, color, text, _onClick, BG_c,is_float, children} = props;
    
    const sytles = {
        color : color,
        background_color : BG_c,
        height : height,
        width: width,
        border_color : border_color,
        radius : radius,
    }
    
    
    if(is_float){

        return(
            <F_btn onClick={()=>_onClick()}>{children}</F_btn>
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
    BG_c : "black",
    color : "white",
    height : "40px",
    width : "100%",
    is_float : false,
    border_color: null,
    radius : null,


};

const Btn = styled.button`
    
    background-color : ${(props) => (props.background_color)};
    height : ${(props) => props.height};
    width : ${(props) => props.width};
    color : ${(props) => (props.color)};
    border : ${(props) => props.border_color};
    border-radius : ${(props) => props.radius}


`;

const F_btn = styled.button`
    height : 50px;
    width : 50px;
    border : none;
    border-radius : 50px;
    background-color : white;
    color : #d2dbf4;
    box-sizing :border-box;
    font-size : 50px;
    font-weight : 600;
    position : fixed;
    right : 30px;
    bottom : 40px;
    text-align : center;
    vertical-align : middle;
`;

export default Button;