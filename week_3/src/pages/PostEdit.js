import React from "react";
import {Grid, Text, Button, Image, Input} from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postAction} from "../redux/modules/post"
import {useParams} from "react-router-dom"



const PostEdit = (props) => {
    
    const {history} = props;
    const dispatch = useDispatch();
    
    const post_id = useParams().id;
    const _post = useSelector((state) => state.post.list);
    const this_post = _post.reduce((x,v) => v.id === post_id?v:x,"")
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);

    const _content = React.useRef(null);
    //_content.current.value("gdkosokg");

    React.useEffect(() =>{
        if(_post.length === 0)
            dispatch(postAction.getOnePostFB(post_id));
    },[])

    

    const [contents,setContents] = React.useState('');
    const [direction,setDirection] = React.useState('R');
    
    const test = (e) =>{
        e.target.value = "wjdjsafn";
    }

    const changeContents = (e) =>{
        setContents(e.target.value);
        console.log(direction)
    }

    const editPost = () =>{
        dispatch(postAction.editPostFB(this_post.id,contents,direction));
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
                <Text margin="20px 0" size="36px" bold> 게시글 수정</Text>
                
                </Grid>
                <Grid padding="16px">
                <Text>게시물 방향</Text>
                <select onChange={(e) => 
                    setDirection(e.target.value)}>
                    <option value={"R"}>오른쪽</option>
                    <option value={"L"}>왼쪽</option>
                    <option value={"C"}>중앙</option>

                </select>
                </Grid>

                <Grid>
                <Grid padding="16px">
                    <Image height="100%" shape="rectangle" src={preview?preview:this_post.image_url}/>
                </Grid>

                
                </Grid>

                <Grid padding="16px">
                <Input _defaultValue={this_post.contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine></Input>
                </Grid>

                <Grid padding="16px">
                <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" _onClick={editPost} text="게시글 수정"></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default PostEdit;