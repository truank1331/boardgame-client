import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import { BoardgameData } from "..";
import { useEffect } from "react";

interface BoardgameProps {
  boardgameData: BoardgameData[];
  onClickBoardgame: Function;
}
export function BoardgameComponent(props: BoardgameProps) {
  const boardgames = props.boardgameData;
  const onClickBoardgame = props.onClickBoardgame;

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={30}
      slidesPerGroup={4}
      loop={true}
      navigation={true}
      modules={[Pagination, Navigation]}
      style={{ marginTop: 32 }}
    >
      {boardgames.length > 0 ? (
        boardgames.map((item: BoardgameData, index) => (
          <SwiperSlide key={index}>
            <Card
              key={5}
              sx={{ maxWidth: 500 }}
              style={{ marginBottom: "16px" }}
              onClick={() => {
                onClickBoardgame(item);
              }}
            >
              <CardActionArea>
                <CardMedia component="img" height="200" image={item.pictureUrl} alt="green iguana" />

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.gameName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))
      ) : (
        <>
          <SwiperSlide style={{ width: "330px", height: "290px" }}>
            <Skeleton variant="text" width={330} />
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="rectangular" width={330} height={290} />
          </SwiperSlide>
          <SwiperSlide style={{ width: "330px", height: "290px" }}>
            <Skeleton variant="text" width={330} />
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="rectangular" width={330} height={290} />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  );
}
