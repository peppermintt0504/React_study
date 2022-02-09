import React from "react";
import {Grid, Text, Button, Image, Input} from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postAction} from "../redux/modules/post"



const PostWrite = (props) => {
    
    const {history} = props;
    const dispatch = useDispatch();

    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);

    const [contents,setContents] = React.useState('');
    const [direction,setDirection] = React.useState('R');
    

    const changeContents = (e) =>{
        setContents(e.target.value);
    }

    const addPost = () =>{
        dispatch(postAction.addPostFB(contents,direction));
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
            <Grid width="40%" margin="0 30%" >
                <Grid  padding="16px">
                <Text margin="20px 0" size="36px" bold> 게시글 작성</Text>
                <Upload/>
                </Grid>
                <Grid padding="16px">
                <Text>게시물 방향</Text>
                <select onChange={(e) => 
                    setDirection(e.target.value==="오른쪽"?"R":"L")}>
                    <option value={"오른쪽"}>오른쪽</option>
                    <option value={"왼쪽"}>왼쪽</option>
                </select>
                </Grid>

                <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold>미리보기</Text>
                    <Image shape="rectangle" src={preview?preview:"http://via.placeholder.com/400x300"}/>
                </Grid>

                
                </Grid>

                <Grid padding="16px">
                <Input _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
                </Grid>

                <Grid padding="16px">
                <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" _onClick={addPost} text="게시글 작성"></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default PostWrite;