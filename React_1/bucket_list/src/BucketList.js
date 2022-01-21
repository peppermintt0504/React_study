// 리액트 패키지를 불러옵니다.
import React from 'react';
import styled from 'styled-components';

const BucketList = ({ list }) => {

    const my_lists = list;

    return (
        <div>
            {
                my_lists.map((list, index) => {
                    console.log(list);
                    return (<List_item key={index}>{list}</List_item>);
                })
            }
        </div>
    );
}
const List_item = styled.div`
    padding: 16px;
    margin: 8px;
    background-color: aliceblue;
}   
`;

export default BucketList;