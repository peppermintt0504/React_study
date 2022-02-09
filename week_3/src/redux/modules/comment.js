import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db, realtime } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { collection,query,where, getDocs, addDoc,doc, updateDoc,increment,  } from "firebase/firestore";
import { update, ref } from "firebase/database";
import { orderBy } from "lodash";

import { actionCreators as postActions } from "./post";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));


const initialState = {
    list: {},
    is_loading: false,
};

const addCommentFB =(post_id, contents) =>{
    return async function(dispatch, getState, {history}){
        const commentDB = collection(db,"comment");
        const post = doc(db,"post_community",post_id);
        const user_info = getState().user.user;
        const post_info = getState().post.list;
        const post_uid = post_info.reduce((x,v,i) => v.id === post_id?v:x,"").user_info.uid;

        let comment = {
            post_id : post_id,
            user_id : user_info.id,
            user_name : user_info.user_name,
            user_profile : user_info.user_profile,
            contents : contents,
            insert_dt : moment().format("YYYY-MM-DD hh:mm:ss"),

        }
        
        await addDoc(commentDB,comment);
        await updateDoc(post,{comment_cnt : increment(1) })


        dispatch(addComment(post_id,comment));
        dispatch(postActions.addCommentFB(post_id));

        if(user_info.uid === post_uid){
            return;
        }
        const notiRef = ref(realtime, 'noti/' + post_uid);
        await update(notiRef,{read: false});
        
    }
}

const getCommentFB = (post_id = null) => {
    return async function(dispatch, getState, {history}){
        if(!post_id)
            return;
        console.log("pass")
        const commentDB = collection(db,"comment");

        const q = query(commentDB, where("post_id", "==", post_id));
        //const _query = query(commentDB, orderBy("insert_dt","desc"), where("post_id", "==", post_id))
        const hey = await getDocs(q);
        const list = [];

        hey.forEach((comment) => {
            console.log(comment.data());
            list.push({...comment.data(), id: comment.id});
        })

        dispatch(setComment(post_id,list));
    }
}


export default handleActions(
    {
        [SET_COMMENT]: (state, action) => produce(state, (draft) => {
            draft.list[action.payload.post_id] = action.payload.comment_list;
        }),
        [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
            draft.list[action.payload.post_id].push(action.payload.comment);
        }),
        [LOADING]: (state, action) => 
        produce(state, (draft) => {
            draft.is_loading = action.payload.is_loading;
        })
    },
    initialState
);

const actionCreators = {
    getCommentFB,
    setComment,
    addComment,
    addCommentFB,
};

export { actionCreators };