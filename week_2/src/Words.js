import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { Route, Routes } from "react-router-dom";

import {db} from "./firebase";
import {loadDicFB} from "./redux/modules/dict"

import "./App.css"

function Words(props) {

    
    
    const Dispatch = useDispatch();


    const data = useSelector((state) => state.dict.list);
    console.log(data);

    return (

        <Container>

        {data.map((v,i,da) => {

            return (
                    <Card key = {i}>
                        <h1>{da[i].word}</h1>
                        <h2>{da[i].pron}</h2>
                        <h3>{da[i].mean}</h3>
                        <p>{da[i].exam}</p>
                        <p>{da[i].interpretation}</p>
                    </Card>
        )})}
        </Container>
    )
}


const Container = styled.div`
    margin: auto;
    width : 75vw;
    display: flex;
    flex-direction : row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding : auto;
`;

const Card = styled.div`
    height : 150px;
    width : 20vw;
    margin : 20px 20px;
    padding : 15px;
    background-color : #a1afff3b;
    border : 1px solid #8b84d4b5;
    border-radius : 10px;
    text-align:left;

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


export default Words;