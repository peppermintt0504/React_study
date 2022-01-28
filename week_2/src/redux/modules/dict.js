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
    list : [{word : "안녕", },
            {word : "안녕", },
            {word : "나는", },
            {word : "안녕", },
            {word : "헬로", },
            {word : "흠", },
            {word : "배고파", },
            {word : "치킨", },
            {word : "주세여", },
            {word : "짠", },
],
};

// Action Creators
export function loadDict(dict) {
return { type: LOAD , dict};
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

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "dict/LOAD": {
            return {...state,list : action.dict};
        }

        default: {
            return state;
        }
    }
}