// bucket.js
import {db} from "../../firebase";
import { addDoc, collection, updateDoc, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";

// Actions
const LOAD = 'day/LOAD';
const UPDATE  = 'day/UPDATE';
const initalState = {
    is_loaded : false,
    list : []
};


// Action Creators
export function loadBucket(day_list){
    return {type: LOAD, day_list}
}
export function updateScore(day_list,score){
    return {type: UPDATE, day_list,score}
}


//middlewares
export const loadBucketFB = () => {
    return async function (dispatch) {
        const day_data = await getDocs(collection(db, "day"));
        let day_list  = [];

        day_data.forEach((b) => {
            day_list.push({ id: b.id, ...b.data() });
        });

        dispatch(loadBucket(day_list));
    }
}


export const updateScoreFB = (day_id,score) => {
    return async function (dispatch, getState){
        
        const docRef = doc(db,"day",day_id);
        await updateDoc(docRef,{score : score});
        
        const day_index = getState().bucket.list.findIndex((b) => {
            return b.id ===day_id;
        });
        dispatch(updateScore(day_index,score));
    }

}


// Reducer
export default function reducer(state = initalState, action = {}) {
    switch (action.type) {
        case "day/UPDATE": {
            const new_day_list = state.list.map((l, idx) => {
                if (parseInt(action.day_list) === idx) {
                    return { ...l, score : action.score};
                }
                else
                    return l;
            });
            return {...state, list: new_day_list};
        }
        case "day/LOAD": {
            return {list: action.day_list, is_loaded : true}
        }

        default: return state;
    }
}

