import React from "react";
import { useSelector ,useDispatch} from "react-redux";


import {Grid,Image,Text} from "../elements"
import { HiOutlineHeart,HiHeart } from "react-icons/hi";

import {actionCreators as postActions} from "../redux/modules/post"


const Post = (props) =>{
    const user = useSelector((state) => state.user);
    let user_id = false;
    console.log(user);

    if(user.is_login){
        user_id = user.user.id;
    }
    
    
    const dispatch = useDispatch();

    
    const like = (post_id,user_id)=>{
        if(!user_id)
            return;
        console.log("pid :",post_id);
        console.log("uid :",user_id);
        dispatch(postActions.likeFB(post_id,user_id))

    }

    return(
        <React.Fragment>
            <Grid padding="0 15px" B_left="1px solid #80808055" B_right="1px solid #80808055" width="70%" height="40%">
                <Grid is_flex>
                    <Grid is_flex width="100px">
                    <Image src = {props.src} shape = "circle"></Image>
                    <Text bold>{props.user_info.user_name}</Text>
                    </Grid>
                    <Text>{props.insert_dt}</Text>
                </Grid>
                <Grid is_flex padding = "16px">
                    <Text>{props.contents}</Text>
                
                    <Image  src = {props.image_url} shape = "rectangle"></Image>
                </Grid>
                <Grid is_flex padding = "16px" >
                    <Grid is_flex justify_content="flex-start">
                    <Text margin="0 20px 0 0" bold>댓글 {props.comment_cnt}개</Text>
                    <Text  bold>좋아요 {props.like.length}개</Text>
                    </Grid>
                    <Text _onClick={() =>{like(props.id,user_id)}} color="black" size="30px">{props.like.indexOf(user_id)!==-1?<HiHeart/>:<HiOutlineHeart/>}</Text>
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