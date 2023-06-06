import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChatState } from '../main/chatProvider';
import { CreateGroup, SearchUsers } from './Helper';
import { isAuthenticated } from './Auth/Helper/APIcalls';
// ----------------------------------------------
// Material UI
import { Typography, Grid, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
// ------------------------------------------------



export default function CreateGroupChat() {
// ----------------------------------------------
// dialog box
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//   -----------------------------------------------------



// -------------------------------------------------------
// states
   const [groupChatName, setGroupChatName] = useState();
   const [selectedUsers, setSelectedUsers] = useState([]);
   const [search, setSearch] = useState();
   const [searchResults, setSearchResults] = useState([]);
   const [loading, setLoading] = useState(false);

   const jwt=isAuthenticated();
    const {user,chats, setChats} = ChatState();
 
   
  
  
   
   
   

// -------------------------------------------------------


// -------------------------------------------------------
// handle functions

const handleSearch = (query) => {
    setSearch(query); 
    if(!query){
        return;
    } 

    try{
        SearchUsers(user,jwt,query).then((response,err)=>{
            setSearchResults(response)
            console.log(searchResults);
        })
    }catch(err){
        console.log(err);
    }
} 

const handleSubmit = () =>{
    if(!groupChatName || !selectedUsers){
        return;
    }
    try{
        CreateGroup(user,selectedUsers,groupChatName).then((response,err)=>{
            console.log(response);
            setChats(response);
        })
    }
    catch(err){
        console.log(err);
        return ;
    }
}

// -------------------------------------------------------

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Group <AddIcon sx={{ fontSize: 22, mb : "3px", ml : "5px" }}/>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle sx={{fontSize: "30px"}}>
        <Typography variant="h4" align="center">
    Create Group Chat
</Typography>
        </DialogTitle>
        <DialogContent>
         
        <Grid item xs={12} sx={{mb:"10px" , mt: "10px"}}>
                <TextField
                  required
                  fullWidth
                  id="group name"
                  label="Group Name"
                  value={groupChatName}
                  onChange={(event)=>{ setGroupChatName(event.target.value)}}
                />
              </Grid>
              <Grid item xs={12} sx={{mb:"10px" , mt: "20px"}}>
                <TextField
                  required
                  fullWidth
                  id="add users"
                  label="Add Users"
                  onChange={(e)=>handleSearch(e.target.value) }
                />
              </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}