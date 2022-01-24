import React from "react";
import { useNavigate } from "react-router-dom"
const Dog = (props) => {

    console.log(props)
    const history = useNavigate();
    return (
        <div onClick={() => {history("/");}}>강아지 화면이에요.</div>
    )
}

export default Dog;