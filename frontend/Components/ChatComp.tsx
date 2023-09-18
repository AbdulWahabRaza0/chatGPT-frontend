import React, { useState } from "react";
import Chat from "./Chat";
import { Wrapper, Image, useMediaQuery } from "./Layouts";
import { P } from "./Typography";
import { PrimaryButton } from "./Buttons";
import MenuIcon from "@mui/icons-material/Menu";
import { SideBarState } from "./Context/SideBar";

const ChatComp = () => {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const { openSideBar, setOpenSideBar }: any = SideBarState();

  return (
    <>
      <Wrapper
        width="100%"
        className="d-flex flex-column align-items-center justify-content-end"
      >
        {!isResponsive && (
          <Wrapper
            height={isResponsive ? "8vh" : "10vh"}
            width={isResponsive ? "100%" : "93%"}
            ps={isResponsive ? "15px" : ""}
            pe={isResponsive ? "20px" : ""}
            className={`d-flex flex-row align-items-center justify-content-between ${
              isResponsive ? "" : "ps-3 pe-3"
            } `}
          >
            <Wrapper
              className={`d-flex flex-row align-items-center ${
                isResponsive ? "gap-1" : "gap-2"
              }`}
            >
              <Image
                src="/assets/profileImg.jpg"
                width={isResponsive ? "40px" : "60px"}
                height={isResponsive ? "40px" : "60px"}
                alt="profile"
                className="img-fluid"
              />

              <P
                fontSize={isResponsive ? "16px" : "18px"}
                weight="700"
                className="mb-0"
              >
                Abdul Wahab Raza
              </P>
            </Wrapper>

            <Wrapper>
              <PrimaryButton
                border="1px solid gray"
                bg="white"
                fontColor="black"
                width="auto"
                style={{
                  maxWidth: isResponsive ? "30px" : "50px",
                  maxHeight: isResponsive ? "30px" : "50px",
                  minWidth: isResponsive ? "30px" : "50px",
                  minHeight: isResponsive ? "30px" : "50px",
                }}
                onClick={() => {
                  setOpenSideBar(!openSideBar);
                }}
              >
                <MenuIcon style={{ fontSize: "14px" }} />
              </PrimaryButton>
            </Wrapper>
          </Wrapper>
        )}

        <Wrapper
          className="d-flex flex-row align-items-center justify-content-center"
          width="95%"
        >
          <Chat />
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default ChatComp;
