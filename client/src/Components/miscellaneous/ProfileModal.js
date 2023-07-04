<<<<<<< HEAD
=======
import React, { useState } from "react";
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
import {
  Avatar,
  Button,
  IconButton,
<<<<<<< HEAD
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";

const ProfileModal = ({ user, children, size }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
=======
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: "pointer",
    borderRadius: "100%",
  },
  modalHeader: {
    fontSize: 40,
    fontFamily: "QuickSand",
    display: "flex",
    justifyContent: "center",
  },
  modalBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const ProfileModal = ({ user, children, size }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab

  return (
    <>
      {children ? (
<<<<<<< HEAD
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={
            <Avatar
              size={size}
              cursor={"pointer"}
              name={user.name}
              src={user.pic}
            />
          }
          onClick={onOpen}
          background="inherit"
          borderRadius={"100%"}
        />
      )}

      <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"40"}
            fontFamily="QuickSand"
            display={"flex"}
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDir="column"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Image
              borderRadius={"full"}
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              margin={5}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily={"QuickSand"}
            >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
=======
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          onClick={handleOpen}
          background="inherit"
          className={classes.avatar}
        >
          <Avatar size={size} alt={user.name} src={user.pic} />
        </IconButton>
      )}

      <Modal open={isOpen} onClose={handleClose} center>
        {/* <ModalOverlay /> */}
        <Modal open={isOpen} onClose={handleClose}>
  <Box className={classes.modalBody}>
    <Avatar
      className={classes.avatar}
      alt={user.name}
      src={user.pic}
    />
    <Typography
      variant="h4"
      className={classes.modalHeader}
    >
      {user.name}
    </Typography>
    <Typography variant="subtitle1">
      Email: {user.email}
    </Typography>
  </Box>
</Modal>

        <Modal>
  <Grid container justify="flex-end">
    <Grid item>
      <Button color="primary" onClick={handleClose}>
        Close
      </Button>
    </Grid>
  </Grid>
</Modal>
>>>>>>> b2401a124fe0cbc90c5475fb7dbd256fe5d1e8ab
      </Modal>
    </>
  );
};

export default ProfileModal;
