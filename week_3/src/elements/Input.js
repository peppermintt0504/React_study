import React from "react";
import styled from "styled-components";

const Input = (props) => {

    const { B_radius,width,height, type, label, value, _onChange, placeholder,border_color,multiLine} = props;
    const styles ={
        width : width,
        height : height,
        border_color : border_color,
        B_radius : B_radius,

    }
    if(multiLine){
        return (
        <Wrap>
            <P>{label}</P>
            <ElTextarea
            value={value}
            rows={10}
            placeholder={placeholder}
            onChange={_onChange}
            ></ElTextarea>
        </Wrap>
        );
    }

    return (
        <div>

            <P>{label}</P>
            <Wrap>
            <In {...styles} value={value}  type = {type} onChange = {_onChange} placeholder = {placeholder}></In>
            </Wrap>
        </div>
    );
}

Input.defaultProps ={
    label : false,
    onChange : false,
    placeholder : false,
    border_color : "gray",
    type : "text",
    width : "100%",
    height : "40px",
    B_radius : null,

};

const Wrap = styled.div`
    display : flex;
    /* justify-content : center;  */
    flex-wrap : wrap;
    align-items : center;
`;

const In = styled.input`
    border : ${(props)=> props.border_color} 1.5px solid;
    justify-content : center; 
    height : ${(props) => props.height};
    width : ${(props) => props.width};
    margin : auto;
    border-radius : ${(props) => props.B_radius};
`;
const P = styled.div`
    font-size : 12px;
    margin : 1px
`;
const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;
const ElTextarea = styled.textarea`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;