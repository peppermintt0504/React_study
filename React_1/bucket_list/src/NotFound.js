import React from "react";
import {useNavigate} from "react-router-dom"

const NotFound = (prop) => {
    const navigate = useNavigate();


    return (
        <div>

            <h1> 잘못된 주소이다!!!</h1>
            <button onClick={() =>navigate("/")}>뒤로 가기</button>

        </div>
    );
}

export default NotFound;