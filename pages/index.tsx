import type { NextPage } from "next";

import { AppBarComponent } from "../public/component/AppBarComponent";

import { useEffect, useState } from "react";
import axios from "axios";

import { BoardgameComponent } from "../public/component/BoardgameListComponent";
import { Box, LinearProgress, Skeleton, SpeedDial, SpeedDialIcon } from "@mui/material";
import { BoardgameDialog } from "../public/component/BoardgameDialog";

import { FormDialog } from "../public/component/FormDialog";

export interface BoardgameApiData {
  gameName: String;
  thaiName: String;
  pictureUrl: string;
  price: Number;
  buyDate: String;
}
export interface UserApiData {
  username: String;
  role: String;
  email: String;
  password: String;
}

const SERVER_PRIVATE = "192.168.1.103";

const Home: NextPage = () => {
  const [boardgames, setBoardgames] = useState<BoardgameApiData[]>([]);
  const [histories, setHistories] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [users, setUsers] = useState<UserApiData[]>([]);

  const [boardgame, setBoardgame] = useState<BoardgameApiData>({} as BoardgameApiData);

  const [modalStatus, setModalStatus] = useState(false);
  const [formModalStatus, setFormModalStatus] = useState(false);

  const handleOpenModal = () => setModalStatus(true);
  const handleCloseModal = () => setModalStatus(false);

  const handleOpenFormModal = () => setFormModalStatus(true);
  const handleCloseFormModal = () => setFormModalStatus(false);

  const onClickBoardgame = (item: BoardgameApiData) => {
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

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <AppBarComponent title="BoardGame" />
      <Box style={{ margin: "32px", marginTop: "32px" }}>
        <Box>
          <Skeleton variant="rectangular" style={{ height: "40vh", maxHeight: "30%" }} />
          <LinearProgress color="secondary" />
        </Box>
        <Box>
          <BoardgameComponent boardgameData={boardgames} onClickBoardgame={onClickBoardgame} />
        </Box>
      </Box>
      <Box />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: "32px", right: "64px" }}
        icon={<SpeedDialIcon />}
        onClick={handleOpenFormModal}
      />
      <BoardgameDialog
        boardgame={boardgame}
        handleCloseModal={handleCloseModal}
        modalStatus={modalStatus}
        users={users}
      />
      <FormDialog
        handleCloseModal={handleCloseFormModal}
        modalStatus={formModalStatus}
        gameList={boardgames}
        playerList={users}
      />
    </Box>
  );
};

export default Home;
