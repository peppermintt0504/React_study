import React from "react";
import { useSelector ,useDispatch} from "react-redux";


import {Button, Grid,Image,Text} from "../elements"
import { HiOutlineHeart,HiHeart } from "react-icons/hi";

import {actionCreators as postActions} from "../redux/modules/post"

import {history} from "../redux/configureStore"

const Post = (props) =>{
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    let user_id = null;
    let user_uid = null;

    let is_mine = false;


    if(user.is_login){
        user_id = user.user.id;
        user_uid =user.user.uid;
    }
        

    if(user_uid === props.user_info.uid){
        is_mine = true;
    }
    

    const like = (post_id,user_id)=>{
        if(!user_id){
            window.alert("로그인이 필요합니다.");
            return;
        }
        dispatch(postActions.likeFB(post_id,user_id));
    }
    const deletePost = (post_id)=>{
        if(!post_id)
            return;
        console.log(post_id)
        dispatch(postActions.deletePostFB(post_id))
    }
    const editPost = (post_id)=>{
        if(!post_id)
            return;
        history.push(`/postedit/${props.id}`)
    }
    return(
        <React.Fragment>
            <Grid padding="0 15px" B_left="1px solid #80808055" B_right="1px solid #80808055" width="70%" height="40%">
                <Grid is_flex>
                    <Grid is_flex width="100px">
                    <Image src = {props.src} shape = "circle"></Image>
                    <Text bold>{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex width = "250px">
                        <Text>{props.insert_dt}</Text>
                        {is_mine?<Button _onClick={() =>{deletePost(props.id)}} text="삭제" radius="10px" border_color="#fff0" BG_c="#4571eeab" width="50px"/>:""}
                        {is_mine?<Button _onClick={() =>{editPost(props.id)}} text="수정" radius="10px" border_color="#fff0" BG_c="#4571eeab" width="50px"/>:""}
                        
                        
                    </Grid>
                    
                </Grid>
                    <Grid is_flex flex_direction="column">
                        {props.direction === "C"?<Text>{props.contents}</Text> : ""}
                        <Grid is_flex = {props.direction === "C"?false : true} width="90%" padding = "16px">
                            {props.direction === "L"?<Text>{props.contents}</Text> : ""}
                            <Image _onClick={() =>{history.push(`/detail/${props.id}`)}} src = {props.image_url} shape = "rectangle"></Image>
                            {props.direction === "R"?<Text>{props.contents}</Text> : ""}
                            
                        </Grid>
                    </Grid>
                <Grid is_flex padding = "16px" >
                    <Grid is_flex justify_content="flex-start">
                    <Text margin="0 20px 0 0" bold>댓글 {props.comment_cnt}개</Text>
                    <Text  bold>좋아요 {props.like?props.like.length:""}개</Text>
                    </Grid>
                    <Text _onClick={() =>{like(props.id,user_id)}} color="black" size="30px">{props.like?props.like.indexOf(user_id)!==-1?<HiHeart/>:<HiOutlineHeart/>:""}</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    )


    
}

Post.defaultProps = {
    user_info:{
        user_name : "dong",
        user_profile : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/"
    },
    image_url : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/",
    contents : "안녕아녕",
    comment_cnt : 3420,
    insert_btn : "2021-02-27 10:00:00",
};

export default Post;