import React from "react";
import {Grid, Text, Button} from "../elements";
import {getCookie,deleteCookie} from "../shared/Cookie"

import { useSelector ,useDispatch} from "react-redux";
import {actionCreators as userAction} from "../redux/modules/user"

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";


const Header = (props) => {
    const is_login = useSelector((state) => state.user.is_login);
    const dispatch = useDispatch();

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
    const is_session = sessionStorage.getItem(_session_key)?true:false;


    if(is_login && is_session){
        return(
            <React.Fragment>
                <Grid BG_c="#d2dbf4" is_flex padding="4px 16px">
                    <Grid>
                        <Text margin="0px" size="24px" bold>헬로</Text>
                    </Grid>

                    <Grid justify_content="space-around" is_flex>
                        <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width="220%" text="내정보"></Button>
                        <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width="220%" text="알림" _onClick={() => {history.push('/noti')}}></Button>
                        <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width="220%" text="로그아웃" _onClick ={() => dispatch(userAction.logoutFB({}))}></Button>
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
                        <Text margin="0px" size="24px" bold>헬로</Text>
                    </Grid>
                    
                    <Grid justify_content="space-around" is_flex>
                        <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width="220%" _onClick= {() => {history.push("/login")}} text="로그인"></Button>
                        <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width="200%" _onClick= {() => {history.push("/signup")}} text="회원가입"></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
    
}

Header.defaultProps = {}

export default Header;