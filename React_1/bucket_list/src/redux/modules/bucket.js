// bucket.js
import {db} from "../../firebase";
import { addDoc, collection, updateDoc, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";

// Actions
const LOAD = 'bucket/LOAD';
const CREATE = 'bucket/CREATE';
const DELETE = 'bucket/DELETE';
const UPDATE  = 'bucket/UPDATE';

const initalState = {
    is_loaded : false,
    list : []
};


// Action Creators
export function loadBucket(bucket_list){
    return {type: LOAD, bucket_list}
}
export function createBucket(bucket){
    return {type: CREATE, bucket}
}
export function deleteBucket(bucket_index){
    return {type: DELETE, bucket_index}
}
export function updateBucket(bucket_index){
    return {type: UPDATE, bucket_index}
}


//middlewares
export const loadBucketFB = () => {
    return async function (dispatch) {
        const bucket_data = await getDocs(collection(db, "bucket"));
    
        let bucket_list  = [];

        bucket_data.forEach((b) => {
            bucket_list.push({ id: b.id, ...b.data() });
        });

        console.log(bucket_list);
        dispatch(loadBucket(bucket_list));
    }
}

export const addBucketFB = (bucket) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "bucket"),{text : bucket, completed : false});
        
        const bucket_data = {id : docRef.id, text : bucket, completed : false}

        dispatch(createBucket(bucket_data));
    }
}

export const updateBucketFB = (bucket_id) => {
    return async function (dispatch, getState){
        const docRef = doc(db,"bucket",bucket_id);
        await updateDoc(docRef,{completed : true});
        //console.log((await getDoc(docRef)).data());
        console.log(getState().bucket);
        const bucket_index = getState().bucket.list.findIndex((b) => {
            return b.id ===bucket_id;
        });
        dispatch(updateBucket(bucket_index));
    }

}


export const deleteBucketFB = (bucket_id) => {
    return async function (dispatch, getState){

        const docRef = doc(db,"bucket",bucket_id);
        console.log((await getDoc(docRef)).data());
        
        console.log(getState().bucket);
        const bucket_index = getState().bucket.list.findIndex((b) => {
            return b.id ===bucket_id;
        });
        await deleteDoc(docRef);
        dispatch(deleteBucket(bucket_index));
    }

}



// Reducer
export default function reducer(state = initalState, action = {}) {
    switch (action.type) {
        case "bucket/CREATE" : {
            const new_bucket_list = [...state.list, action.bucket];
            return {...state, list : new_bucket_list};
        }
        case "bucket/DELETE" : {
            const new_bucket_list = state.list.filter((v,i) => {
                return i !== parseInt(action.bucket_index);
            });
            return {...state, list : new_bucket_list};
        }
        case "bucket/UPDATE": {
            const new_bucket_list = state.list.map((l, idx) => {
                if (parseInt(action.bucket_index) === idx) {
                    return { ...l, completed: true };
                }
                else
                    return l;
                
            });
            console.log({ list: new_bucket_list });
            return {...state, list: new_bucket_list};
        }
        case "bucket/LOAD": {
            return {list: action.bucket_list, is_loaded : true}
        }

        default: return state;
    }
}

