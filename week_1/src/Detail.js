import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {updateScoreFB} from "./redux/modules/bucket";

import styled from "styled-components";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';

const Detail = (props) => {
    const params = useParams();
    const day_index = params.index;
    const day_list = useSelector((state) => state.bucket.list);
    const score = day_list[day_index].score;
    const temp_arr = [0,0,0,0,0];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const updateScore = (index) => {
        
        dispatch(updateScoreFB(day_list[params.index].id,index+1));
        navigate("/");
    }

    return (
        <Container>
            {temp_arr.map((v,i) => {return i>=score?<IconButton key={-i} onClick={() => {updateScore(i)}}><StarBorderIcon key={i}/></IconButton>:<IconButton key={-i} onClick={() => {updateScore(i)}}><StarIcon key={i}/></IconButton>})}
        </Container>
        
    );
};

const Container = styled.div`
align-items: center;
justify-content: center;
`;

export default Detail;