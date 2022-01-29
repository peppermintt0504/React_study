import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import {db} from "./firebase";
import {createDicFB} from "./redux/modules/dict"

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import "./App.css"
import { SnowshoeingOutlined } from "@mui/icons-material";

function Writing(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const word = React.useRef(null);
    const pron = React.useRef(null);
    const mean = React.useRef(null);
    const exam = React.useRef(null);
    const inter = React.useRef(null);

    const addDict = () =>{
        let new_word = {word : word.current.value,
                        pron : pron.current.value,
                        mean : mean.current.value,
                        exam : exam.current.value,
                        interpretation: inter.current.value,};
        
        dispatch(createDicFB(new_word));
        window.alert("단어가 추가되었습니다.")
        navigate("/");
    }

    return (

        <Box>
            <h1>단어 추가하기</h1>
            <p>단어</p>
            <input type="text" ref = {word}></input>
            <p>발음</p>
            <input type="text" ref = {pron}></input>
            <p>의미</p>
            <input type="text" ref = {mean}></input>
            <p>예문</p>
            <input type="text" ref = {exam}></input>
            <p>해석</p>
            <input type="text" ref = {inter}></input>
            <div>
                <Button onClick={() => addDict()} variant="outlined" size="large"><AddIcon/></Button>
            </div>
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
    & p{
        margin 15px 20px;
        font-size : 15px;
    }
    & input{
        background-color: #00000000;
        border : 0;
        border-bottom: 2px solid #15aa;
        width : 390px;
        margin 0px 20px;
    }
    & div{
        margin : 20px;
        display: flex;
        justify-content: right;
    } 
`;

export default Writing;