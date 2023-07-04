<<<<<<< HEAD
import { ViewIcon } from "@chakra-ui/icons";
=======
import React, { useState } from "react";
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
<<<<<<< HEAD
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { API } from "../../API";
import React, { useState } from "react";
=======
  ModalHeader,
  ModalOverlay,
  Spinner,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { View as ViewIcon } from "@material-ui/icons";
import axios from "axios";
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
import { ChatState } from "../../Context/chatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

<<<<<<< HEAD
const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
=======
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
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

<<<<<<< HEAD
  const toast = useToast();

=======
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
  const handleRemove = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
<<<<<<< HEAD
      toast({
        title: "Only Admins can remove someone!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
=======
      console.log("Only Admins can remove someone!");
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

      const { data } = await axios.put(
<<<<<<< HEAD
        `${API}/api/chat/groupremove`,
=======
        "/api/chat/groupremove",
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

<<<<<<< HEAD
      userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);
=======
      if (userToRemove._id === user._id) {
        setSelectedChat();
      } else {
        setSelectedChat(data);
      }
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
      setLoading(false);
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (error) {
      setLoading(false);
<<<<<<< HEAD
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
=======
      console.log("Error Occurred!", error.message);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
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
<<<<<<< HEAD
        `${API}/api/chat/rename`,
=======
        "/api/chat/rename",
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
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
<<<<<<< HEAD
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
=======
      console.log("Error Occurred!", error.message);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
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

<<<<<<< HEAD
      const { data } = await axios.get(`${API}/api/user?search=${search}`, config);
=======
      const { data } = await axios.get(`/api/user?search=${search}`, config);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
      setLoading(false);
      setSearchResults(data);
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
      return;
=======
      console.log("Error Occurred!", error.message);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
    }
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
<<<<<<< HEAD
      toast({
        title: "User Already in group!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

=======
      console.log("User Already in group!");
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

      const { data } = await axios.put(
<<<<<<< HEAD
        `${API}/api/chat/groupadd`,
=======
        "/api/chat/groupadd",
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
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
<<<<<<< HEAD
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
=======
      console.log("Error Occurred!", error.message);
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
    }
  };

  return (
    <>
      <IconButton
<<<<<<< HEAD
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily="QuickSand"
            display={"flex"}
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display="flex" flexWrap={"wrap"} pb={3}>
=======
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
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

<<<<<<< HEAD
            {selectedChat.groupAdmin._id === user._id ? (
              <>
                <FormControl display={"flex"}>
                  <Input
                    placeholder="Chat Name"
                    mb={3}
=======
            {selectedChat.groupAdmin._id === user._id && (
              <>
                <FormControl className={classes.formControl}>
                  <Input
                    placeholder="Chat Name"
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                  <Button
<<<<<<< HEAD
                    variant="solid"
                    colorScheme={"teal"}
                    ml={1}
                    isLoading={renameLoading}
=======
                    variant="contained"
                    color="primary"
                    className={classes.addButton}
                    disabled={!groupChatName}
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
                    onClick={handleRename}
                  >
                    Update
                  </Button>
                </FormControl>
<<<<<<< HEAD
                <FormControl display={"flex"}>
                  <Input
                    placeholder="Add User to group"
                    mb={1}
=======
                <FormControl className={classes.formControl}>
                  <Input
                    placeholder="Add User to Group"
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </FormControl>
                {loading ? (
<<<<<<< HEAD
                  <Spinner size="lg" />
=======
                  <Spinner size="large" />
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
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
<<<<<<< HEAD
            ) : (
              <></>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
=======
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
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
