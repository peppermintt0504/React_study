import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {deleteBucketFB,updateBucketFB} from "./redux/modules/bucket";

import Button from '@mui/material/Button';


const Detail = (props) => {
    const params = useParams();
    const bucket_list = useSelector((state) => state.bucket.list);

    console.log(bucket_list);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const deleteBucketList = () => {
        dispatch(deleteBucketFB(bucket_list[params.index].id));
        navigate("/");
    }
    const updateBucketList = () => {
        dispatch(updateBucketFB(bucket_list[params.index].id));
        navigate("/");
    }

    return (
        <div>

            <h1>{bucket_list[params.index]? bucket_list[params.index].text : ""}</h1>
            <Button variant="outlined" onClick={updateBucketList}>완료하기</Button>
            <Button variant="outlined" onClick={deleteBucketList}>삭제하기</Button>
        </div>
        
    );
};


export default Detail;