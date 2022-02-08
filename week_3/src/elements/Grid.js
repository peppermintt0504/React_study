import { routerMiddleware } from "connected-react-router";
import React from "react";
import styled from "styled-components";

const Grid = (props) => {

    const { B_left, B_right ,flex_direction, justify_content,is_flex,width,margin, padding, BG_c, children,center} = props;
    const styles = {
        is_flex : is_flex,
        flex_direction: flex_direction ,
        width : width,
        margin : margin,
        padding : padding,
        bg : BG_c,
        justify_content: justify_content,
        center : center,
        B_left : B_left,
        B_right : B_right,

    };

    return(
        <React.Fragment>
            <GridBox {...styles}>
                {children}
            </GridBox>
        </React.Fragment>
    )
}

Grid.defaultProps ={
    children : null,
    is_flex :false,
    width : "100%",
    padding : false,
    margin : false,
    BG_c : false,
    center : false,
    flex_direction : "row",
}

const GridBox = styled.div`
    width : ${(props)=> props.width};
    height : 100%;
    box-sizing : border-box;
    ${(props) => (props.padding? `padding :${props.padding};`:"")}
    ${(props) => (props.margin? `margin : ${props.margin};`:"")}
    ${(props) => (props.bg? `background-color : ${props.bg};`:"")}
    ${(props) => (props.is_flex? `display : flex; align-items : center;justify-content :space-between;`:"")}
    ${(props) => (props.justify_content?`justify-content : ${props.justify_content};`:"")}
    ${(props) => (props.center?`align-items:  center;`:"")}
    ${(props) => (props.flex_direction?`flex-direction :  ${props.flex_direction};` :"")}
    ${(props) => (props.B_left?`border-left : ${props.B_left};` :"")}
    ${(props) => (props.B_right?`border-right :  ${props.B_right};` :"")}
    
`;

export default Grid;