//CommentWrite.js
import React from "react";
import styled from "styled-components";

//components
import {Grid,Button,Input} from "../elements";


const CommentWrite = (props) =>{

    return(
        <React.Fragment>
            <Grid is_flex="true" padding="20px">
                <Input height="50px" width="100%" placeholder="댓글 내용을 입력해주세요."></Input>
                <Button height="30px" text="작성" background_color="gray"></Button>
            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;