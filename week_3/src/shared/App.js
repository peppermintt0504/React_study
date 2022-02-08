import React from 'react';


//Route
import { BrowserRouter,Route} from 'react-router-dom'
import { Brower ,ConnectedRouter } from "connected-react-router"
import { history } from '../redux/configureStore';

//pages
import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Detail from '../pages/Detail';
import PostWrite from '../pages/PostWrite';
import Notification from '../pages/Notification';

import Header from '../components/Header';
import { Button, Grid, Input, Text } from "../elements";

import './App.css';

import { useDispatch } from "react-redux";

import {actionCreators as userAction} from "../redux/modules/user"

import {apiKey} from "./firebase";

import Permit from "./Permit";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const is_session = sessionStorage.getItem(_session_key)?true:false;

  React.useEffect(()=>{

    if(is_session){
      dispatch(userAction.loginCheckFB())
    }
  })

  return (
    <React.Fragment>
      <Header></Header>
      <Grid margin="auto">
        
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/detail" exact component={Detail}/>
          <Route path="/postwrite" exact component={PostWrite}/>
          <Route path="/noti" exact component={Notification} />
        </ConnectedRouter>

        <Permit>
          <Button _onClick={() => history.push("/postwrite")} is_float text = "+">+</Button>
        </Permit>
      </Grid>
    </React.Fragment>
  );
}

export default App;
