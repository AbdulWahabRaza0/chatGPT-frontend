import React, { useState } from "react";
import Box from "@mui/material/Box";
import { H2 } from "./Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Wrapper } from "./Layouts";
import { Spacer } from "./Spacer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  bgcolor: "#333333",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComp({
  children,
  openModal,
  setOpenModal,
  title,
}: any) {
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Wrapper className="d-flex flex-row align-items-start justify-content-between">
            <H2 fontSize="27px">{title}</H2>
            <Wrapper
              pointer={true}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon style={{ fontSize: "36px" }} />
            </Wrapper>
          </Wrapper>
          <Spacer height="20px" />
          {children}
        </Box>
      </Modal>
    </div>
  );
}
