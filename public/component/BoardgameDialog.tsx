import { Box, Chip, CircularProgress, Grid, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BoardgameApiData, UserApiData } from "../../pages";
import { AvartarComponent, stringToColor } from "./Avatar";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BoardgameDialogProps {
  modalStatus: boolean;
  handleCloseModal: Function;
  boardgame: BoardgameApiData;
  users: UserApiData[];
}

export function BoardgameDialog(props: BoardgameDialogProps) {
  const modalStatus = props.modalStatus;
  const handleCloseModal = props.handleCloseModal;
  const users = props.users;
  const boardgame = props.boardgame;
  const [isLoading, setIsLoading] = useState(true);

  const [chartData, setChartData] = useState<ChartData>();

  useEffect(() => {
    if (users.length > 0) {
      setChartData({
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: users[0].username,
            data: [60, 40, 80, 74, 5, 6, 9],
            borderColor: stringToColor(users[0].username),
            backgroundColor: stringToColor(users[0].username),
          },
          {
            label: users[1].username,
            data: [40, 50, 80, 74, 58, 67, 92],
            borderColor: stringToColor(users[1].username),
            backgroundColor: stringToColor(users[1].username),
          },
          {
            label: users[2].username,
            data: [40, 5, 44, 74, 58, 70, 60],
            borderColor: stringToColor(users[2].username),
            backgroundColor: stringToColor(users[2].username),
          },
          {
            label: users[3].username,
            data: [40, 50, 80, 74, 58, 70, 70],
            borderColor: stringToColor(users[3].username),
            backgroundColor: stringToColor(users[3].username),
          },
        ],
      });
      setIsLoading(false);
    }
  }, [users]);

  return (
    <Modal
      open={modalStatus}
      onClose={() => {
        handleCloseModal();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid
        container
        spacing={1}
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "row-reverse",
          flex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          width: "80%",
          maxHeight: "100%",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            width: "50%",
          }}
        >
          <Box sx={{ marginBottom: "8px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {boardgame.gameName}
              </Typography>
              <Chip label="All" color="success" sx={{ marginLeft: "8px" }} />
            </Box>

            <Typography>{boardgame.thaiName}</Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ display: "flex", flexDirection: "row", height: "fit-content" }}>
            {users.map((user, index) => (
              <AvartarComponent name={user.username} key={index} />
            ))}
          </Stack>

          {isLoading ? (
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
          ) : (
            <Box
              sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: "16px",
                height: "80%",
              }}
            >
              <Box
                sx={{
                  alignSelf: "center",
                  display: "flex",
                  flex: 1,
                  width: "100%",
                  height: "fit-content",
                }}
              >
                <Line
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                  // @ts-ignore
                  data={chartData}
                />
              </Box>
            </Box>
          )}
          <Grid
            container
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Grid item lg={4} sm={6} xs={12}>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                เล่นล่าสุดเมื่อ 01/01/1999
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                {". "}
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                เวลาเล่นทั้งสิ้น X ชม.
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                เวลาเล่นเฉลี่ย X ชม.
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                เล่นครั้งแรกเมื่อ 01/01/1999
              </Typography>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                จำนวน X เกม
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                แต้มสูงสุด X คะแนน
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                แต้มต่ำสุด X คะแนน
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                แต้มเฉลี่ย X คะแนน
              </Typography>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                จำนวน X เกม
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                แต้มสูงสุด X คะแนน
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                แต้มต่ำสุด X คะแนน
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                แต้มเฉลี่ย X คะแนน
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          lg={6}
          item
          sx={{
            display: "flex",
            flex: 1,
            width: "fit-content",
            height: "fit-content",
            maxHeight: "50%",
            flexDirection: "column",
          }}
        >
          <img
            src={boardgame.pictureUrl}
            loading="lazy"
            width="fit-content"
            height="fit-content"
            style={{ maxWidth: "fit-content", maxHeight: "fit-content" }}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
