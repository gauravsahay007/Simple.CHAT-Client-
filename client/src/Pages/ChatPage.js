import React, { useState } from "react";
import { ChatState } from "../Context/chatProvider";
import { Box } from "@mui/system";
import { Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

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
