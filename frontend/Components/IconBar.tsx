import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Wrapper, useMediaQuery, Image } from "./Layouts";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import ChatIcon from "@mui/icons-material/Chat";
import { PrimaryButton } from "./Buttons";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import MenuIcon from "@mui/icons-material/Menu";
import { SideBarState } from "./Context/SideBar";
import { RecentState } from "./Context/Recents";
import { ImageState } from "./Context/ImageGen";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
const IconsArray = [
  // {
  //   icon: HomeIcon,
  // },
  {
    icon: ChatIcon,
  },
  {
    icon: ImageIcon,
  },
];
const IconBar = () => {
  const router = useRouter();

  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const { tabNo, setTabNo, openSideBar, setOpenSideBar }: any = SideBarState();
  const { activeRecent, setActiveRecent }: any = RecentState();
  const { setActiveImageGen, activeImageGen }: any = ImageState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const logoutHandle = () => {
    localStorage.clear();
    router.push("/signin");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Wrapper>
        <Wrapper
          height={isResponsive ? "30px" : "97vh"}
          width={isResponsive ? "98vw" : "90px"}
          borderRadius={isResponsive ? "11px" : "17px"}
          boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          bg="#081C34"
          className={`d-flex ${
            isResponsive
              ? "flex-row pt-4 pb-4 ps-2 pe-3"
              : "flex-column ps-4 pe-4 pt-4 pb-3 me-3"
          } align-items-center gap-4 justify-content-between`}
        >
          {isResponsive && (
            <Wrapper>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="d-flex flex-row align-items-center justify-content-start"
              >
                <Image
                  src="/assets/profileImg.jpg"
                  width={isResponsive ? "30px" : "50px"}
                  height={isResponsive ? "30px" : "50px"}
                  alt="profile"
                  className="img-fluid rounded-5"
                />
                /
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Wrapper>
          )}
          <Wrapper
            className={`d-flex ${
              isResponsive ? "flex-row" : "flex-column"
            } align-items-center gap-4 justify-content-start`}
          >
            {IconsArray.map((val, index) => {
              return (
                <>
                  <Wrapper
                    key={index}
                    pointer={true}
                    onClick={() => {
                      setTabNo(index);
                    }}
                    bg={tabNo === index ? "#6785FE" : ""}
                    p={isResponsive ? "" : "10px"}
                    ps={isResponsive ? "7px" : ""}
                    pe={isResponsive ? "7px" : ""}
                    pt={isResponsive ? "5px" : ""}
                    pb={isResponsive ? "5px" : ""}
                    //   p={tabNo === index ? "10px" : "10px"}
                    borderRadius={tabNo === index ? "10px" : ""}
                  >
                    <val.icon
                      style={{
                        color: tabNo === index ? "white" : "gray",
                        fontSize: isResponsive ? "16px" : "27px",
                      }}
                    />
                  </Wrapper>
                </>
              );
            })}
          </Wrapper>
          {isResponsive ? (
            <>
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
                  <MenuIcon
                    style={{
                      fontSize: "14px",
                      background: "white",
                      color: "black",
                    }}
                  />
                </PrimaryButton>
              </Wrapper>
            </>
          ) : (
            <>
              {" "}
              <Wrapper className="d-flex flex-column align-items-center justify-content-center gap-3">
                <Wrapper pointer={true} onClick={logoutHandle}>
                  <LogoutIcon
                    className="text-white"
                    style={{ fontSize: "31px" }}
                  />
                </Wrapper>
                <Wrapper>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="d-flex flex-row align-items-center justify-content-center"
                  >
                    <Image
                      src="/assets/profileImg.jpg"
                      width={isResponsive ? "30px" : "40px"}
                      height={isResponsive ? "30px" : "40px"}
                      alt="profile"
                      className="img-fluid rounded-5"
                    />
                    /
                  </Button>
                  {/* <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu> */}
                </Wrapper>
              </Wrapper>
            </>
          )}
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default IconBar;
