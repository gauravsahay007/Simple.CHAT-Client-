import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { View as ViewIcon } from "@material-ui/icons";
import axios from "axios";
import { ChatState } from "../../Context/chatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    fontSize: "35px",
    fontFamily: "QuickSand",
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
}));

const UpdateGroupChatModal = ({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleRemove = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      console.log("Only Admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

      if (userToRemove._id === user._id) {
        setSelectedChat();
      } else {
        setSelectedChat(data);
      }
      setLoading(false);
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!", error.message);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      setRenameLoading(false);
      console.log("Error Occurred!", error.message);
    }

    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
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
      setSearchResults(data);
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!", error.message);
    }
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      console.log("User Already in group!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );

      setLoading(false);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!", error.message);
    }
  };

  return (
    <>
      <IconButton
        style={{ display: "flex" }}
        onClick={() => setIsOpen(true)}
      >
        <ViewIcon />
      </IconButton>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} centered>
        <ModalOverlay />
        <Box mx={3} my={2} maxWidth={400}>
          <ModalHeader className={classes.modalHeader}>
            {selectedChat.chatName}
          </ModalHeader>
          <ModalBody>
            <Box width="100%" display="flex" flexWrap="wrap" paddingBottom={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

            {selectedChat.groupAdmin._id === user._id && (
              <>
                <FormControl className={classes.formControl}>
                  <Input
                    placeholder="Chat Name"
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.addButton}
                    disabled={!groupChatName}
                    onClick={handleRename}
                  >
                    Update
                  </Button>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Input
                    placeholder="Add User to Group"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </FormControl>
                {loading ? (
                  <Spinner size="large" />
                ) : (
                  searchResults?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))
                )}
              </>
            )}
          </ModalBody>
          <Button
            color="secondary"
            onClick={() => handleRemove(user)}
            fullWidth
          >
            Leave Group
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
