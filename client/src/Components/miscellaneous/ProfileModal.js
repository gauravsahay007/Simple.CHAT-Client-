import React, { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
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

  return (
    <>
      {children ? (
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
      </Modal>
    </>
  );
};

export default ProfileModal;
