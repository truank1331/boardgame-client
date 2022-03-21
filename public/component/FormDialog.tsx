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
  Tab,
  Tabs,
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
export function FormDialog(props: FormDialogProps) {
  const modalStatus = props.modalStatus;
  const handleCloseModal = props.handleCloseModal;

  const [gameList, setGameList] = useState<string[]>([]);
  const [playerList, setPlayerList] = useState<string[]>([]);

  const [playerNumber, setPlayerNumber] = useState<any[]>([{}]);

  const [value, setValue] = useState<Date | null>(new Date());
  const [isWin, setIsWin] = useState<boolean>(false);

  const [panel, setPanel] = useState<string>("1");

  const handleChangePanel = (event: React.SyntheticEvent, newValue: string) => {
    console.log("🚀 ~ newValue", newValue);
    setPanel(newValue);
  };

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
      console.log("🚀 ~ props.playerList", props.playerList);
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
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={panel}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChangePanel} aria-label="lab API tabs example">
                  <Tab label="Item One" value="1" />
                  <Tab icon={<AddIcon />} aria-label="person" onClick={() => {}} />
                </TabList>
              </Box>
              <TabPanel value="1">
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
                      options={playerList}
                      sx={{ width: "70%", marginBottom: "8px", marginRight: "8px" }}
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
                    <Fab color="error" aria-label="add" size="small" sx={{ alignSelf: "flex-end" }}>
                      <DeleteIcon />
                    </Fab>
                  </Box>
                </Paper>
              </TabPanel>
            </TabContext>
          </Box>

          <Fab
            color="primary"
            variant="extended"
            sx={{ height: "32px", width: "100%", marginBottom: "16px" }}
            onClick={() => {
              setPlayerNumber((prev) => [...playerNumber, {}]);
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
