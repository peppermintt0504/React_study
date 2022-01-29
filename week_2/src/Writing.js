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
    const count = 0

    const data = useSelector((state) => state.dict.list);

    const word = React.useRef(null);
    const pron = React.useRef(null);
    const mean = React.useRef(null);
    const exam = React.useRef(null);
    const inter = React.useRef(null);




    React.useEffect(async() => {
        dispatch(loadDicFB());

        return (0)
    },[]);

    if(props.post_type !== 'create'){
        var word_data = data.filter((v,i) => {
            return v.id === word_id ? true:false;
        })[0];
        console.log(word_data)

        // word.current.value?console.log("ooo"):console.log("xx")
        // word.current.value = word_data.word;
        // pron.current.value = word_data.pron;
        // mean.current.value = word_data.mean;
        // exam.current.value = word_data.exam;
        // inter.current.value = word_data.interpretation;
        
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
            {word_data?<input type="text" ref = {word} defaultValue={word_data.word}></input>:<input type="text" ref = {word}></input>}
            <p>발음</p>
            {word_data?<input type="text" ref = {pron} defaultValue={word_data.pron}></input>:<input type="text" ref = {pron}></input>}
            <p>의미</p>
            {word_data?<input type="text" ref = {mean} defaultValue={word_data.mean}></input>:<input type="text" ref = {mean}></input>}
            <p>예문</p>
            {word_data?<input type="text" ref = {exam} defaultValue={word_data.exam}></input>:<input type="text" ref = {exam}></input>}
            <p>해석</p>
            {word_data?<input type="text" ref = {inter} defaultValue={word_data.interpretation}></input>:<input type="text" ref = {inter}></input>}
            <div>
                {props.post_type === 'create'?
                <h1><Button onClick={() => addDict()} variant="outlined" size="large"><AddIcon/></Button></h1>:
                <h1><Button onClick={() => rectifyDict()} variant="outlined" size="large"><AddIcon/></Button></h1>}
                
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