import React from "react";
//The Collapse transition is used by the Vertical Stepper StepContent component. It uses react-transition-group internally.



import {IconButton ,Avatar,Button,Typography ,Box,Dialog,DialogContent,DialogTitle,Collapse } from "@mui/material";

// import ModalOverlay from "@mui/material"
const ProfileModal = ({ user, children, size }) => {
    const {isOpen,onClose,onOpen} = Collapse();
    return(
        <>
        {children ? (
            <span onClick={onOpen}>{children}</span>
        ):(
            <IconButton 
            sx={{display:{base:'flex'},
                background:'inherit',
                borderRadius:'90%'}}
                onClick={onOpen}
            >
            <Avatar
            size={size} cursor='pointer' alt={user.name} src={user.pic}
            />
            </IconButton>
        )}
        {

         <Dialog open={isOpen} onClose={onClose} maxWidth="lg">
            <DialogTitle sx={{fontSize: 40, fontFamily: 'QuickSand', textAlign: 'center'}}>Welcome {user.name}</DialogTitle>
            <DialogContent>
                <Box textAlign="center">
                    <img sx={{borderRadius:'50%',width: '200px', height: '200px', margin :'5'}}
                     src={user.pic} alt={user.name} />
                </Box>
                <Typography>
                    User Id:- {user.email}
                </Typography>
            </DialogContent>
            <Button color="primary" onClick={onClose} >Close</Button>
         </Dialog>
        }


      </>
    )
  
    
  };

  
  export default ProfileModal;
