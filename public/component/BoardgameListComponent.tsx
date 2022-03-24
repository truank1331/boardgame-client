import { Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import { BoardgameApiData } from "../../pages";
import { useEffect, useState } from "react";

interface BoardgameProps {
  boardgameData: BoardgameApiData[];
  onClickBoardgame: Function;
}

export function BoardgameComponent(props: BoardgameProps) {
  const boardgames = props.boardgameData;
  const onClickBoardgame = props.onClickBoardgame;

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 560) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <Swiper
      slidesPerView={isMobile ? 1 : 5}
      spaceBetween={30}
      slidesPerGroup={isMobile ? 1 : 4}
      loop={true}
      navigation={true}
      modules={[Pagination, Navigation]}
      style={{ marginTop: 32 }}
    >
      {boardgames.length > 0 ? (
        boardgames.map((item: BoardgameApiData, index) => (
          <SwiperSlide key={index}>
            <Card
              key={5}
              sx={{ maxWidth: 500, marginBottom: "16px" }}
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
                    {item.thaiName}
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
