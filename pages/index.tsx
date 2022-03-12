import type { NextPage } from "next";

import { AppBarComponent } from "./component/AppBarComponent";

import { useEffect, useState } from "react";
import axios from "axios";

import { BoardgameComponent } from "./component/BoardgameListComponent";
import { Box, LinearProgress, Skeleton, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { BoardgameDialog } from "./component/BoardgameDialog";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { FormDialog } from "./component/FormDialog";

export interface BoardgameData {
  gameName: String;
  thaiName: String;
  pictureUrl: string;
  price: Number;
  buyDate: String;
}

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
];

const Home: NextPage = () => {
  const [boardgames, setBoardgames] = useState<BoardgameData[]>([]);
  const [boardgame, setBoardgame] = useState<BoardgameData>({} as BoardgameData);

  const [modalStatus, setModalStatus] = useState(false);
  const [formModalStatus, setFormModalStatus] = useState(false);

  const handleOpenModal = () => setModalStatus(true);
  const handleCloseModal = () => setModalStatus(false);

  const handleOpenFormModal = () => setFormModalStatus(true);
  const handleCloseFormModal = () => setFormModalStatus(false);

  const onClickBoardgame = (item: BoardgameData) => {
    setBoardgame(item);
    handleOpenModal();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/demo/test1")
      .then((res) => {
        setBoardgames(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <AppBarComponent title="BoardGame" />
      <Box style={{ margin: "64px", marginTop: "32px" }}>
        <Box>
          <Skeleton variant="rectangular" style={{ height: "50vh", maxHeight: "400px" }} />
          <LinearProgress color="secondary" />
        </Box>
        <Box>
          <BoardgameComponent boardgameData={boardgames} onClickBoardgame={onClickBoardgame} />
        </Box>
      </Box>

      <Box />
      <BoardgameDialog boardgame={boardgame} handleCloseModal={handleCloseModal} modalStatus={modalStatus} />
      <FormDialog handleCloseModal={handleCloseFormModal} modalStatus={formModalStatus} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: "32px", right: "64px" }}
        icon={<SpeedDialIcon />}
        onClick={handleOpenFormModal}
      />
    </Box>
  );
};

export default Home;
