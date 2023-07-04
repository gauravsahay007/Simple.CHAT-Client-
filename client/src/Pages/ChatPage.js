import React, { useState } from "react";
<<<<<<< HEAD
import { ChatState } from "../Context/chatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent="space-between"
        w={"100%"}
        h={"91.5vh"}
        p={"10px"}
=======
import { ChatState } from "../main/chatProvider";
import { Box } from "@mui/system";
import { Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import MyChats from "../Components/Mychats"
import ChatBox from "../Components/ChatBox";

const Chatpage = () => {
  const { user } = ChatState;
  const [fetchAgain, setFetchAgain] = useState();
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%" }}>
      {user && (
        <Drawer variant="permanent">
          <SideDrawer />
        </Drawer>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
