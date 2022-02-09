//CommentWrite.js
import React from "react";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
//components
import {Grid,Button,Input,Image} from "../elements";

import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) =>{   
    const [contents, setContents] = React.useState("");
    const post_id = useParams().id;
    const dispatch = useDispatch();


    const write = () => {
        if(contents === ""){
            window.alert("댓글을 입력해주세요!");
            return;
        }
        console.log(post_id);
        dispatch(commentActions.addCommentFB(post_id,contents));
        setContents("");
        
    }

    return(
        <React.Fragment>
            <Grid is_flex="true" padding="20px">
                <Image src = {props.src} shape = "circle"></Image>
                <Grid><Input value={contents} _onChange={(e) => {setContents(e.target.value);}} B_radius="3px" height="50px" width="95%" placeholder="댓글 내용을 입력해주세요."></Input></Grid>
                <Button _onClick={write} radius="10px" border_color="#fff0" BG_c="#4571eeab" width="60px" height="50px" text="작성" background_color="gray"></Button>
            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;