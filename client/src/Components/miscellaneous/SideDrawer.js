import React, { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  MenuList,
  Divider,
  Drawer,
  DrawerHeader,
  DrawerBody,
  Input,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/material";
import { Search, Notifications, ExpandMore } from "@mui/icons-material";
import { ChatState } from "../../main/chatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@material-ui/core";
import axios from "axios";
import ChatLoading from "../Chatloading";
import UserListItem from "../UserAvatar/UserListItem";
import { getOtherUser } from "../../configuration/ChatLogics";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "5px 10px",
    border: "5px solid",
    borderColor: theme.palette.primary.main,
  },
  button: {
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    paddingLeft: 4,
  },
  title: {
    fontSize: "3xl",
    fontFamily: "QuickSand",
    color: "black",
  },
  avatarMenu: {
    display: "flex",
    alignItems: "center",
  },
  loadingSpinner: {
    marginLeft: "auto",
    display: "flex",
  },
}));

const SideDrawer = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
    removeNotification,
  } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    setNotification([]);
    localStorage.removeItem("userInfo");
    setSelectedChat();
    history.push("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async () => {
    if (!search) {
      // Display a warning toast if the search bar is empty
      console.log("Search Bar Empty");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!", error.message);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      setLoadingChat(false);
      console.log("Error fetching the Chat", error.message);
    }
  };

  return (
    <>
      <Box className={classes.header}>
        <Tooltip
          title="Search Users to Chat"
          arrow
          placement="bottom-end"
        >
          <Button className={classes.button} variant="text" onClick={onOpen}>
            <Search />
            <Typography className={classes.buttonText} variant="body1">
              Search User
            </Typography>
          </Button>
        </Tooltip>

        <Typography className={classes.title} variant="h4">
          Chit-Chat
        </Typography>

        <div className={classes.avatarMenu}>
          <Menu>
            <Button
              className={classes.button}
              startIcon={
                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
              }
              endIcon={<Notifications />}
              variant="text"
            >
              {/* Notification Menu */}
            </Button>
            <MenuList>
              {!notification.length && (
                <MenuItem>No New Messages</MenuItem>
              )}
              {notification.map((notif) => (
                <React.Fragment key={notif._id}>
                  <MenuItem
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      removeNotification(notif.chat._id);
                    }}
                  >
                    <Box fontWeight="fontWeightMedium">
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getOtherUser(
                            user,
                            notif.chat.users
                          ).name}`}
                    </Box>
                    <div>{notif.content}</div>
                  </MenuItem>
                  <Divider />
                </React.Fragment>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <Button
              className={classes.button}
              endIcon={<ExpandMore />}
              variant="text"
            >
              <Avatar
                alt={user.name}
                src={user.pic}
              />
            </Button>
            <MenuList>
              <ProfileModal user={user} size="small">
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <Divider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <DrawerHeader className={classes.header}>Search Users</DrawerHeader>
        <DrawerBody>
          <Box display="flex" paddingBottom={2}>
            <Input
              placeholder="Search by name or email"
              marginRight={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && (
            <div className={classes.loadingSpinner}>
              <CircularProgress size={24} />
            </div>
          )}
        </DrawerBody>
      </Drawer>
    </>
  );
};

export default SideDrawer;

