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
        <Wrapper
          height={isResponsive ? "8vh" : "10vh"}
          width={isResponsive ? "100%" : "90%"}
          ps={isResponsive ? "10px" : ""}
          pe={isResponsive ? "10px" : ""}
          className={`d-flex flex-row align-items-center justify-content-between ${
            isResponsive ? "" : "ps-4 pe-4"
          } `}
        >
          <Wrapper className="d-flex flex-row align-items-center gap-3">
            <Image
              src="/assets/profileImg.jpg"
              width={isResponsive ? "40px" : "70px"}
              height={isResponsive ? "40px" : "70px"}
              alt="profile"
              className="img-fluid"
            />
            <P
              fontSize={isResponsive ? "16px" : "21px"}
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
                maxWidth: isResponsive ? "30px" : "42px",
                maxHeight: isResponsive ? "30px" : "42px",
                minWidth: isResponsive ? "30px" : "42px",
                minHeight: isResponsive ? "30px" : "42px",
              }}
              onClick={() => {
                setOpenSideBar(!openSideBar);
              }}
            >
              <MenuIcon style={{ fontSize: "14px" }} />
            </PrimaryButton>
          </Wrapper>
        </Wrapper>
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
