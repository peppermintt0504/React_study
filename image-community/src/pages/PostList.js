//PostList.js
import React from "react";
import { useSelector,useDispatch } from "react-redux";


import Post from "../components/Post";
import {actionCreators as postActions} from "../redux/modules/post";

const PostList = (props) =>{
    
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    console.log(post_list);
    
    React.useEffect(() =>{
        if(post_list.length === 0 )dispatch(postActions.getPostFB());
    }
    ,[])


    return(

        <React.Fragment>
            {/* <Post/> */}
            {post_list.map((v,i) =>{
                console.log(v.id);
                return <Post key={v.id} {...v}/>
            })}
        </React.Fragment>
    )
}

//Post conponent 기본 Props 지정


export default PostList;