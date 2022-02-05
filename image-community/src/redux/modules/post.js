import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import {db} from "../../shared/firebase"
import {   collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,} from "firebase/firestore";

//action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";


//action creatos

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));


//initialState
const initialState = {
    list : [],

};
const initialPost = {
    user_info:{
        user_name : "dong",
        user_profile : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/"
    },
    user_url : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/",
    contents : "안녕아녕",
    comment_cnt : 3420,
    insert_btn : "2021-02-27 10:00:00",
};

//middleware actions
const getPostFB=() =>{
    return function (dispatch,getState,{history}){
        let post_list  = [];
        const postDB = getDocs(collection(db, "post_community")).then((docs)=>{
            docs.forEach((b) => {  
                let _post = b.data();

                let post = Object.keys(_post).reduce((acc,v) => {
                    if(v.indexOf("user_") !== -1){
                        return {...acc, 
                                user_info : {...acc.user_info, [v] : _post[v] }};
                    }
                    return {...acc, [v] : _post[v]};
                },{id:b.id, user_info : {}})

                post_list.push({ ...post });
            });
            console.log("로드...",post_list);
            dispatch(setPost(post_list));

        })
        
        
    }
}






//reducer
export default handleActions(
    {
        [SET_POST]: (state, action) =>
        produce(state, (draft) => {
            console.log(action.payload.post_list);
            draft.list = action.payload.post_list;
        }),
        [ADD_POST]: (state,action)=>
        produce(state,(draft)=>{

        })
    },
    initialState
);


//action creator export
const actionCreators = {
    setPost,
    addPost,
    getPostFB,

};

export { actionCreators };
