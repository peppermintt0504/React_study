import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { Route, Routes } from "react-router-dom";
import { collection, getDoc, getDocs } from "firebase/firestore";


import {db} from "./firebase";
import {loadDicFB} from "./redux/modules/dict"
//componenets
import Words from "./Words";
import Writing from "./Writing";

import './App.css';

function App() {


  const data = useSelector((state) => state);
  const Dispatch = useDispatch();
  
  React.useEffect(async() => {

    Dispatch(loadDicFB());

  },[]);



  return (
    <div className="App">
      <Head><Title >나만의 단어장</Title></Head>
      <Warp>
        
        <Routes>
          <Route path="/" element={<Words />}/>
          <Route path="/writing" element={<Writing />}/>
        </Routes>

      </Warp>
    </div>
    
  );
}



const Head = styled.div`
  height : 70px;
  width : 100vw;
  background-color : #15aa;
  color : white;
  text-align : center;
  justify-content: center;
  margin : auto;
`;
const Title = styled.div`
  padding : 10px;
  font-size : 30px;
`;
const Warp = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: center; 
  padding : auto;
`
const Container = styled.div`
  display: flex;
  flex-direction : row;
  justify-content: center; 
  padding : auto;
`;

const Card = styled.div`
  height : 150px;
  width : 23vw;
  margin : 20px 20px;
  background-color : #a1afff3b;
  border : 1px solid #8b84d4b5;
  border-radius : 10px;
`;

export default App;
