import React from "react";
import {Button} from "../elements"
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/image";

import { storage } from "./firebase";
import { getDownloadURL ,uploadBytesResumable, ref } from "firebase/storage";

const Upload = (props) => {

    const fileInput = React.useRef();
    const dispatch = useDispatch();
    
    const uploading = useSelector((state) => state.image.uploading);
    
    const selectFile =(e) =>{
        console.log(e);
        console.log(e.target);
        console.log(e.target.files);

        console.log(fileInput.current.files[0]);

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onload = () =>{
            dispatch(userActions.setPreview(reader.result));
        }
    }

    const uploadFB = () =>{
        let image = fileInput.current.files[0];
        if (!fileInput.current || fileInput.current.files.length === 0) {
            window.alert("파일을 선택해주세요!");
            return;
        }
        
        dispatch(userActions.uploadImageFB(image));
    }

    return (
        <React.Fragment>
            <input ref={fileInput} onChange={selectFile} type="file" disabled = {uploading}/>
            {/* <Button radius="10px" border_color="#fff0" BG_c="#4571eeab" width = "30%" _onClick={uploadFB} text = "업로드하기"></Button> */}
        </React.Fragment>
    )
}

export default Upload;