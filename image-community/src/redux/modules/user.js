import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";

//action
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creatos

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));


//initialState
const initialState = {
    user: null,
    is_login: false,
};

const user_inintial = {
    user_name : "yoo",
}

//middleware actions
const signupFB = (id,pwd,name)=>{
    return function(dispatch, getState,{history}){

        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            console.log(userCredential)

            updateProfile(auth.currentUser, {
                displayName: name,
            }).then(() => {
                dispatch(setUser({
                    user_name : name,
                    id : id,
                    user_profile : "",
                    uid : userCredential.user.uid,}));
                history.push("/");
                // Profile updated!
                // ...
            }).catch((error) => {
                console.log(error);
                // An error occurred
                // ...
            });
            
        })
        .catch((error) => {
            console.log(error)
            // const errorCode = error.code;
            // const errorMessage = error.message;
            
        });
    }
}

const loginFB = (id,pwd) =>{
    return function(dispatch,getState,{history}){
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            
            signInWithEmailAndPassword(auth, id, pwd)
            .then((userCredential) => {
                // Signed in
                console.log(userCredential)
                dispatch(setUser({
                                user_name : userCredential.user.displayName,
                                id : id,
                                user_profile : "",
                                uid : userCredential.user.uid,}));
                history.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        }); 
    }
}

const loginCheckFB = () =>{
    return function(dispatch,getState,{history}){
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    user_name : user.displayName,
                    id : user.id,
                    user_profile : "",
                    uid : user.uid,}));
            
            } else {
                dispatch(logOut());
            }
        });
    }
}

const logoutFB = () =>{
    return function(dispatch,getState,{history}){
        auth.signOut().then(()=>{
            dispatch(logOut());
            history.replace('/');
        })
    }
}


//reducer
export default handleActions(
    {
        [SET_USER]: (state, action) =>
        produce(state, (draft) => {
            setCookie("is_login", "success");
            draft.user = action.payload.user;
            draft.is_login = true;
        }),

        [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            deleteCookie("is_login");
            draft.user = null;
            draft.is_login = false;
        }),

        [GET_USER]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
);

//action creator export
const actionCreators = {
    setUser,
    getUser,
    logOut,
    loginFB,
    signupFB,
    loginCheckFB,
    logoutFB,
};

export { actionCreators };