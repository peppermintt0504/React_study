//components/NotiBadge.js
import React from "react";

import { Notifications } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

import { useSelector } from "react-redux";

//real time DB 
import { ref, onValue } from "firebase/database";
import { realtime } from "../shared/firebase";


const NotiBadge = (props) => {
    const [is_read, setIsRead] = React.useState(true);
    const user_id = useSelector((state)=> state.user.user.uid);

    

    const notiCheck = () => {
        props._onClick();
    };

    React.useEffect(() => {
        const notiRef = ref(realtime, 'noti/' + user_id);
        onValue(notiRef, (snapshot) => {
        const data = snapshot.val().read;
        //console.log(data)
        setIsRead(data);
        //updateStarCount(postElement, data);
        });

    },[])

    return (
        <React.Fragment>
        <Badge
            invisible={is_read}
            color="secondary"
            onClick={notiCheck}
            variant="dot"
        >
            <Notifications />
        </Badge>
        </React.Fragment>
    );
};

NotiBadge.defaultProps = {
    _onClick: () => {},
};

export default NotiBadge;