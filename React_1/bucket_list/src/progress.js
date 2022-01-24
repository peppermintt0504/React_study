import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux"

const Progress = (props) =>{

    const bucket_list = useSelector((state) => state.bucket.list);
    let count = 0;

    bucket_list.map((v,i) => {
        if(v.completed){
            count += 1;
        }
    })

    return (
        
        <ProgressBar>
            <HighLight width = {(count/ bucket_list.length) * 100 + "%"} />
            <Dot/>
        </ProgressBar>
    );
}

const ProgressBar = styled.div`
    background: #eee;
    width: 100%;
    height: 20px;
    display : flex;
    align-items : center;
    border-radius : 5px;
`;

const HighLight = styled.div`
    background: #15aa;
    transition: 1s;
    width: ${(props => props.width)};
    height: 20px;
    border-radius : 5px;
`;

const Dot = styled.div`
    width : 40px;
    height : 40px;
    background : #fff;
    border : 5px solid #15aa;
    border-radius : 40px;
    margin : 0px 0px 0px -30px;
`;

export default Progress;