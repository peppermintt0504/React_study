import React from 'react';


//Route
import { Route} from 'react-router-dom'
import { ConnectedRouter } from "connected-react-router"
import { history } from '../redux/configureStore';
import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

import Header from '../components/Header';
import { Button, Grid, Input, Text } from "../elements";

import './App.css';



function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        
        
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>

       
      </Grid>
    </React.Fragment>
  );
}

export default App;
