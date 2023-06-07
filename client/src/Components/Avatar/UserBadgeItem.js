import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
export default function UserBadgeItem({user,handlerfunction}) {
  return (
    <Box sx={{bgcolor:"#E8BD0D",borderRadius:"100px", pl:"10px", pr:"10px", pt:"5px",pb:"5px", mt:"5px", fontWeight:"500",cursor:"pointer"}} onClick={handlerfunction}>
        {user.name}
        <CloseIcon sx={{fontSize:"10px", position:"relative", top:"2px",ml:"2px"}}/>
        
    </Box>
  )
}
