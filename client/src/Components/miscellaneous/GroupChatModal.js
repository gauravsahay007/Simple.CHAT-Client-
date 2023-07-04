import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  Typography,
  ModalFooter,
  Spinner,
} from "@mui/material";
import axios from "axios";
import UserBadgeItem from "../Avatar/UserBadgeItem";
import UserListItem from "../Avatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
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
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      handleClose();

      toast({
        title: "New Group Chat Created",
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Failed to create the Chat",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== userToDelete._id)
    );
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>

      <Modal open={isOpen} onClose={handleClose}>
      <Typography
      variant="h4"
      fontSize="35px"
      fontFamily="QuickSand"
      display="flex"
      justifyContent="center"
    >
      Create Group Chat
    </Typography>
    <Box display="flex" flexDirection="column" alignItems="center">
      <FormControl>
        <Input
          placeholder="Chat Name"
          mb={3}
          onChange={(e) => setGroupChatName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Input
          placeholder="Add Users"
          mb={1}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </FormControl>
      <Box width="100%" display="flex" flexWrap="wrap">
        {selectedUsers.map((u) => (
          <UserBadgeItem
            key={u._id}
            user={u}
            handleFunction={() => handleDelete(u)}
          />
        ))}
      </Box>
      {loading ? (
        <CircularProgress ml="auto" />
      ) : (
        searchResults
          ?.slice(0, 4)
          .map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleGroup(user)}
            />
          ))
      )}
    </Box>

    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Chat
      </Button>
    </Box>
      </Modal>
    </>
  );
};

export default GroupChatModal;
