import type { NextPage } from "next";
import Head from "next/head";

import { AppBarComponent } from "./component/AppBarComponent";
import styled from "styled-components";

import { useEffect, useState } from "react";
import axios from "axios";

import { BoardgameComponent } from "./component/BoardgameListComponent";
import { Avatar, Box, LinearProgress, Modal, Skeleton, Typography } from "@mui/material";
import { BoardgameDialog } from "./component/BoardgameDialog";

export interface BoardgameData {
  gameName: String;
  thaiName: String;
  pictureUrl: string;
  price: Number;
  buyDate: String;
}

const Home: NextPage = () => {
  const [boardgames, setBoardgames] = useState<BoardgameData[]>([]);
  const [boardgame, setBoardgame] = useState<BoardgameData>({} as BoardgameData);
  const [modalStatus, setModalStatus] = useState(false);

  const handleOpenModal = () => setModalStatus(true);
  const handleCloseModal = () => setModalStatus(false);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <AppBarComponent title="Home" />
      <div style={{ margin: "64px", marginTop: "32px" }}>
        <>
          <Skeleton variant="rectangular" style={{ height: "50vh", maxHeight: "400px" }} />
          <LinearProgress color="secondary" />
        </>
        <>
          <BoardgameComponent boardgameData={boardgames} onClickBoardgame={onClickBoardgame} />
        </>
      </div>

      <div />
      <BoardgameDialog
        boardgame={boardgame}
        handleCloseModal={handleCloseModal}
        modalStatus={modalStatus}
      ></BoardgameDialog>
    </div>
  );
};

export default Home;
