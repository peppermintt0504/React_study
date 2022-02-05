import React from "react";
import {Grid, Text, Button, Image, Input} from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postAction} from "../redux/modules/post"

const PostWrite = (props) => {
    
    const is_login = useSelector((state) => state.user.is_login);
    const {history} = props;
    const dispatch = useDispatch();

    const [contents,setContents] = React.useState('');
    const changeContents = (e) =>{
        setContents(e.target.value);
    }

    const addPost = () =>{
        console.log(contents)
        dispatch(postAction.addPostFB(contents));
        window.alert("게시물이 작성되었습니다.");
    }


    if(!is_login){
        return(
            <Grid center margin="100px 0px" padding = "15px">
                <Text size = "32px">앗 잠깐</Text>
                <Text>로그인 후에만 글을 작성할 수 있습니다.</Text>
                <Button _onClick={() => {history.replace("/login");}} text = "로그인"></Button>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
            <Text margin="0px" size="36px" bold>
                게시글 작성
            </Text>
            <Upload/>
            </Grid>

            <Grid>
            <Grid padding="16px">
                <Text margin="0px" size="24px" bold>
                미리보기
                </Text>
            </Grid>

            <Image shape="rectangle" />
            </Grid>

            <Grid padding="16px">
            <Input _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
            </Grid>

            <Grid padding="16px">
            <Button _onClick={addPost} text="게시글 작성"></Button>
            </Grid>
        </React.Fragment>
    );
}

export default PostWrite;