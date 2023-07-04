import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useToast, Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, Avatar, Spinner } from "@chakra-ui/react";
import { Search, Notifications, ExpandMore } from "@mui/icons-material";
import { ChatState } from "../../Context/chatProvider";
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getOtherUser } from "../../config/ChatLogics";
import NotificationBadge, { Effect } from "react-notification-badge";
import { API } from "../../API";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
=======
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
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
    removeNotification,
  } = ChatState();

<<<<<<< HEAD
  const navigate = useNavigate();

  const LogoutHandler = () => {
    setNotification([]);
    localStorage.removeItem("userInfo");
    setSelectedChat();
    navigate("/");
=======
  const history = useHistory();

  const logoutHandler = () => {
    setNotification([]);
    localStorage.removeItem("userInfo");
    setSelectedChat();
    history.push("/");
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

<<<<<<< HEAD
  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Search Bar Empty",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });

=======
  const handleSearch = async () => {
    if (!search) {
      // Display a warning toast if the search bar is empty
      console.log("Search Bar Empty");
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

<<<<<<< HEAD
      const { data } = await axios.get(`${API}/api/user?search=${search}`, config);
=======
      const { data } = await axios.get(`/api/user?search=${search}`, config);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
<<<<<<< HEAD
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
=======
      console.log("Error Occurred!", error.message);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
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

<<<<<<< HEAD
      const { data } = await axios.post(`${API}/api/chat`, { userId }, config);
=======
      const { data } = await axios.post("/api/chat", { userId }, config);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      setLoadingChat(false);
<<<<<<< HEAD
      toast({
        title: "Error fetchind the Chat",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "bottom-left",
      });
=======
      console.log("Error fetching the Chat", error.message);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
    }
  };

  return (
    <>
<<<<<<< HEAD
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        bg="white"
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth="5px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <Search />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="3xl" fontFamily="QuickSand" color="black">
          Chit-Chat
        </Text>

        <div style={{ display: "flex", alignContent: "center" }}>
          <Menu>
            <MenuButton p={2}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <Notifications />
            </MenuButton>
            <MenuList pl={5} pr={5}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <>
                  <MenuItem
                    key={notif._id}
=======
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
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      removeNotification(notif.chat._id);
                    }}
<<<<<<< HEAD
                    display="contents"
                  >
                    <Box fontWeight={"semibold"}>
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${
                            getOtherUser(user, notif.chat.users).name
                          }`}
                    </Box>
                    <div>{notif.content}</div>
                  </MenuItem>
                  <MenuDivider />
                </>
=======
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
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
              ))}
            </MenuList>
          </Menu>
          <Menu>
<<<<<<< HEAD
            <MenuButton
              p={1}
              as={Button}
              rightIcon={<ExpandMore />}
              backgroundColor="inherit"
            >
              <Avatar
                size="sm"
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user} size="sm">
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={LogoutHandler}>Logout</MenuItem>
=======
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
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
            </MenuList>
          </Menu>
        </div>
      </Box>

<<<<<<< HEAD
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
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
            {loadingChat && <Spinner ml={"auto"} display="flex" />}
          </DrawerBody>
        </DrawerContent>
=======
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
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
      </Drawer>
    </>
  );
};

export default SideDrawer;
<<<<<<< HEAD
=======

>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
