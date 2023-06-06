import React from 'react'
import { Box, Avatar, Stack, Typography } from '@mui/material'
export default function UserListItem({user, handleFunction}) {

  return (
    <Box onClick={handleFunction} sx={[{bgcolor:"blue",mt:"5px",mb:"5px",color:"white",borderRadius:1 , p:"5px", display:"flex" , gap:"20px",cursor:"pointer"},{
        '&:hover':{
            bgcolor:"#2827CC"
        }
    }]}>
        <Avatar sx={{ bgcolor: "grey", width: 38, height: 38 }} src={user.pic}/>
    <Box sx={{display:"flex", flexDirection:"column"}}>
        <Typography>{user.name}</Typography>
        <Typography sx={{color:"white"}} >{user.email}</Typography>
    </Box>
      
    </Box>
  )
}
