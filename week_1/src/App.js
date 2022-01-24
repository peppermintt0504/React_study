import React from "react";
// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from "./BucketList";
import Detail from "./Detail";
import NotFound from "./NotFound";
import Progress from "./progress";
import Spinner from "./Spinner";


import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loadBucketFB, addBucketFB} from "./redux/modules/bucket";
import {db} from "./firebase";
import { addDoc, collection, updateDoc, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";

function App() {

  const text = React.useRef(null);
  const dispatch = useDispatch();
  const is_loaded = useSelector(state => state.bucket.is_loaded);

  React.useEffect(async() => {
    dispatch(loadBucketFB());

    const query = await getDocs(collection(db,"bucket"));

  },[]);

  const addBucketList = () => {
    dispatch(addBucketFB(text.current.value));
  }

  return (
    <div className="App">
      <Container>
        <Title>내 버킷리스트</Title>
        <Progress/>
        <Line />
        <Routes>
          
          <Route path="/" element={<BucketList />}></Route>
          <Route path="/detail/:index" element={<Detail />}></Route>

          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </Container>
      {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
      <Input>
        <input type="text" ref={text} />
        <button onClick={addBucketList}>추가하기</button>
      </Input>
      <button onClick={() => {
        window.scrollTo({top:0,lefe:0, behavior:"smooth"});
      }}>위로 가기</button>
      {!is_loaded && <Spinner/>}
    </div>
  );
}

const Input = styled.div`
max-width: 350px;
min-height: 10vh;
background-color: #fff;
padding: 16px;
margin: 20px auto;
border-radius: 5px;
border: 1px solid #ddd;
display :flex;
& >*{
  padding : 5px;
}
& input{
  border 1px solid #ccc;
  margin-right : 10px;
  width : 60%;
}
& input:focus{
  outline : none;
  border 3px solid #15aa;
  border-radius : 2px;
}

& button{
  width : 25%;
  color : #fff;
  border : 1px solid #15aa;
  background : #15aa;
}
`;

const Container = styled.div`
max-width: 350px;
min-height: 60vh;
background-color: #fff;
padding: 16px;
margin: 20px auto;
border-radius: 5px;
border: 1px solid #ddd;
`;

const Title = styled.h1`
color: slateblue;
text-align: center;
`;

const Line = styled.hr`
margin: 16px 0px;
border: 1px dotted #ddd;
`;

export default App;