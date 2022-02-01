import React from "react";
import styled from "styled-components";

const Image =(props) =>{
    const {shape, src, size} = props;

    const styles = {
        src : src,
        size : size,
    }

    if(shape === 'circle'){
        return (
            <ImageCircle {...styles}>
    
            </ImageCircle>
        )
    }

    if(shape === 'rectangle'){
        return (
            <AspectOutter>
                <AspectInner {...styles}>

                </AspectInner>
            </AspectOutter>
        )
    }
    return null

    
}

Image.defaultProps ={
    shape : "rectangle",
    src : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/",
    size : 36,

};

const AspectOutter = styled.div`
    width : 100%;
    min-width : 250px;
`;

const AspectInner = styled.div`
    position : relative;
    padding-top : 75%;
    overflow : hidden;
    background-image : url(${(props) => props.src});
    background-size : cover;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width : var(--size);
    height : var(--size);
    border-radius: var(--size);

    background-image : url("${(props) => props.src}");
    background-size : cover;
    margin : 4px;

`;

export default Image;