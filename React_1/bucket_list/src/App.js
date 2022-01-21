import React from 'react';
import "./style.css"
import styled from "styled-components"

import BucketList from './BucketList';

class App extends React.Component {

  constructor(props){
    super(props);


    this.state = {
      list: ['영화관 가기', '매일 책읽기', '수영 배우기'],
    };

    this.text = React.createRef();
  }

  componentDidMount(){
    console.log(this.text)
  }

  render() {
    return (
      <div className="App">

        <Container>
          <h1>내 버킷리스트</h1>
          <hr/>
          <BucketList list = {this.state.list}/>
        </Container>

        <div>
          <input type="text" ref={this.text} onChange={() => {console.log(this.text.current.value)}}/>
        </div>

      </div>


    );
  }
}

const Container = styled.div`
  
  background-color: #fff;
  width: 50vw;
  max-width: 350px;
  height: 80vh;
  margin: auto;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  h1{
    color: slateblue;
    text-align: center;
  }
  hr{
    margin: 16px 0px;
  }
`;



export default App;