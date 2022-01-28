import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux";

import "./App.css";

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const BucketList = (props) => {
    const navigate = useNavigate();

    const data = useSelector((state => state));
    const my_lists = data.bucket.list;


    return (
        <ListStyle>
            {my_lists.map((list, index) => {
                return (
                    <ItemStyle key={index} onClick={() => {
                        navigate("/detail/" + index);
                    }}>
                        {list.day} : {list.score >= 1?<StarIcon/>:<StarBorderIcon/>}{list.score >= 2?<StarIcon/>:<StarBorderIcon/>}{list.score >= 3?<StarIcon/>:<StarBorderIcon/>}{list.score >= 4?<StarIcon/>:<StarBorderIcon/>}{list.score >= 5?<StarIcon/>:<StarBorderIcon/>}
                    </ItemStyle>
                );
            })}
        </ListStyle>
    );
};

const ListStyle = styled.div`
display: flex;
flex-direction: column;
max-height : 70vh;
height: 65vh;
overflow-x: hidden;
overflow-y: auto;

justify-content: center;
`;

const ItemStyle = styled.div`
padding: 16px;
margin: 8px;
font-size : 25px;
color: #15aa;
background-color: ${(props) => (props.completed ? "#15aa":"#eee")};
text-align : center

`;

export default BucketList;