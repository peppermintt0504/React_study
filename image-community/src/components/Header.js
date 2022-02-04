import React from "react";
import {Grid, Text, Button} from "../elements";
import {getCookie,deleteCookie} from "../shared/Cookie"

const Header = (props) => {
    const [is_login , set_is_login] = React.useState(false)

    React.useEffect(() => {

        let cookie = getCookie("user_id");
        

        if(cookie)
            set_is_login(true);
        else
            set_is_login(false);

    });

    

    if(is_login){
        return(
            <React.Fragment>
                <Grid is_flex padding="4px 16px">
                    <Grid>
                        <Text margin="0px" size="24px" bold>헬로</Text>
                    </Grid>
                    
                    <Grid is_flex>
                        <Button text="내정보"></Button>
                        <Button text="알림"></Button>
                        <Button text="로그아웃" _onClick ={() => deleteCookie("user_id")}></Button>
    
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
    
    else{
        return (
            <React.Fragment>
                <Grid is_flex padding="4px 16px">
                    <Grid>
                        <Text margin="0px" size="24px" bold>헬로</Text>
                    </Grid>
                    
                    <Grid is_flex>
                        <Button text="로그인"></Button>
                        <Button text="회원가입"></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
    
}

Header.defaultProps = {}

export default Header;