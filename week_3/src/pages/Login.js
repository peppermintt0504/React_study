import React from "react";
import styled from "styled-components";
import { Button, Grid, Input, Text } from "../elements";
import { getCookie,deleteCookie,setCookie } from "../shared/Cookie";


import { useDispatch } from "react-redux";
import {actionCreators as userAction} from "../redux/modules/user"
import { emailCheck } from "../shared/common";

const Login = (props) => {
    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [idCheck,setIdCheck] = React.useState(true);
    const [pwdCheck,setPwdCheck] = React.useState(true);


    const dispatch = useDispatch();

    const changeId = (e) => {
        setId(e.target.value);
        
        if(e.target.value === ""){
            setIdCheck(true);
        }else{
            setIdCheck(false);
        }
        console.log(idCheck,pwdCheck ,idCheck || pwdCheck  )
    }

    const changePwd = (e) => {
        setPwd(e.target.value);
        if(e.target.value === ""){
            setPwdCheck(true);
        }else{
            setPwdCheck(false);
        }
        console.log(idCheck, pwdCheck,idCheck || pwdCheck)

    }

    const login = () => {
        if(id === "" || pwd === ""){
            window.alert("정보를 입력하세요.");
            return;
        }

        if(!emailCheck(id)){
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
        }
        
        dispatch(userAction.loginFB(id,pwd));

    }
    return (
        <React.Fragment>
            
            <Grid padding="5% 30%">
                <Text size="32px" bold>로그인</Text>

                <Grid padding="16px 0px">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={changeId}
                        
                    />
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        type = "password"
                        label="패스워드"
                        placeholder="패스워드 입력해주세요."
                        _onChange={changePwd}
                        
                    />
                </Grid>

                <Button radius="10px" border_color="#fff0" BG_c="#4571eeab"
                text="로그인하기"
                _onClick={() => {
                    login();
                }}
                disabled={idCheck || pwdCheck}
                >로그인하기</Button>
            </Grid>
        </React.Fragment>
    )
}

export default Login;
