// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux";

const BucketList = (props) => {
    const navigate = useNavigate();

    const data = useSelector((state => state));
    const my_lists = data.bucket.list;

    return (
        <ListStyle>
            {my_lists.map((list, index) => {
                return (
                    <ItemStyle completed={list.completed} className="list_item" key={index} onClick={() => {
                        navigate("/detail/" + index);
                    }}>
                        {list.text}
                    </ItemStyle>
                );
            })}
        </ListStyle>
    );
};

const ListStyle = styled.div`
display: flex;
flex-direction: column;
max-height : 50vh;
height: 50vh;
overflow-x: hidden;
overflow-y: auto;
`;

const ItemStyle = styled.div`
padding: 16px;
margin: 8px;
color: ${(props) => (props.completed ? "#fff":"#000")};
background-color: ${(props) => (props.completed ? "#15aa":"#eee")};
`;

export default BucketList;