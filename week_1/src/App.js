import React from "react";
import DayOfWeek from "./DayOfWeek";
import Detail from "./Detail";
import NotFound from "./NotFound";
import Spinner from "./Spinner";


import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loadBucketFB, addBucketFB} from "./redux/modules/bucket";
import {db} from "./firebase";
import { addDoc, collection, updateDoc, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";

function App() {
  
  const dispatch = useDispatch();
  const is_loaded = useSelector(state => state.bucket.is_loaded);

  React.useEffect(async() => {
    dispatch(loadBucketFB());

  },[]);



  return (
    <div className="App">
      <Container>
        <Title>내 일주일은?</Title>
        <Line />
        <Routes>
          <Route path="/" element={<DayOfWeek />}></Route>
          <Route path="/detail/:index" element={<Detail />}></Route>
          <Route path='/*' element={<NotFound/>}/>
        </Routes >
      </Container>

      {!is_loaded && <Spinner/>}
    </div>
  );
}


const Container = styled.div`
max-width: 400px;
min-height: 600px;
background-color: #fff;
padding: 16px;
margin: 50px auto;
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