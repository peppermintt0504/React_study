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

// middle ware
export const loadDicFB = () => {
    return async function (dispatch) {

        const bucket_data = await getDocs(collection(db, "dic"));
    
        let dic_list  = [];

        bucket_data.forEach((b) => {
        dic_list.push({ id: b.id, ...b.data() });
        });

        console.log(dic_list);
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
        
        const word_index = getState().dict.list.reduce((x,val,index)=>{return val.id === word_id?index:x});
        dispatch(deleteDict(word_index));
        
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
            console.log(action.word_index);
            const new_dict = state.list.filter((val,index) => {
                return index !==action.word_index?true:false;
            });
            console.log(new_dict)
            return {...state,list : [...new_dict]};
        }
        default: {
            return state;
        }
    }
}