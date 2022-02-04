import React from "react";
import styled from "styled-components";

//components
import {Grid,Button,} from "../elements";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const Detail = (props) =>{

    return(
        <React.Fragment>
            <Post/>
            <CommentWrite/>
            <CommentList/>
        </React.Fragment>
    )
}

export default Detail;