import React from 'react';
import logo from './logo.svg';
import './App.css';
// Route를 먼저 불러와줍니다.
import { Route , Routes, Link} from "react-router-dom";

// 세부 페이지가 되어줄 컴포넌트들도 불러와주고요!
import Home from "./Home";
import Cat from "./Cat";
import Dog from "./Dog";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={};
  }
  
  render(){
    return (
      <div className="App">
        
        <div>
          <Link to = "/">Home</Link>
          <Link to = "/cat">Cat</Link>
          <Link to = "/dog">Dog</Link>
        </div>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat/:cat_name" element={<Cat />} />
          <Route path="/dog" Component={<Dog/>} element={<Dog/>} />
        </Routes>
        
      </div>
    );
  }
}

export default App;