import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { storage } from "../../shared/firebase";

import {db} from "../../shared/firebase"
import {   collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    deleteDoc,
    query, orderBy, limit,startAfter,} from "firebase/firestore";

import { connectStorageEmulator, getDownloadURL, ref, uploadString } from "firebase/storage";
import { actionCreators as imageActions } from "./image";


import moment from 'moment';

//action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const DEL_POST = "DEL_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const LIKE = "LIKE";
const ONE_POST = "ONE_POST";
const ADDCOMMENT = "ADDCOMMENT";


//action creatos

const setPost = createAction(SET_POST, (post_list,paging) => ({ post_list ,paging}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const delPost = createAction(DEL_POST, (post_id) => ({ post_id }));
const editPost = createAction(EDIT_POST, (post_id,post) => ({ post_id,post }));
const loading = createAction(LOADING, (is_loding) => ({ is_loding }));
const like = createAction(LIKE, (index ,id) => ({ index, id }));
const onePost = createAction(ONE_POST, (post) => ({ post }));
const addComment = createAction(ADDCOMMENT,(post_id) => ({post_id}));



//initialState
const initialState = {
    list : [],
    paging : { start : null, next : null, size : 3},
    is_loding : false,


};

const initialPost = {
    user_info:{
        user_name : "null",
        user_profile : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/"
    },
    image_url : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/",
    contents : "",
    comment_cnt : 0,
    insert_dt : "2021-02-27 10:00:00",
    like : [],
    direction : "R",

    
};

//middleware actions
const getPostFB=(start = null, size = 3) =>{
    return async function (dispatch,getState,{history}){
        let _paging = getState().post.paging;
        if(_paging.start && !_paging.next)
            return;

        dispatch(loading(true));

        const postCol = collection(db, "post_community");
        let q = start? query(postCol, orderBy("insert_dt","desc"),startAfter(start), limit(size + 1)): query(postCol, orderBy("insert_dt","desc"), limit(size + 1))
        let post_list  = [];
        const documentSnapshots = await getDocs(q);
        
        let paging = {
            start : documentSnapshots.docs[0],  
            next : documentSnapshots.docs.length === size + 1? documentSnapshots.docs[documentSnapshots.docs.length -2] : null, 
            size : size,
        };


        documentSnapshots.forEach((b) => {  
            let _post = b.data();
            let post = Object.keys(_post).reduce((acc,v) => {
                if(v.indexOf("user_") !== -1){
                    return {...acc, [v] : _post[v]};
                }
                return {...acc, [v] : _post[v]};
            },{id:b.id, user_info : {}})
            post_list.push({ ...post });
        });
        post_list.pop();
        console.log("로드...",post_list);
        dispatch(setPost(post_list,paging));
    }
}

const addPostFB = (contents = "", direction= "R") =>{
    return async function (dispatch,getState,{history}){
        const insert_dt = moment().format("YYYY-MM-DD hh:mm:ss");
        const _user = getState().user.user;

        const _image = getState().image.preview;
        const storageRef = await ref(storage,`image/${_user.id}_${new Date().getTime()}`)
        const userRef = await collection(db, "post_community")

        await uploadString(storageRef, _image, 'data_url')
        const url = await getDownloadURL(storageRef)


        const _post = {
            ...initialPost,
            image_url : url,
            contents : contents,
            insert_dt : insert_dt,
            like: [],
            direction : direction,
            user_info : {
                uid : _user.uid,
                user_id : _user.id,
                user_name : _user.user_name,
                user_profile : _user.user_profile,
            }
        };
        const docRef = await addDoc(userRef,_post);
        const temp =await getDoc(docRef);

        _post.id = temp.id;

        dispatch(imageActions.setPreview(null));
        dispatch(addPost(_post))
        history.push("/");
    }
}


const deletePostFB = (post_id) =>{
    return async function (dispatch, getState, {history}){
        const postRef = await doc(db, "post_community",post_id);
        const docRef = await deleteDoc(postRef);   
        dispatch(delPost(post_id));
    }
}

const editPostFB = (post_id,content,direction) =>{
    return async function (dispatch, getState, {history}){
        console.log(post_id,content,direction)
        const postRef = doc(db, "post_community",post_id);
        const docRef = await updateDoc(postRef,{
            contents : content,
            direction : direction,
            id:post_id
        });
        const getD = await getDoc(postRef);

        dispatch(editPost(post_id,getD.data()));
        history.push('/');
    }
}

const likeFB = (post_id,user_id) =>{
    return function (dispatch, getState, {history}){

        const _post = getState().post.list.reduce((x,v,i)=> post_id===v.id?i:x,0);
        const likePost = doc(db,"post_community",post_id);

        if(getState().post.list[_post].like.includes(user_id)){
            updateDoc(likePost,{like : arrayRemove(user_id)}).then(() =>{
                dispatch(like(_post,user_id));
            })
        }else{
            updateDoc(likePost,{like : arrayUnion(user_id)}).then(() =>{
                dispatch(like(_post,user_id));
            })
        }
    }
}

const getOnePostFB = (id) => {
    return async function(dispatch, getState, {history}){
        const _post = doc(db,"post_community",id);
        const temp =await getDoc(_post);
        let Post = temp.data();

        dispatch(onePost({...Post, id:temp.id}));   
    }
}

const addCommentFB = (post_id) =>{
    return async function(dispatch, getState, {history}){
        dispatch(addComment(post_id));
    }
}




//reducer
export default handleActions(
    {
        [SET_POST]: (state, action) =>
        produce(state, (draft) => {
            draft.list.push(...action.payload.post_list);
            draft.paging = action.payload.paging;
            draft.is_loding = false;
        }),
        [ADD_POST]: (state,action)=>
        produce(state,(draft)=>{
            draft.list.unshift(action.payload.post)
        }),
        [LOADING] : (state,action) =>
        produce(state,(draft)=>{
            draft.is_loding = action.payload.is_loding;
        }),
        [LIKE] : (state,action) =>
        produce(state,(draft)=>{
            if(draft.list[action.payload.index].like.includes(action.payload.id))
                draft.list[action.payload.index].like.pop(action.payload.id);
            else
                draft.list[action.payload.index].like.push(action.payload.id);
        }),
        [ONE_POST] : (state,action) =>
        produce(state,(draft)=>{
            draft.list.push(action.payload.post);
        }),
        [ADDCOMMENT] : (state,action) =>
        produce(state,(draft)=>{
            
            let index = state.list.reduce((x,v,i) => v.id===action.payload.post_id?i:x ,null);
            draft.list[index].comment_cnt += 1;
            
        }),
        [DEL_POST] : (state,action) =>
        produce(state,(draft)=>{
            draft.list = state.list.filter((v,i) => v.id===action.payload.post_id?false:true);
        }),
        [EDIT_POST] : (state,action) =>
        produce(state,(draft)=>{
            draft.list = state.list.map((v,i) => v.id===action.payload.post_id?action.payload.post:v);

        }),
    },
    initialState
);


//action creator export
const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    likeFB,
    getOnePostFB,
    addCommentFB,
    deletePostFB,
    editPostFB,


};

export { actionCreators };
