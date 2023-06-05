import { useState } from "react";
import { API } from "../backend";

const chatProvider=({children})=>{
    const [user,setUser]=useState();
    const [notification,setNotification]=useState([]);
    const [error,setError]=useState();
        
   const getNotification=(userId,token,notification)=>{
    const configure={
        method:"POST",
        headers:{
            Authorization: `Bearer ${user.token}` 
        },
    };
    const {data}=fetch(`${API}/getnotification/${userId}`,{
        configure
    });
    var array=[];
    data.notification.forEach((ele)=>{
        array.push(ele.message);
    });
    setNotification(array);
    if(!user){
return;
    }return {data}
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
   };
  
}
export default chatProvider