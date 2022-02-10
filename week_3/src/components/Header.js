import React from "react";
import {Grid, Text, Button} from "../elements";
import {getCookie,deleteCookie} from "../shared/Cookie"

import { useSelector ,useDispatch} from "react-redux";
import {actionCreators as userAction} from "../redux/modules/user"
import { actionCreators as commentAction } from "../redux/modules/comment";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

import NotiBadge from "./NotiBadge";


const Header = (props) => {
    const is_login = useSelector((state) => state.user.is_login);
    const dispatch = useDispatch();

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
    const is_session = sessionStorage.getItem(_session_key)?true:false;

    const alt = () =>{
        dispatch(commentAction.checkNoti());
        history.push("/noti")
    }



    if(is_login && is_session){
        return(
            <React.Fragment>
                <Grid BG_c="#d2dbf4" is_flex padding="4px 16px">
                    <Grid>
                        <Text cursor={"pointer"} font_style={"italic"} _onClick= {() => history.push("/")} margin="0px" size="30px" bold>IDontKnowWhatToCallThisSite</Text>
                    </Grid>

                    <Grid justify_content="space-around" is_flex>
                        <Grid is_flex width="200px">
                        <NotiBadge _onClick= {alt}/>
                        <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width="150px" text="로그아웃" _onClick ={() => dispatch(userAction.logoutFB({}))}></Button>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
    
    else{
        return (
            <React.Fragment>
                <Grid BG_c="#d2dbf4" is_flex padding="4px 16px">
                    <Grid margin="0 80px">
                        <Text _onClick= {() => {history.push("/")}} margin="0px" size="24px" bold>IDontKnowWhatToCallThisSite</Text>
                    </Grid>
                    
                    <Grid justify_content="space-around" is_flex>
                        <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width="150px" _onClick= {() => {history.push("/login")}} text="로그인"></Button>
                        <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width="150px" _onClick= {() => {history.push("/signup")}} text="회원가입"></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
    
}

Header.defaultProps = {}

export default Header;