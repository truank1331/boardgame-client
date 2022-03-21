import { useEffect, useState } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Fab,
  FormControlLabel,
  Modal,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { BoardgameData } from "../../pages";
import { TabContext, TabList, TabPanel } from "@mui/lab";

interface FormDialogProps {
  modalStatus: boolean;
  handleCloseModal: Function;
  gameList: BoardgameData[];
  playerList: any[];
}
interface FormPlayerData {
  key: number;
  username: String;
  score: number;
  description: String;
  isWin: boolean;
}
interface FormSubmitData {
  gameName: String;
  playDate: Date;
  playerData: FormPlayerData[];
}
interface tempUsernameListData {
  key: number;
  username: string;
}

const generateKey = () => {
  return `_${new Date().getTime()}`;
};

export function FormDialog(props: FormDialogProps) {
  const modalStatus = props.modalStatus;
  const handleCloseModal = props.handleCloseModal;

  const [gameList, setGameList] = useState<string[]>([]);
  const [playerList, setPlayerList] = useState<string[]>([]);

  const [playerNumber, setPlayerNumber] = useState<FormPlayerData[]>([
    { username: "", description: "", isWin: false, score: 0, key: 0 },
  ]);

  const [value, setValue] = useState<Date | null>(new Date());
  const [isWin, setIsWin] = useState<boolean>(false);

  const [tempUsernameList, setTempUsernameList] = useState<tempUsernameListData[]>([]);

  useEffect(() => {
    if (props.gameList.length > 0) {
      const tempGameList = props.gameList.map((item) => {
        return `${item.gameName} - ${item.thaiName}`;
      });
      setGameList(tempGameList);
    }
  }, [props.gameList]);

  useEffect(() => {
    if (props.playerList.length > 0) {
      const tempPlayerListList = props.playerList.map((item) => {
        return `${item.username}`;
      });
      setPlayerList(tempPlayerListList);
    }
  }, [props.playerList]);

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
        <Box sx={{ marginLeft: "16px", width: "fit-content", minWidth: 600 }}>
          <Box sx={{ marginBottom: "8px" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Add Game History
              </Typography>
              <Chip label="Play Always" color="warning" sx={{ marginLeft: "8px" }} />
            </Box>

            <Typography>เพิ่มประวัติการเล่น</Typography>
          </Box>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={gameList}
            sx={{ width: "100%", marginBottom: "16px" }}
            renderInput={(params) => <TextField {...params} label="Game" />}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {playerNumber.map((item, index) => (
            <Box sx={{ width: "100%", typography: "body1" }} key={index}>
              <Paper
                elevation={8}
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  marginBottom: "16px",
                  marginTop: "16px",
                  padding: "16px",
                }}
              >
                <Box sx={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={playerList.filter((item) => !tempUsernameList.find((ele) => ele.username == item))}
                    sx={{ width: "70%", marginBottom: "8px", marginRight: "8px" }}
                    onChange={(event, value) => {
                      const oldTempUsernameList = tempUsernameList.filter((item) => item.key !== index);
                      const newData: tempUsernameListData = { key: index, username: value || "" };
                      setTempUsernameList((prev) => [...oldTempUsernameList, newData]);
                    }}
                    renderInput={(params) => <TextField {...params} label="Player Name" />}
                  />
                  <TextField label="Score" variant="outlined" sx={{ width: "30%", marginBottom: "8px" }} />
                </Box>
                <TextField label="Description" variant="outlined" sx={{ width: "100%", marginBottom: "8px" }} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isWin}
                        onChange={() => {
                          setIsWin(!isWin);
                        }}
                        name="gilad"
                      />
                    }
                    label={isWin ? "This Player are Winner 👑👑👑 " : "This Player are Lose 😢😢😢"}
                    labelPlacement="end"
                  />
                  {index == playerNumber.length - 1 && (
                    <Fab
                      color="error"
                      aria-label="add"
                      size="small"
                      sx={{ alignSelf: "flex-end" }}
                      onClick={() => {
                        const newPlayerNumber = playerNumber.filter((item) => item.key !== index);
                        const newTempUsernameList = tempUsernameList.filter((item) => item.key !== index);
                        setTempUsernameList(newTempUsernameList);
                        setPlayerNumber(newPlayerNumber);
                      }}
                    >
                      <DeleteIcon />
                    </Fab>
                  )}
                </Box>
              </Paper>
            </Box>
          ))}

          <Fab
            color="primary"
            variant="extended"
            sx={{ height: "32px", width: "100%", marginBottom: "16px" }}
            onClick={() => {
              const newData: FormPlayerData = {
                username: "",
                description: "",
                isWin: false,
                score: 0,
                key: playerNumber.length,
              };
              setPlayerNumber((prev) => [...playerNumber, newData]);
              setTempUsernameList((prev) => [...tempUsernameList, { key: tempUsernameList.length + 1, username: "" }]);
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add More Player
          </Fab>

          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleCloseModal();
              }}
            >
              Cancel
            </Button>
            <Box sx={{ width: "4px" }} />
            <Button variant="contained" color="secondary" disabled>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
