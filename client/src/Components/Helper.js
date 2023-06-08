import { API } from "../backend";

export const CreateGroup = (data,users,name) => {
    return fetch(`${API}/create/groupChat/${data.user._id}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`
        },
        body:JSON.stringify({
            name: `${name}`,
            users: [
                "647a2da4a6438fe12d13335a",
                "647a37b9d146a8ba6301cf6e"
            ]
        })
    }).then(resp=>{
        return resp.json() ;
    })
}


export const SearchUsers = (data,search) => {
    // console.log(data);
    return fetch(`${API}/${data.user._id}?search=${search}`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${data.token}`
     }   }).then(response=>{
        
        return response.json();
    })
}

export const FetchChats = (data) => {
   return (data?(fetch(`${API}/fetch/chats/${data.user._id}`,{
    method:"GET",
    headers:{
        Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${data.token}`
 } }).then((response)=>{
    return response.json();
 })):( null))
}

export const RenameGroup = (data, chatName, chatId) =>{
    return fetch(`${API}/rename/group`,{
        method:"PUT",
    headers:{
        Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${data.token}`
 } ,
 body:JSON.stringify(
   
    {chatName,chatId}
 )
    })
}

export const Kickout = (data, chatId, userId) => {
   
    return fetch(`${API}/kickOut`,{
        method:"PUT",
    headers:{
        Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${data.token}`
 } ,
 body:JSON.stringify({ 
    "userId" : userId,
    "chatId" : chatId
 })
    })
}

export const AddToGroup = (data,chatId,userId) => {
    return fetch(`${API}/addto/group`,{
        method:"PUT",
    headers:{
        Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${data.token}`
 } ,
 body:JSON.stringify(
   
    {chatId,userId}
 )
    })
}