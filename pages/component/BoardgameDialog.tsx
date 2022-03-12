import { AppBar, Box, Button, IconButton, Modal, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BoardgameData } from "..";

interface BoardgameDialogProps {
  modalStatus: boolean;
  handleCloseModal: Function;
  boardgame: BoardgameData;
}
export function BoardgameDialog(props: BoardgameDialogProps) {
  const modalStatus = props.modalStatus;
  const handleCloseModal = props.handleCloseModal;
  const boardgame = props.boardgame;

  return (
    <Modal
      open={modalStatus}
      onClose={() => {
        handleCloseModal();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          maxWidth: 1000,
          p: 4,
        }}
      >
        <img src={boardgame.pictureUrl} loading="lazy" width={"fit-content"} />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {boardgame.gameName}
        </Typography>
        <Typography>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Typography>
      </Box>
    </Modal>
  );
}
