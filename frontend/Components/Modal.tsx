import React, { useState } from "react";
import Box from "@mui/material/Box";
import { H2 } from "./Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Wrapper, useMediaQuery } from "./Layouts";
import { Spacer } from "./Spacer";

export default function ModalComp({
  children,
  openModal,
  setOpenModal,
  title,
}: any) {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const handleClose = () => setOpenModal(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isResponsive ? "350px" : "600px",
    bgcolor: "#EDF0F9",
    borderRadius: "10px",
    // boxShadow: 24,
    p: 4,
  };
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
