import React from "react";
import styled from "styled-components";
import { useDispatch,useSelector } from "react-redux";
import {useParams} from "react-router-dom"

//Actions
import {actionCreators as postActions} from "../redux/modules/post";

//components
import {Grid,Button,} from "../elements";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const Detail = (props) =>{
    const params = useParams();
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const paging = useSelector((state) => state.post.paging);
    const this_post = post_list.reduce((x,v,i) => v.id===params.id?v:x ,0);

    React.useEffect(() =>{
        if(post_list.length===0)
            dispatch(postActions.getOnePostFB(params.id));
    }
    ,[]);

    return(
        <React.Fragment>
            <Grid margin="0" is_flex flex_direction="column">
                <Post {...this_post}/>
                <Grid B_left="1px solid #80808055" B_right="1px solid #80808055" width ="70%">
                <CommentWrite {...this_post} />
                <CommentList post_id={this_post.id}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Detail;