//PostList.js
import React from "react";
import { useSelector,useDispatch } from "react-redux";


import Post from "../components/Post";
import InfinityScroll from "../shared/infinityScroll";

import post, {actionCreators as postActions} from "../redux/modules/post";

const PostList = (props) =>{
    
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const paging = useSelector((state) => state.post.paging);
    const is_loding = useSelector((state) => state.post.is_loding);

    
    React.useEffect(() =>{
        if(post_list.length === 0 )dispatch(postActions.getPostFB());
    }
    ,[])


    return(
        <React.Fragment>
            <InfinityScroll
                callNext ={() =>{dispatch(postActions.getPostFB(paging.next))}}
                is_next = {paging.next}
                loading = {is_loding}>

            
            {/* <Post/> */}
            {post_list.map((v,i) =>{
                return <Post key={v.id} {...v}/>
            })}
            </InfinityScroll>
        </React.Fragment>
    )
}

//Post conponent 기본 Props 지정


export default PostList;