import React, { useEffect } from 'react'
import { useState } from 'react';
import { ChatState } from '../../main/chatProvider';
import UserListItem from '../Avatar/UserListItem';
// ------------------------------------
// MUI
import { Typography, Grid, Snackbar, CircularProgress, Stack, Alert, Box, IconButton} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import UserBadgeItem from '../Avatar/UserBadgeItem';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { AddToGroup, FetchChats, Kickout, RenameGroup, SearchUsers } from '../Helper';
// ------------------------------------


export default function UpdateGroupChat({fetchAgain, setFetchAgain, fetchMessages}) {
  const [open, setOpen] = React.useState(false);
  const [selectedChat, setSelectedChat] = useState();
   const [fetch, setFetch] = useState(false);
   const [members, setMembers] = useState([]);
   const {user} =    ChatState();
  const [success, setSuccess] = useState(false);
  const [successDel, setSuccessDel] = useState(false);
  const [chatName , setChatName ] = useState("");
//  console.log(user);
  const handleClickOpen = () => {
    if(user)  FetchChats(user).then(response=>{
        setSelectedChat(response[0]);
        if(!selectedChat) setOpen(false);
        
        else{
          setTimeout(()=>{
            setMembers(selectedChat.users)
            setChatName(selectedChat.chatName)
            setOpen(true);
          },300)
        }
       
       
      })

  };

  

  

  const handleClose = () => {
    setOpen(false);
  };

 

  
// ---------------------------------------------
// STATES
  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [renameLoading, setRenameLoading] = useState(false);
 

//----------------------------------------------- 
  

// ----------------------------------------------
// Handle functions
  const handleRemove = (userToRemove) =>{
        try{
          setLoading(true);
          Kickout(user,selectedChat._id,userToRemove._id).then(response=>{
           setLoading(false);
           setSuccessDel(true);
           setMembers(members.filter(u=>u._id!=userToRemove._id));
          })
         }
        
        catch{
          setLoading(false);
        }
  }

  

  const handleRename = () =>{
    if(!groupChatName) return ;
    try{
      setRenameLoading(true);
      RenameGroup(user, groupChatName , selectedChat._id).then(response=>{
        setRenameLoading(false);
        setSelectedChat(response);
        setChatName(groupChatName);
        // setFetchAgain(!fetchAgain);
      })
    }
    catch(err){
      setRenameLoading(false);
      <Snackbar open={true} autoHideDuration={4000}>
      <Alert onClose={handleClose} severity="error" variant='filled' sx={{ width: '100%' }}>
       Error Occured!
      </Alert>
    </Snackbar>
    }

    setGroupChatName("");
  }

  const handleSearch = (query) => {
    setSearch(query); 
    if(!query){
        return;
    } 

    try{
        setLoading(true)
        SearchUsers(user,query).then((response,err)=>{
          setSearchResults(response)
           setFetch(!fetch);
    
        })
    }catch(err){
        
        console.log(err);
        return;
    }
} 

useEffect(()=>{
  setTimeout(()=>{
    setLoading(false);
  },1000)
},[fetch])









const handleAddUser = (userToAdd) => {
  if(selectedChat.users.find((u)=>u._id === userToAdd._id)){
    <Snackbar open={true} autoHideDuration={4000}>
    <Alert onClose={handleClose} severity="error" variant='filled' sx={{ width: '100%' }}>
     User Already in group!!
    </Alert>
  </Snackbar>
  return ;
  }

  try{
    setLoading(true);
   
AddToGroup(user,selectedChat._id,userToAdd._id).then(response=>{
 setFetch(!fetch)
 setSuccess(true);
  setMembers([...members,response]);
console.log(members);
// setSelectedChat(response);
// setFetchAgain(!fetchAgain);
})
  }
  catch(err){
    setFetch(false);
      <Snackbar open={true} autoHideDuration={4000}>
      <Alert onClose={handleClose} severity="error" variant='filled' sx={{ width: '100%' }}>
       Error Occured!
      </Alert>
    </Snackbar>
  }

}

const Array = () =>{
  return (members.map((u)=>(
    <>
    <Snackbar open={success} autoHideDuration={2000}onClose={()=>{
      setSuccess(false);
    }} >
      <Alert onClose={handleClose} severity="success" variant='filled' sx={{ width: '100%' }}>
       User Added!!
      </Alert>
    </Snackbar>
    <UserBadgeItem key={u._id} user={u} handlerfunction={()=>{handleRemove(u)}}/>
    </>
   
)))
}




// ----------------------------------------------
  


  

return (
  <>
    <Snackbar open={successDel} autoHideDuration={2000}onClose={()=>{
      setSuccessDel(false);
    }} >
      <Alert onClose={handleClose} severity="success" variant='filled' sx={{ width: '100%' }}>
       User Deleted Successfully!!
      </Alert>
    </Snackbar>

  <IconButton onClick={handleClickOpen} sx={{borderRadius:"4px",m:"4px"}}>
  <RemoveRedEyeRoundedIcon sx={{color:"blue",m:"5px"}}   />
  </IconButton>

  {open? (
       <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" >
       <DialogTitle sx={{fontSize: "30px"}}>
       <Typography variant="h5" align="center">
   {chatName}
 </Typography>
       </DialogTitle>
       <DialogContent>
 
       <Box sx={{display:"flex", fontSize:"10px", gap:"5px"}}>
                   {Array()}
               </Box>
        
       <Grid item xs={12} sx={{mb:"10px" , mt: "10px"}}>
               <TextField  
                 size='small'
                 id="group name"
                 label="Chat Name"
                 value={groupChatName}
                 onChange={(event)=>{ setGroupChatName(event.target.value) 
               } }
               
               />
               <Button variant='contained' sx={{ml:"4px",mt:"2px", bgcolor:"blue"}} onClick={handleRename} >Update</Button>
             </Grid>
             <Grid item xs={12} sx={{mb:"10px" , mt: "10px"}}>
               <TextField
                size='small'
                 fullWidth
                 id="add users"
                 label="Add User to group"
                 onChange={(e)=>(handleSearch(e.target.value)) }
               />
          
             </Grid>
             
           
              
               <Stack direction="row" spacing={15}>
               <Button variant='contained' onClick={handleRemove(user)} sx={[{ml:"4px",mt:"2px", bgcolor:"red"},{
               '&:hover':{
                 bgcolor:"#C53030"
               }
             }]} >Leave Group</Button>
               {loading? (
        <div> <CircularProgress size="23px" sx={{mt:"12px",color:"blue"}}/></div>
                   
                  ):( <div></div> )} 
               </Stack>

               {loading? (
        <div> </div> 
                  ):(
                    searchResults
                    ?.slice(0, 4)
                    .map((user) => (
                      <UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)}/>
                     
                    )))}
           
       </DialogContent>
       
     </Dialog>
                   
                  ):(<></> )} 
  
  
  </>
)
}
