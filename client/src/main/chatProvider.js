import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { API } from "../backend";
import { getOtherUsers } from '../configuration/logic';
const ChatContext=createContext();
const chatProvider=({children})=>{
    const [chat,setChat]=useState;
    const [error,setError]=useState;
    const [user,setUser]=useState;
    const [selectedChat,setSelectedChat]=useState;
    const [notification,setNotification]=useState;
  
   const removeNotification=(userId,chatId)=>{
    //need to change from backend
    const configure={
        method:"PUT",
        headers:{
            Authorization: `Bearer ${user.token}` 
        },
    };
    //improve backend route in user router
    const {data}=fetch(`${API}/deletenotification/${userId}`,
    {
        userId: user._id,
        chatId: chatId,
      },
    {
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
    .catch(err=>console.log({
        title: "Error deleting the Notifications",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "bottom",
    }))
   };
   } 
   const sendNotification=(data,userId)=>{
    const recievers=getOtherUsers(user,selectedChat.users);
    
    for(const receiver of recievers){
        //fetching api of send message
        fetch(`${API}/message/send/${userId}`,
        {
            userId: receiver._id,
            messageId: data._id,
            chatId: data.chat._id,
          },
        {
            method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
    }
   }

   useEffect(()=>{
    const getNotification=(userId)=>{
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
        .catch(err=>console.log({
            title: "Error fetching the Notifications",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "top",
        }))
       };
   },[user, getNotification, setNotification, error.message]);
   return (
    <ChatContext.Provider
    value={{
        user,setUser,
        selectedChat,setSelectedChat,
        chat,setChat,
        error,setError,

        notification,setNotification,
        removeNotification,
        sendNotification,
    }}
    >
      {children}
    </ChatContext.Provider>
   )
};
export const ChatState=()=>{
    return useContext(ChatContext);
}
export default chatProvider