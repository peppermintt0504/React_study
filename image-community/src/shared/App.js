import React from 'react';


//Route
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PostList from '../pages/PostList';
import Login from '../pages/Login';

import './App.css';



function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<PostList/>}/>
          <Route path ="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
