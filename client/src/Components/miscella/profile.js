import React from "react";




import {IconButton ,Avatar,Button,Typography ,Box,Dialog,DialogContent,DialogTitle } from "@mui/material";
import { ChatState } from "../../main/chatProvider";


const ProfileModal = ({ children, size }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const user = JSON.parse(localStorage.getItem("userInfo"))

   const onOpen=true;
   const isOpen=true;
   const onClose=true;
   const isClose=true;
    return(
        <>
        {children ? (
            <span onClick={handleClickOpen}>{children}</span>
        ):(
            <IconButton 
            sx={{display:{base:'flex'},
                background:'inherit',
                borderRadius:'90%'}}
                onClick={handleClickOpen}
            >
            <Avatar
            size={size} cursor='pointer' alt={user.name} src={user.pic}
            />
            </IconButton>
        )}
        {

         <Dialog open={open} onClose={onClose} maxWidth="lg">
            <DialogTitle sx={{fontSize: 40, fontFamily: 'QuickSand', textAlign: 'center'}}>Welcome {user.user.name}</DialogTitle>
            <DialogContent>
                <Box textAlign="center">

                <Avatar  sx={{  width: 90, height: 90, m:"auto", mb:"20px" }} src={user.pic}/>
                
                </Box>
                <Typography align="center">
                    Email: {user.user.email}
                </Typography>
            </DialogContent>
            <Button color="primary" onClick={handleClose} >Close</Button>
         </Dialog>
        }


      </>
    )
  
    
  };

  
  export default ProfileModal;