import React from "react";
import styled from "styled-components";

const Grid = (props) => {

    const {justify_content,is_flex,width,margin, padding, bg, children,center} = props;
    const styles = {
        is_flex : is_flex,
        width : width,
        margin : margin,
        padding : padding,
        bg : bg,
        justify_content: justify_content,
        center : center,

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
    bg : false,
    center : false,
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
    ${(props) => (props.center?`text-align : center;`:"")}
    


`;

export default Grid;