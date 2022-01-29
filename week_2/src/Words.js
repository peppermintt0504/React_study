import React from "react"
import styled, { keyframes } from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { Route, Routes, useNavigate} from "react-router-dom";

import {db} from "./firebase";
import {deleteDicFB} from "./redux/modules/dict"

//아이콘 import
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

import { FaPlus } from "react-icons/fa";

import "./App.css"

function Words(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const data = useSelector((state) => state.dict.list);
    console.log(useSelector((state) => state));
    console.log(data);

    const delete_word = (word_id) =>{
        dispatch(deleteDicFB(word_id));
        window.alert("삭제되었습니다.")
    };

    return (

        <Container>

        {data.map((val,index,da) => {

            return (
                    <Card key = {index}>
                        <Check><CheckCircleOutlineIcon/></Check>
                        <Rectify onClick={()=> navigate("/writing/"+ val.id)}><BorderColorOutlinedIcon/></Rectify>
                        <Delete onClick={()=>( delete_word(val.id))}><DeleteOutlineIcon/></Delete>
                        <h1>{val.word}</h1>
                        <h2>{val.pron}</h2>
                        <h3>{val.mean}</h3>
                        <p>{val.exam}</p>
                        <p>{val.interpretation}</p>
                    </Card>
        )})}
            <Button><button onClick={() => navigate("/writing")}><p><FaPlus color ="#15aa" size="25"/></p></button></Button>
        </Container>
    )
}


const Container = styled.div`
    margin: auto;
    width : 75%;
    display: flex;
    flex-direction : row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding : auto;
    gap: 10px;
`;

const Card = styled.div`
    height : 150px;
    width : calc(( 100% - 146px )/3);
    margin : 0;
    padding : 20px;
    background-color : #a1afff3b;
    border : 1px solid #8b84d4b5;
    border-radius : 10px;
    text-align:left;
    position : relative;
    

    & h1{
        font-size : 20px;
        margin : 0px auto;
    }
    & h2{
        font-size : 12px;
        margin-top : 0px;
    }
    & h3{
        font-size : 14px;
    }
    & p{
        margin : 1px;
        font-size : 14px;
        color : #1135aaaa;
    }
`;

const btnAnimation = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(90deg);
    }

`;

const Button = styled.div`
    position : fixed;
    right : 5vw;
    top : 90vh;
    margin : auto;
    align-items: center;
    
    & button {
        position:relative;
        height : 60px;
        width : 60px;
        border : 1px solid white;
        border-radius : 60px;
        padding : 0;
        & p{
        left: 50%;
        top: 50%;
        transform: translate( 2%, 6%);
    }
    }
    
    :hover {
        animation: ${btnAnimation} 1s linear
    };
    
    
`;

const Check = styled.div`
    position : absolute;
    right : 80px;
    cursor : pointer;
`;
const Delete = styled.div`
    position : absolute;
    right : 50px;
    cursor : pointer;

`;
const Rectify = styled.div`
    position : absolute;
    right : 20px;
    cursor : pointer;

`;




export default Words;