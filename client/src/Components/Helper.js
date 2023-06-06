import { API } from "../backend";

export const CreateGroup = (data,users,name) => {
    return fetch(`${API}/create/groupChat`,{
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
    console.log(data.token);
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