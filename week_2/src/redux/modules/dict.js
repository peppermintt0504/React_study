// dict.js

import {   collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,} from "firebase/firestore";

    import {db} from "../../firebase";


// Actions
const LOAD = 'dict/LOAD';
const CREATE = 'dict/CREATE';
const DELETE = 'dict/DELETE';
const UPDATE = 'dict/UPDATE';
const CHECK = 'dict/CHECK';


const initialState = {
    list : [

    ],
};

// Action Creators
export function loadDict(dict) {
return { type: LOAD , dict};
}
export function createDict(new_dict) {
    return { type: CREATE , new_dict};
    }
export function deleteDict(word_index) {
    return { type: DELETE , word_index};
}
export function updateDict(word_index,word_data) {
    return { type: UPDATE , word_index, word_data};
}
export function checkDict(word_index) {
    return { type: CHECK , word_index};
}


// middle ware
export const loadDicFB = () => {
    return async function (dispatch) {

        const bucket_data = await getDocs(collection(db, "dic"));
    
        let dic_list  = [];

        bucket_data.forEach((b) => {
        dic_list.push({ id: b.id, ...b.data() });
        });

        console.log("로드...",dic_list);
        dispatch(loadDict(dic_list));
    }
}

export const createDicFB = (new_word) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "dic"),new_word);
        const new_word_data = {id : docRef.id, ...new_word};
        console.log(new_word_data);
        dispatch(createDict(new_word_data));
    }
}

export const deleteDicFB = (word_id) => {
    return async function (dispatch,getState) {
        
        const docRef = doc(db,"dic",word_id);
        await getDoc(docRef);
        await deleteDoc(docRef);
        const word_index = getState().dict.list.reduce((x,val,index)=>{return val.id === word_id?index:x},0);
        dispatch(deleteDict(word_index));
        
    }
}
export const updateDicFB = (word_data) => {
    return async function (dispatch,getState) {
        
        const docRef = doc(db,"dic",word_data.id);
        await getDoc(docRef);
        await updateDoc(docRef,word_data);
        
        const word_index = getState().dict.list.reduce((x,val,index)=>{return val.id === word_data.id?index:x},0);
        dispatch(updateDict(word_index,word_data));
        
    }
}

export const checkDicFB = (word_id) => {
    return async function (dispatch,getState) {  
        const docRef = doc(db,"dic",word_id);
        const word_index = getState().dict.list.reduce((x,val,index)=>{
            return val.id === word_id?index:x},0);
        //const word_doc = await getDoc(docRef)
        await updateDoc(docRef,{check : !getState().dict.list[word_index].check});
        dispatch(checkDict(word_index));
        
    }
}







// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "dict/LOAD": {
            return {...state,list : action.dict};
        }
        case "dict/CREATE" : {
            return {...state, list : [...state.list,action.new_dict]};
        }
        case "dict/DELETE" : {
            
            const new_dict = state.list.filter((val,index) => {
                return index !==action.word_index?true:false;
            });
            return {...state,list : [...new_dict]};
        }
        case "dict/UPDATE" : {
            const new_dict = state.list.map((val,index) => {
                return index !==action.word_index?val:action.word_data;
            });
            return {...state,list : [...new_dict]};
        }
        case "dict/CHECK" : {
            const new_dict = state.list.map((val,index) => {
                return index !==action.word_index?val:{...val, check : !val.check};
            });
            return {...state,list : [...new_dict]};
        }
        default: {
            return state;
        }
    }
}