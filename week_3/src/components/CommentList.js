//CommentList.js
import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

//components
import {Grid,Button,Input,Image,Text} from "../elements";

const CommentList = (props) => {

    const dispatch = useDispatch();
    const comment_list = useSelector((state) => state.comment.list);
    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;

    React.useEffect(() =>{
        if(!comment_list[post_id]){
            console.log("dispatch");
            dispatch(commentActions.getCommentFB(post_id));
        }
    },[])

    if(!comment_list[post_id] || !post_id){
        return null;
    }
    return (
        <React.Fragment>
            <Grid padding="16px">
            {comment_list[post_id].map( (c,i) => {

                    return <CommentItem key={i} {...c}/>
                })}
            </Grid>
        </React.Fragment>
    );
};

export default CommentList;


const CommentItem = (props) => {

    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;

    return (
        <Grid is_flex>
            <Grid is_flex width="auto">
                <Image shape="circle"/>
                <Text bold>{user_name}</Text>
            </Grid>
            <Grid is_flex margin="0px 4px">
                <Text margin="0px">{contents}</Text>
                <Text margin="0px">{insert_dt}</Text>
            </Grid>
        </Grid>
    )
}

CommentItem.defaultProps = {
    post_id: null,
}