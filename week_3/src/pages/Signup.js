import React from "react";
import styled from "styled-components";
import { Button, Grid, Input, Text } from "../elements";
import { getCookie,deleteCookie,setCookie } from "../shared/Cookie";

import Header from "../components/Header.js"

import { useDispatch } from "react-redux";
import {actionCreators as userAction} from "../redux/modules/user"
import { emailCheck } from "../shared/common";

const Signup = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState('');
    const [pwd,setPwd] = React.useState('');
    const [pwd_check,setPwd_check] = React.useState('');
    const [name,setName] = React.useState('');

    

    


    const signup= () =>{

        if(pwd !== pwd_check){
            window.alert('패스워드가 다릅니다.');
            return;
        
        }
        if(!emailCheck(id)){
            window.alert('이메일 형식이 맞지 않습니다!');
            return;
        }

        if(id === "" || pwd === "" || name === ""){
            window.alert("Please input your info...");
            return;
        }

        dispatch(userAction.signupFB(id,pwd,name))
    }

    return (
        <React.Fragment>
            <Grid padding="20px 30%">
                <Text size="32px" bold>
                회원가입
                </Text>

                <Grid padding="16px 0px">
                <Input
                    label="아이디"
                    placeholder="아이디를 입력해주세요."
                    _onChange={(e) => {
                        setId(e.target.value)
                    }}
                />
                </Grid>

                <Grid padding="16px 0px">
                <Input
                    label="닉네임"
                    placeholder="닉네임을 입력해주세요."
                    _onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                </Grid>

                <Grid padding="16px 0px">
                <Input
                    type = "password"
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요."
                    _onChange={(e) => {
                        setPwd(e.target.value)
                    }}
                />
                </Grid>

                <Grid padding="16px 0px">
                <Input
                    type = "password"
                    label="비밀번호 확인"
                    placeholder="비밀번호를 다시 입력해주세요."
                    _onChange={(e) => {
                        setPwd_check(e.target.value)
                    }}
                />
                </Grid>

                <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" _onClick={() =>{signup()}} text="회원가입하기"></Button>
            </Grid>
        </React.Fragment>
    );
};

Signup.defaultProps = {};

export default Signup;