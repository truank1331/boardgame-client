import { Avatar, Box, Chip, CircularProgress, Modal, Stack, Typography } from "@mui/material";
import { deepOrange, deepPurple, green } from "@mui/material/colors";
import { BoardgameData } from "../../pages";
import { AvartarComponent } from "./Avatar";

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
          flexDirection: "row",
          flex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", flex: 1 }}>
          <img
            src={boardgame.pictureUrl}
            loading="lazy"
            width={"fit-content"}
            style={{ maxWidth: "800px", maxHeight: "1400px" }}
          />
        </Box>
        <Box sx={{ marginLeft: "16px", width: "fit-content", minWidth: "600px" }}>
          <Box sx={{ marginBottom: "8px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {boardgame.gameName}
              </Typography>
              <Chip label="Play Always" color="success" sx={{ marginLeft: "8px" }} />
            </Box>

            <Typography>{boardgame.thaiName}</Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <AvartarComponent name={"OOB"} />
            <AvartarComponent name={"PB"} />
            <AvartarComponent name={"TR"} />
            <AvartarComponent name={"PL"} />
          </Stack>
          <Box
            sx={{
              marginTop: "16px",
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
            }}
          >
            <CircularProgress size={64} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
