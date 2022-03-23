import type { NextPage } from "next";

import { AppBarComponent } from "../public/component/AppBarComponent";

import { useEffect, useState } from "react";
import axios from "axios";

import { BoardgameComponent } from "../public/component/BoardgameListComponent";
import { Box, LinearProgress, Skeleton, SpeedDial, SpeedDialIcon } from "@mui/material";
import { BoardgameDialog } from "../public/component/BoardgameDialog";

import { FormDialog } from "../public/component/FormDialog";

export interface BoardgameData {
  gameName: String;
  thaiName: String;
  pictureUrl: string;
  price: Number;
  buyDate: String;
}

const SERVER_PRIVATE = "192.168.1.102";

const Home: NextPage = () => {
  const [boardgames, setBoardgames] = useState<BoardgameData[]>([]);
  const [histories, setHistories] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

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
      .get(`http://${SERVER_PRIVATE}:8080/boardgame/list`)
      .then((res) => {
        setBoardgames(res.data);
      })
      .catch(() => {});

    axios
      .get(`http://${SERVER_PRIVATE}:8080/history/list`)
      .then((res) => {
        setHistories(res.data);
      })
      .catch(() => {});

    axios
      .get(`http://${SERVER_PRIVATE}:8080/score/list`)
      .then((res) => {
        setScores(res.data);
      })
      .catch(() => {});

    axios
      .get(`http://${SERVER_PRIVATE}:8080/user/list`)
      .then((res) => {
        setUsers(res.data);
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
      <FormDialog
        handleCloseModal={handleCloseFormModal}
        modalStatus={formModalStatus}
        gameList={boardgames}
        playerList={users}
      />
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
