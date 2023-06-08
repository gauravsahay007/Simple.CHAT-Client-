import React,{useState} from "react";
import { API } from "../../backend";
import {
    Drawer,
    Divider,
    IconButton,
    Box ,
    
     
   InputBase,
    ListItem,
    
    Button,
    Typography,
    CircularProgress,
    Tooltip,
    Menu,
    MenuItem,
    MenuList,
   
   
    
} from '@mui/material';
import {Alert} from "@mui/material";
import {Avatar} from "@mui/material";
import {Snackbar} from "@mui/material";
import { ChatState } from "../../main/chatProvider";
import { Notifications ,Effect, ExpandMore} from "@mui/icons-material";
import { Badge } from "@mui/icons-material";
import ProfileModal from "./profile";
import { Search } from "@mui/icons-material";
import ChatLoading from "../chatloading";
import { getOtherUsers } from "../../configuration/logic";
import { useNavigate } from 'react-router-dom';
export default function SideBar(){
    const [open, setOpen] = React.useState(false);
    
   const isOpen=true;
   const onClose=true;
  const onOpen=true;
  
  const [error,setError]=useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
    
  };

//    ............states........//
   const [search,setSearch]=useState();
   const [loading,setLoading]=useState();
   const [searchResult,setSearchResult]=useState([]);
   const [loadingChat,setLoadingChat]=useState();
   //Use of chatstate
   const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
    IconButton,
    removeNotification,
  } = ChatState();
  const navigate=useNavigate();


   const handleSearch=()=>{
    //doubt
    
        if(!search){
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} onClose={handleClose} autoHideDuration={5000}>
        <Alert  severity="error" variant='filled' sx={{ width: '100%' }}>
        Search Bar is Empty
        </Alert>
      </Snackbar>
            return;
        }
        try{
            setLoading(true);
            const {data}=fetch(`${API}/${user._id}?search=${search}`,
            
        {method:"GET",
            headers:{
            Authorization: `Bearer ${user.token}`,
        }}
    )
    setLoading(false);
    setSearchResult(data);
        }
        catch(error){
            setLoading(false);
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} onClose={handleClose} autoHideDuration={5000}>
        <Alert  severity="error" variant='filled' sx={{ width: '100%' }}>
        Failed to Load the Search Results
        </Alert>
      </Snackbar>
        }
        
   }
   const accessChat=(userId)=>{
       try{
        setLoadingChat(true);
        const {data}=fetch(`${API}/chat`,
        {userId},
        {
            method:"POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
        }
        )
        if(!chats.find((chat)=>chat._id===data._id))setChats([data,...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();
       }
       catch{
          setLoadingChat(false);
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} onClose={handleClose} autoHideDuration={5000}>
        <Alert  severity="error" variant='filled' sx={{ width: '100%' }}>
        "Error fetchind the Chat", ${error.message}
        </Alert>
      </Snackbar>
       }
   }
   //handling the logout functionality
   //
   const LogoutHandler=()=>{
    //line clears the notification array by setting it to an empty array, effectively removing any pending notifications.
    setNotification([]);
    //This line removes the "userInfo" item from the browser's local storage. This is typically used to clear any stored user information or authentication tokens upon logout.
    localStorage.removeItem("userInfo");
    // This line clears the selected chat by setting it to undefined or null. It ensures that no chat is selected after the user logs out.
    setSelectedChat();
    //This line clears the selected chat by setting it to undefined or null. It ensures that no chat is selected after the user logs out.
    navigate("/login");
   };
    return (
        <>
           <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="white"
      width="100%"
      padding="5px 10px"
      border="5px solid"
    >
    <Tooltip title="Search friends to talk..." arrow placement="bottom-end" >
        <Button variant="outlined" onClick={onOpen}>
          <Search/>
          <span style={{display:'none',flex:1,paddingLeft:4}}>
            Find Friend
          </span>
          </Button>
    </Tooltip>
    <Typography variant="h3" fontFamily="Quicksand" color="black">
      SociSnap
    </Typography>

    <div style={{ display: 'flex', alignContent: 'center' }}>
    <Menu>
        <IconButton>
          <Badge badgeContent={notification?.length || 0} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <MenuList pl={5} pr={5}>
          {notification?.length ? (
            notification.map((notif) => (
              <React.Fragment key={notif._id}>
                <MenuItem
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    removeNotification(notif.chat._id);
                  }}
                  sx={{ display: 'contents' }}
                >
                  <Box fontWeight="semibold">
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getOtherUsers(user, notif.chat.users).name}`}
                  </Box>
                  <div>{notif.content}</div>
                </MenuItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <MenuItem>
              <Typography>No New Messages</Typography>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      
      <Menu>
        <IconButton p={1} as={Button} rightIcon={<ExpandMore/>} backgroundColor="inherit">
        <Avatar size= "small" 
        cursor= "pointer"
         alt= {user?.name || 'User'}
         src={user?.pic}/>
        </IconButton>
        <MenuList>
            <ProfileModal user={user} size="small">
               <Typography>My Profiles</Typography>
            </ProfileModal>
            <Divider/>
            <MenuItem onClick={()=>LogoutHandler()}>LogOut</MenuItem>
        </MenuList>
      </Menu>
    </div>
    </Box>






        <div>
           Search User
           <Drawer anchor="left" onClose={onClose} isOpen={isOpen}>
           <Typography borderBottomWidth={"1px"}>Search Users</Typography>
            <Box display={"flex"} pb={2}>
              <InputBase
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <Button onClick={()=>handleSearch()}>Go</Button>
            </Box>
{/* if it is loading then calling  chatloading function which will call for */}
{/* renders a Stack component with a single Skeleton component inside. The Skeleton component is used as a loading placeholder, */}
            {loading ? (<ChatLoading/>):(
// if loading value gets false then it will start mapping on array obtained by useState searchResult 
//map() function will iterate over every user and return the result 
//based on the callback function i.e accesschat() and store it in array
                searchResult?.map((user)=>(
                    <ListItem
                    key={user._id}
                    user={user}
                    handleFunction={()=>accessChat(user._id)}
                    />
                ))
            )}
{/* loadingChat is likely a boolean variable that indicates whether a loading state is active or not. */}
            {loadingChat && <CircularProgress sx={{ marginLeft: 'auto', display: 'flex' }}/> }
             <Divider/>
            
           </Drawer>
        </div>
        </>
    )
}