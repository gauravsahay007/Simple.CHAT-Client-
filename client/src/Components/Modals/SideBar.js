import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Typography,TextField, Stack, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { SearchUsers } from '../Helper';
import { ChatState } from '../../main/chatProvider';
import UserListItem from '../Avatar/UserListItem';

import { AccessChats } from '../Helper';

export default function SideBar() {
  const [state, setState] = React.useState({
    
    left: false,
    
  });
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState();
  const [ open ,setOpen] = useState(false);
  const {selectedChat, setSelectedChat} = ChatState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setUser(JSON.parse(localStorage.getItem("userInfo")));
    setTimeout(()=>{
      setOpen(!open);
    },300)

    setState({ ...state, [anchor]: open });
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },1000)
  },[fetch])

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

const onClick = (receiver) =>{
  try{
    AccessChats(user,receiver._id,receiver.name).then(response=>{
      setSelectedChat(response[0]);
    })
  }
  catch(err){
    console.log(err);
  }
}

// console.log(selectedChat);

  const Search = () =>  {
    

    return (
      <Grid item xs={12} sx={{ml:"5px",mb:"10px" , mt: "1px"}}>
      <TextField  
        size='small'
        id="group name"
        label="Search by name or email  "
        sx={{color:"blue"}}
        onChange={(e)=>{handleSearch(e.target.value)}} 
      
      />
      <Button variant='contained' sx={[{ml:"4px",mt:"2px", bgcolor:"#2C3E50", mr:"5px"},{
        "&:hover":{
          bgcolor: "white",
          color:"#2C3E50"
        }
      }]} onClick={()=>{handleSearch(search)}} >Search</Button>

      <Stack direction="row" spacing={10}>  
               
    {loading? (
        <div> <CircularProgress   size="25px" sx={{mt:"12px"}}/></div>
                   
                  ):( <div></div> )} 
                    
            </Stack> 

            {loading? (
        <div> </div> 
                  ):(
                    searchResults
                    ?.slice(0, 4)
                    .map((user) =>
                  
                       (
                      <Box key={user._id} sx={{mr:"10px"} }>
                        <UserListItem key={user._id} user={user} handleFunction={()=>onClick(user)}/>
                      </Box>

                    )))}
      


    </Grid>
    )
  }







  return (
    <div>

      
    
      <React.Fragment >
        <Button onClick={toggleDrawer()}><SearchIcon sx={{color:"#32465A"}} /></Button>
        {open? (  <Drawer
  
          open={open}
         onClose={handleClose} 

         
        >
          <Typography align='center' sx={{mr:"10px",mt:"5px", fontSize:"1.5rem",color:"#2C3E50"}}> Search Users </Typography>
          <Box sx={{border:"1px solid #2C3E50",mb:"5px"}}></Box>
          {Search()}
        </Drawer>):(<></>)}
      
      </React.Fragment>
  
  </div>
  )
}


