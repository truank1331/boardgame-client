import { useState } from "react";

import isWeekend from "date-fns/isWeekend";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { Box, Button, Chip, Modal, Stack, TextField, Typography } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import DatePicker from "@mui/lab/DatePicker";

interface FormDialogProps {
  modalStatus: boolean;
  handleCloseModal: Function;
}
export function FormDialog(props: FormDialogProps) {
  const modalStatus = props.modalStatus;
  const handleCloseModal = props.handleCloseModal;

  const [value, setValue] = useState<Date | null>(new Date());

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
                Form
              </Typography>
              <Chip label="Play Always" color="warning" sx={{ marginLeft: "8px" }} />
            </Box>

            <Typography>ฟอร์มนะ</Typography>
          </Box>

          <Box>
            <TextField fullWidth label="fullWidth" id="fullWidth" style={{ marginBottom: "16px" }} />
          </Box>
          <Box>
            <TextField fullWidth label="fullWidth" id="fullWidth" style={{ marginBottom: "16px" }} />
          </Box>
          <Box>
            <TextField fullWidth label="fullWidth" id="fullWidth" style={{ marginBottom: "16px" }} />
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

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
            <Button variant="contained" color="secondary">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
