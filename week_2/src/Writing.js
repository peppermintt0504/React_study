import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { Route, Routes, useNavigate,useParams } from "react-router-dom";

import {db} from "./firebase";
import {loadDicFB,createDicFB} from "./redux/modules/dict"

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import "./App.css"
import { SnowshoeingOutlined } from "@mui/icons-material";
import { type } from "@testing-library/user-event/dist/type";

function Writing(props){
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const word_id = params.id;

    React.useEffect(async() => {
        dispatch(loadDicFB());
    
    },[]);

    const data = useSelector((state) => state.dict.list);
    console.log(data);
    console.log(word_id);

    
    const word = React.useRef(null);
    const pron = React.useRef(null);
    const mean = React.useRef(null);
    const exam = React.useRef(null);
    const inter = React.useRef(null);

    console.log(word);

    if(props.post_type === 'rectify'){
        const word_date = data.filter((v,i) =>{
            console.log(v.id === word_id);
            return v.id === word_id?true:false});

        word.current.value = word_date[0].word;
        pron.current.value = word_date[0].pron;
        mean.current.value = word_date[0].mean;
        exam.current.value = word_date[0].exam;
        inter.current.value = word_date[0].interpretation;
    }



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

    const rectifyDict = () =>{
        let new_word = {word : word.current.value,
                        pron : pron.current.value,
                        mean : mean.current.value,
                        exam : exam.current.value,
                        interpretation: inter.current.value,};
        
        
        window.alert("단어가 수정되었습니다.")
        navigate("/");
    }



    return (

        <Box>
            {props.post_type === 'create'?<h1>단어 추가하기</h1>:<h1>단어 수정하기</h1>}
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
                {props.post_type === 'create'?<h1><Button onClick={() => addDict()} variant="outlined" size="large"><AddIcon/></Button></h1>:<h1><Button onClick={() => rectifyDict()} variant="outlined" size="large"><AddIcon/></Button></h1>}
                
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