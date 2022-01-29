import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { collection, getDoc, getDocs } from "firebase/firestore";



import {loadDicFB} from "./redux/modules/dict"

//componenets
import Words from "./Words";
import Writing from "./Writing";

import './App.css';
import { ConstructionOutlined } from "@mui/icons-material";

function App() {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  
  React.useEffect(async() => {
    Dispatch(loadDicFB());

  },[]);



  return (
    <div className="App">
      <Head onClick={() => navigate("/")}><Title >나만의 단어장</Title></Head>
      <Warp>   
        <Routes>
          <Route path="/" element={<Words />}/>
          <Route path="/writing/:id" element={<Writing post_type='rectify'/>}/>
          <Route path="/writing" element={<Writing post_type='create'/>}/>
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
  position : fixed;
  top : 0px;
`;
const Title = styled.div`
  padding : 10px;
  font-size : 30px;
  cursor: pointer;
  
`;
const Warp = styled.div`
  margin-top : 70px;
  display: flex;
  flex-direction : column;
  justify-content: center; 
  padding : auto;
`;


export default App;
