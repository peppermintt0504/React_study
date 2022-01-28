import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { Route, Routes } from "react-router-dom";

import {db} from "./firebase";
import {loadDicFB} from "./redux/modules/dict"

import "./App.css"

function Writing(){


    return (

        <Box>
            <h1>단어 추가하기</h1>
            <p>단어</p>
            <input></input>
            <p>발음</p>
            <input></input>
            <p>의미</p>
            <input></input>
            <p>예문</p>
            <input></input>
            <p>해석</p>
            <input></input>
        </Box>

    );

}

const Box = styled.div`
    width : 30vw;
    height : 500px;
    background-color : pink;
    margin : auto;
    text-align: left;
    padding : 20px;
    & h1{
        text-align : center;
        margin : 0;
        margin-bottom : 50px;
    }
    & input{
        background-color: #00000000;
        border : 0;
        border-bottom: 2px solid rgb(219, 232, 216);
    }
`;

export default Writing;