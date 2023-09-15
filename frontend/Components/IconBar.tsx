import React from "react";
import { Wrapper, useMediaQuery } from "./Layouts";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import ChatIcon from "@mui/icons-material/Chat";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { SideBarState } from "./Context/SideBar";
import { RecentState } from "./Context/Recents";
import { ImageState } from "./Context/ImageGen";
const IconsArray = [
  {
    icon: HomeIcon,
  },
  {
    icon: ChatIcon,
  },
  {
    icon: ImageIcon,
  },
];
const IconBar = () => {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const { tabNo, setTabNo }: any = SideBarState();
  const { activeRecent, setActiveRecent }: any = RecentState();
  const { setActiveImageGen, activeImageGen }: any = ImageState();
  return (
    <>
      <Wrapper>
        <Wrapper
          height={isResponsive ? "30px" : "95vh"}
          width={isResponsive ? "96vw" : "90px"}
          borderRadius={isResponsive ? "11px" : "17px"}
          bg="#081C34"
          className={`d-flex ${
            isResponsive
              ? "flex-row justify-content-start p-4"
              : "flex-column ps-4 pe-4 pt-5 pb-5 justify-content-start me-3"
          } align-items-center gap-4 `}
        >
          {IconsArray.map((val, index) => {
            return (
              <>
                <Wrapper
                  key={index}
                  pointer={true}
                  onClick={() => {
                    if (index === 0 || index === 3) {
                      setActiveImageGen("");
                      setActiveRecent("");
                    }
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
      </Wrapper>
    </>
  );
};

export default IconBar;
