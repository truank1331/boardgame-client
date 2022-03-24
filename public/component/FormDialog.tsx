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
import { BoardgameApiData } from "../../pages";

interface FormDialogProps {
  modalStatus: boolean;
  handleCloseModal: Function;
  gameList: BoardgameApiData[];
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
  playDate: Date | null;
  playerData: FormPlayerData[];
}
interface tempUsernameListData {
  key: number;
  username: String;
}

export function FormDialog(props: FormDialogProps) {
  const modalStatus = props.modalStatus;
  const handleCloseModal = props.handleCloseModal;

  const [boardgameDropdownList, setBoardgameDropdownList] = useState<string[]>([]);
  const [playerDropdownList, setPlayerDropdownList] = useState<string[]>([]);

  const [playerNumber, setPlayerNumber] = useState<FormPlayerData[]>([
    { username: "", description: "", isWin: false, score: 0, key: 0 },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedBoardgame, setSelectedBoardgame] = useState<String>("");

  const [tempUsernameList, setTempUsernameList] = useState<tempUsernameListData[]>([]);

  const shouldSubmit = () => {
    if (selectedBoardgame.length == 0) return true;

    if (playerNumber.filter((item) => item.username.length == 0).length > 0) return true;

    if (playerNumber.filter((item) => item.score <= 0).length > 0) return true;

    return false;
  };

  useEffect(() => {
    if (props.gameList.length > 0) {
      const tempGameList = props.gameList.map((item) => {
        return `${item.gameName} - ${item.thaiName}`;
      });
      setBoardgameDropdownList(tempGameList);
    }
  }, [props.gameList]);

  useEffect(() => {
    if (props.playerList.length > 0) {
      const tempPlayerListList = props.playerList.map((item) => {
        return `${item.username}`;
      });
      setPlayerDropdownList(tempPlayerListList);
    }
  }, [props.playerList]);

  return (
    <Modal
      open={modalStatus}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {
        handleCloseModal();
      }}
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
          width: "90%",
          height: "fit-content",
          maxHeight: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Box sx={{ marginLeft: "16px", width: "100%" }}>
          <Box sx={{ marginBottom: "8px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Add Game History
              </Typography>
              <Chip label={`${playerNumber.length} Players`} color="secondary" sx={{ marginLeft: "8px" }} />
            </Box>

            <Typography>เพิ่มประวัติการเล่น</Typography>
          </Box>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={boardgameDropdownList}
            sx={{ width: "100%", marginBottom: "16px" }}
            renderInput={(params) => <TextField {...params} label="Game" />}
            value={selectedBoardgame}
            onChange={(event, value) => {
              setSelectedBoardgame(value || "");
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>

          <Paper
            elevation={0}
            style={{ maxHeight: "50%", overflow: "auto", padding: "8px", marginTop: "16px", marginBottom: "16px" }}
          >
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
                      id={`combo-box-demo`}
                      options={playerDropdownList.filter(
                        (item) => !tempUsernameList.find((ele) => ele.username == item)
                      )}
                      sx={{ width: "70%", marginBottom: "8px", marginRight: "8px" }}
                      value={playerNumber.find((item) => item.key == index)?.username || ""}
                      onChange={(event, value) => {
                        const oldTempUsernameList = tempUsernameList.filter((item) => item.key !== index);
                        const newData: tempUsernameListData = { key: index, username: value || "" };
                        setTempUsernameList((prev) => [...oldTempUsernameList, newData]);

                        const oldValue = playerNumber.find((item) => item.key == index) || ({} as FormPlayerData);
                        const newPlayerNumber: FormPlayerData = {
                          description: oldValue.description,
                          isWin: oldValue.isWin,
                          key: oldValue.key,
                          score: oldValue.score,
                          username: value || "",
                        };
                        const oldPlayerNumber = playerNumber.filter((item) => item.key !== index);
                        setPlayerNumber((prev) => [...oldPlayerNumber, newPlayerNumber]);
                      }}
                      renderInput={(params) => <TextField {...params} label="Player Name" />}
                    />
                    <TextField
                      label="Score"
                      variant="outlined"
                      sx={{ width: "30%", marginBottom: "8px" }}
                      value={playerNumber.find((item) => item.key == index)?.score || ""}
                      onChange={(event) => {
                        const oldValue = playerNumber.find((item) => item.key == index) || ({} as FormPlayerData);
                        const newPlayerNumber: FormPlayerData = {
                          description: oldValue.description,
                          isWin: oldValue.isWin,
                          key: oldValue.key,
                          score: +event.target.value,
                          username: oldValue.username,
                        };
                        const oldPlayerNumber = playerNumber.filter((item) => item.key !== index);
                        setPlayerNumber((prev) => [...oldPlayerNumber, newPlayerNumber]);
                      }}
                    />
                  </Box>
                  <TextField
                    label="Description"
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "8px" }}
                    value={playerNumber.find((item) => item.key == index)?.description || ""}
                    onChange={(event) => {
                      const oldValue = playerNumber.find((item) => item.key == index) || ({} as FormPlayerData);
                      const newPlayerNumber: FormPlayerData = {
                        description: event.target.value,
                        isWin: oldValue.isWin,
                        key: oldValue.key,
                        score: oldValue.score,
                        username: oldValue.username,
                      };
                      const oldPlayerNumber = playerNumber.filter((item) => item.key !== index);
                      setPlayerNumber((prev) => [...oldPlayerNumber, newPlayerNumber]);
                    }}
                  />
                  <Box sx={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={playerNumber.find((item) => item.key == index)?.isWin || false}
                          value={playerNumber.find((item) => item.key == index)?.isWin || false}
                          onChange={() => {
                            const oldValue = playerNumber.find((item) => item.key == index) || ({} as FormPlayerData);
                            const newPlayerNumber: FormPlayerData = {
                              description: oldValue.description,
                              isWin: !oldValue.isWin,
                              key: oldValue.key,
                              score: oldValue.score,
                              username: oldValue.username,
                            };
                            const oldPlayerNumber = playerNumber.filter((item) => item.key !== index);
                            setPlayerNumber((prev) => [...oldPlayerNumber, newPlayerNumber]);
                          }}
                        />
                      }
                      label={
                        playerNumber.find((item) => item.key == index)?.isWin
                          ? "This Player are Winner 👑👑👑 "
                          : "This Player are Lose 😢😢😢"
                      }
                      labelPlacement="end"
                    />
                    {playerNumber.length > 1 && index == playerNumber.length - 1 && (
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
          </Paper>
          {playerNumber.length + 1 <= playerDropdownList.length && (
            <Fab
              color="success"
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
                setTempUsernameList((prev) => [
                  ...tempUsernameList,
                  { key: tempUsernameList.length + 1, username: "" },
                ]);
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add More Player
            </Fab>
          )}

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
            <Button
              variant="contained"
              color="secondary"
              disabled={shouldSubmit()}
              onClick={() => {
                const submitData: FormSubmitData = {
                  gameName: selectedBoardgame,
                  playDate: selectedDate,
                  playerData: playerNumber,
                };
                console.log(submitData);
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
