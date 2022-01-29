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
const UPDATE = 'dict/UPDATE';
const REMOVE = 'dict/REMOVE';

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


// middle ware
export const loadDicFB = () => {
    return async function (dispatch) {

        const bucket_data = await getDocs(collection(db, "dic"));
    
        let dic_list  = [];

      // 하나씩 우리가 쓸 수 있는 배열 데이터로 만든다
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

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "dict/LOAD": {
            return {...state,list : action.dict};
        }
        case "dict/CREATE" : {
            console.log(state, action.new_dict)
            return null;
        }

        default: {
            return state;
        }
    }
}