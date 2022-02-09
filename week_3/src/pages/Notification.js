import React from "react";
import {Grid, Text} from "../elements";
import Card from "../components/Card";

import { realtime } from "../shared/firebase";

import { useSelector } from "react-redux";
import { ref,child, get, orderByChild  } from "firebase/database";

const Notification = (props) => {
    const user = useSelector(state => state.user.user);
    const [noti,setNoti] =React.useState([]);

    React.useEffect(() => {
        if(!user)
            return;
        
            const notiDB = ref(realtime, 'noti/' + user.uid + "/list",orderByChild("insert_dt"));

            get(notiDB).then((snapshot) => {
                if (snapshot.exists()) {
                console.log(snapshot.val());
                } else {
                console.log("No data available");
                }

                const _noti_list = Object.keys(snapshot.val()).reverse().map(s => snapshot.val()[s]);
                
                setNoti(_noti_list)
            }).catch((error) => {
                console.error(error);
            });
    },[user])

    return (
        <React.Fragment>
            <Grid padding="20px 30%" bg="#EFF6FF">
            {noti.map((n,i) => {
                return <Card {...n} key={"noti" + i} />;
            })}
            </Grid>
        </React.Fragment>
    );
}

export default Notification;