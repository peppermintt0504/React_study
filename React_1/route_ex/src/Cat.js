import React from "react";
import {useParams} from "react-router-dom"

const Cat = (props) => {

    const cat_names = useParams();
    console.log(cat_names);

    return (
        <div>고양이 화면이에요.</div>
    )
}

export default Cat;