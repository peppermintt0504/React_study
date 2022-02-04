import React from "react";

import {Grid,Image,Text} from "../elements"

const Post = (props) =>{

    return(
        <React.Fragment>
            <Grid>
                <Grid is_flex>
                    <Image src = {props.src} shape = "circle"></Image>
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.insert_btn}</Text>
                </Grid>
                <Grid padding = "16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image src = {props.src} shape = "rectangle"></Image>
                </Grid>
                <Grid padding = "16px" >
                    <Text bold>댓글 {props.comment_cnt}개</Text>
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
    user_url : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/",
    contents : "안녕아녕",
    comment_cnt : 3420,
    insert_btn : "2021-02-27 10:00:00",
};

export default Post;