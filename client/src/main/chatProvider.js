import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from "../backend";
import { getOtherUsers } from '../configuration/logic';
const ChatContext=createContext("");
const ChatProvider=({children})=>{

    const navigate = useNavigate();

    const [chat,setChat]=useState();
    const [error,setError]=useState();
    const [user,setUser]=useState();
    const [selectedChat,setSelectedChat]=useState();
    const [notification,setNotification]=useState();

    const getNotification=(userId)=>{
        
        var array=[];
        
        const {data}=fetch(`${API}/getnotification/${userId}`,{
            method:"POST",
            headers:{
                Authorization: `Bearer ${user.token}` 
            },
            body:{
               array 
            }
        });
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
   const removeNotification=(chatId)=>{
    //need to change from backend
   
    //improve backend route in user router
    const {data}=fetch(`${API}/deletenotification/`,

      {
        method:"PUT",
        headers:{
            Authorization: `Bearer ${user.token}` 
        },
        body:{
            userId: user._id,
            chatId: chatId,
            
          },
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
   
   const sendNotification=(data,userId)=>{
    const recievers=getOtherUsers(user,selectedChat.users);
    
    for(const receiver of recievers){
        //fetching api of send message
        fetch(`${API}/message/send/${userId}`,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body:{
                userId: receiver._id,
                messageId: data._id,
                chatId: data.chat._id,
              },
        })
    }
   }

   

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
   );
};
export const ChatState=()=>{
    return useContext(ChatContext);
}
export default ChatProvider