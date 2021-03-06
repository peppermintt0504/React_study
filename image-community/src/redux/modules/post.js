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
    deleteDoc,
    query, orderBy, limit,startAfter,} from "firebase/firestore";

import { connectStorageEmulator, getDownloadURL, ref, uploadString } from "firebase/storage";
import { actionCreators as imageActions } from "./image";


import moment from 'moment';

//action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";


//action creatos

const setPost = createAction(SET_POST, (post_list,paging) => ({ post_list ,paging}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const loading = createAction(LOADING, (is_loding) => ({ is_loding }));


//initialState
const initialState = {
    list : [],
    paging : { start : null, next : null, size : 3},
    is_loding : false,


};

const initialPost = {
    user_info:{
        user_name : "dong",
        user_profile : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/"
    },
    image_url : "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/",
    contents : "안녕아녕",
    comment_cnt : 3420,
    insert_dt : "2021-02-27 10:00:00",
};

//middleware actions
const getPostFB=(start = null, size = 2) =>{
    return async function (dispatch,getState,{history}){
        let _paging = getState().post.paging;
        if(_paging.start && !_paging.next)
            return;
        dispatch(loading(true));
        const postCol = collection(db, "post_community");
        let q = start? query(postCol, orderBy("insert_dt","desc"),startAfter(start), limit(size + 1)): query(postCol, orderBy("insert_dt","desc"), limit(size + 1))
        console.log("start :", start);
        let post_list  = [];
        const documentSnapshots = await getDocs(q);
        
        let paging = {
            start : documentSnapshots.docs[0],  
            next : documentSnapshots.docs.length === size + 1? documentSnapshots.docs[documentSnapshots.docs.length -2] : null, 
            size : size,
        };
        console.log("next : ", paging.next);

        documentSnapshots.forEach((b) => {  
            let _post = b.data();
            let post = Object.keys(_post).reduce((acc,v) => {
                if(v.indexOf("user_") !== -1){
                    return {...acc, user_info : {...acc.user_info, [v] : _post[v] }};
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

const addPostFB = (contents = "") =>{
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
            user_info : {
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

const fileUploadFB = () =>{
    return function (dispatch, getState, {history}){
        
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
    },
    initialState
);


//action creator export
const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,

};

export { actionCreators };
