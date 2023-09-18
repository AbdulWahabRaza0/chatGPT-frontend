import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wrapper, Image, useMediaQuery } from "./Layouts";
import { Spacer } from "./Spacer";
import { PrimaryButton } from "./Buttons";
import { P } from "./Typography";
import ControlledAccordions from "./Accordion";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from "@mui/material/Tooltip";
import ModalComp from "./Modal";
import { PrimaryInput } from "./Inputs";
import { client } from "../services/client";
import { toast } from "react-toastify";
import Nav from "react-bootstrap/Nav";
import SearchIcon from "@mui/icons-material/Search";
import { RecentState } from "./Context/Recents";
import { PromptState } from "./Context/Prompts";
import { ImageState } from "./Context/ImageGen";
import { SideBarState } from "./Context/SideBar";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const Sidebar = () => {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const {
    allRecents,
    reloadRecent,
    setReloadRecent,
    loadingRecent,
    activeRecent,
    setActiveRecent,
    tabFlag,
    setTabFlag,
  }: any = RecentState();
  const { allPrompts, openModal, setOpenModal }: any = PromptState();
  const {
    allImageGens,
    reloadImageGen,
    setReloadImageGen,
    activeImageGen,
    setActiveImageGen,
  }: any = ImageState();
  const router = useRouter();
  // const [open, setOpen] = useState(true);
  const { openSideBar, setOpenSideBar, tabNo, setTabNo }: any = SideBarState();

  const [displayRecent, setDisplayRecent] = useState<any>([]);
  const [displayPrompt, setDisplayPrompt] = useState<any>([]);
  const [displayImageGen, setDisplayImageGen] = useState<any>([]);
  const [addRecModal, setAddRecModal] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const addChat = async () => {
    try {
      setLoading(true);
      const res = await client.post(
        "/recent/add",
        {
          title: chatTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setAddRecModal(false);
        setReloadRecent(!reloadRecent);
        toast.success("Recent Chat Created!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Invalid Error!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (e) {
      setLoading(false);
      console.log("This si error ", e);
      toast.error("Invalid Error!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const addImageGen = async () => {
    try {
      setLoading(true);
      const res = await client.post(
        "/image/add",
        {
          title: chatTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setAddRecModal(false);
        setReloadImageGen(!reloadImageGen);
        toast.success("Image Gen Created!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Invalid Error!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (e) {
      setLoading(false);
      console.log("This si error ", e);
      toast.error("Invalid Error!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    setDisplayRecent(allRecents);
  }, [allRecents, tabNo]);
  useEffect(() => {
    setDisplayPrompt(allPrompts);
  }, [allPrompts]);
  useEffect(() => {
    setDisplayImageGen(allImageGens);
  }, [allImageGens, tabNo]);

  useEffect(() => {
    const moveToSignIn = () => {
      router.push("/signin");
    };
    const temp = localStorage.getItem("gptToken");
    if (temp) {
      setToken(temp);
    } else {
      // moveToSignIn();
    }
  }, []);
  return (
    <>
      {addRecModal && (
        <>
          <ModalComp
            openModal={addRecModal}
            setOpenModal={setAddRecModal}
            title="Add Chat"
          >
            <Wrapper className="mt-3 d-flex flex-column align-items-start justify-content-start gap-4">
              <PrimaryInput
                type="text"
                placeholder="Chat Name"
                border="1px solid white"
                value={chatTitle}
                onChange={(e) => {
                  setChatTitle(e.target.value);
                }}
              />
              <PrimaryButton
                onClick={() => {
                  if (tabNo === 2) {
                    addImageGen();
                  } else if (tabNo === 1) {
                    addChat();
                  }
                }}
                width="auto"
                className="p-4 mt-3"
                fontColor="white"
                hover="#6785FF"
                bg="#6785FF"
              >
                {loading ? (
                  <div
                    className="spinner-border text-success"
                    role="status"
                  ></div>
                ) : (
                  "Add Chat"
                )}
              </PrimaryButton>
            </Wrapper>
          </ModalComp>
        </>
      )}
      {openSideBar ? (
        <>
          <Wrapper
            width={isResponsive ? "300px" : "350px"}
            height={isResponsive ? "100vh" : "95vh"}
            bg="white"
            // boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
            className={`d-flex flex-column justify-content-between align-items-between ps-2 pe-2 ${
              isResponsive ? "pt-3" : "pt-4"
            }`}
            position={isResponsive ? "absolute" : ""}
            left={isResponsive ? "0px" : ""}
            style={{ zIndex: 700 }}
          >
            <Wrapper id="top">
              {/* <Wrapper
                id="sidebar-header"
                className="d-flex flex-row align-items-center gap-2"
                width="100%"
              >
                <PrimaryButton
                  border="1px solid gray"
                  hover=" #444444"
                  fontColor="white"
                  padding="15px"
                  className="d-flex flex-row align-items-center justify-content-start gap-2"
                  onClick={() => {
                    setAddRecModal(true);
                    setActiveImageGen("");
                    setActiveRecent("");
                  }}
                >
                  <AddIcon style={{ fontSize: "14px" }} />
                  <P className="mb-0" fontSize="14px">
                    New Chat
                  </P>
                </PrimaryButton>
                <PrimaryButton
                  border="1px solid gray"
                  hover=" #444444"
                  fontColor="white"
                  width="auto"
                  style={{
                    maxWidth: "42px",
                    maxHeight: "42px",
                    minWidth: "42px",
                    minHeight: "42px",
                  }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <MenuIcon style={{ fontSize: "14px" }} />
                </PrimaryButton>
              </Wrapper> */}
              <Wrapper position="relative">
                <PrimaryInput
                  type="text"
                  style={{ paddingLeft: "40px" }}
                  placeholder="Search"
                  borderRadius="11px"
                  border="1px solid gray"
                  height="40px"
                  position="relative"
                />
                <SearchIcon
                  style={{ position: "absolute", left: "10px", top: "9.5px" }}
                />
              </Wrapper>
              <Spacer height="10px" />
              {/* <Wrapper
                width="100%"
                className="d-flex flex-row align-items-center justify-content-between pb-4"
              >
                <Wrapper
                  pointer={true}
                  borderRadius="7px"
                  width="47%"
                  border="0.1px solid white"
                  height="40px"
                  hover={"#333333"}
                  bg={tabFlag ? "" : "#444444"}
                  boxShadow={
                    tabFlag
                      ? ""
                      : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                  }
                  className="d-flex flex-row align-items-center justify-content-center ms-1"
                  onClick={() => {
                    setTabFlag(false);
                  }}
                >
                  Chat
                </Wrapper>
                <Wrapper
                  pointer={true}
                  borderRadius="7px"
                  hover={"#333333"}
                  bg={!tabFlag ? "" : "#444444"}
                  boxShadow={
                    !tabFlag
                      ? ""
                      : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                  }
                  border="0.1px solid white"
                  className="d-flex flex-row align-items-center justify-content-center me-1"
                  width="47%"
                  height="40px"
                  onClick={() => {
                    setTabFlag(true);
                  }}
                >
                  Image
                </Wrapper>
              </Wrapper> */}
              {/* <Wrapper style={{ overflow: "auto" }} height="67vh">
                {!tabFlag ? (
                  <Wrapper id="recent-chats" className="mb-3">
                    <Wrapper>
                      <ControlledAccordions
                        data={displayRecent}
                        title={"Recent Chats"}
                        mode="recent"
                      />
                    </Wrapper>
                  </Wrapper>
                ) : (
                  <Wrapper id="dall-e" className="mb-3">
                    <Wrapper>
                      <ControlledAccordions
                        data={displayImageGen}
                        title={"Image Gen"}
                        mode="image"
                      />
                    </Wrapper>
                  </Wrapper>
                )}

                <Wrapper id="prompts" className="mb-3">
                  <Wrapper>
                    <ControlledAccordions
                      data={displayPrompt}
                      title={"Prompts"}
                      mode="prompts"
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper> */}

              {/* Different way of toggle  */}
              {tabNo === 0 ? (
                <>
                  <Tabs value={tabFlag ? 0 : null}>
                    <Tab
                      onClick={() => {
                        setTabFlag(true);
                      }}
                      label={
                        <span
                          style={{ fontSize: isResponsive ? "12px" : "14px" }}
                        >
                          Prompts
                        </span>
                      }
                    />
                  </Tabs>
                </>
              ) : (
                <>
                  <Tabs value={tabFlag ? 1 : 0}>
                    {tabNo === 1 && (
                      <Tab
                        onClick={() => {
                          setTabFlag(false);
                        }}
                        label={
                          <span
                            style={{ fontSize: isResponsive ? "12px" : "14px" }}
                          >
                            Recent Chats
                          </span>
                        }
                      />
                    )}
                    {tabNo === 2 && (
                      <Tab
                        onClick={() => {
                          setTabFlag(false);
                        }}
                        label={
                          <span
                            style={{ fontSize: isResponsive ? "12px" : "14px" }}
                          >
                            Recent Images
                          </span>
                        }
                      />
                    )}

                    <Tab
                      onClick={() => {
                        setTabFlag(true);
                      }}
                      label={
                        <span
                          style={{ fontSize: isResponsive ? "12px" : "14px" }}
                        >
                          Prompts
                        </span>
                      }
                    />
                  </Tabs>
                </>
              )}

              <Spacer height="20px" />

              {/* <Wrapper
                width="100%"
                className="d-flex flex-row align-items-center justify-content-start gap-2 pb-4"
              >
           
                {(tabNo === 1 || tabNo === 2) && (
                  <Wrapper
                    pointer={true}
                    borderRadius="7px"
                    width="90px"
                    border="0.1px solid white"
                    height="35px"
                    // hover={"#333333"}
                    bg={tabFlag ? "#EDF0F9" : "#6785FE"}
                    color={tabFlag ? "black" : "white"}
                    boxShadow={
                      tabFlag
                        ? ""
                        : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                    }
                    className="d-flex flex-row align-items-center justify-content-center p-2"
                    onClick={() => {
                      setTabFlag(false);
                    }}
                  >
                    {tabNo === 1 && "Chat "}
                    {tabNo === 2 && "Images"}
                  </Wrapper>

                )}

                <Wrapper
                  pointer={true}
                  borderRadius="7px"
                  // hover={"#333333"}
                  width="90px"
                  bg={!tabFlag ? "#EDF0F9" : "#6785FE"}
                  color={!tabFlag ? "black" : "white"}
                  boxShadow={
                    !tabFlag
                      ? ""
                      : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                  }
                  border="0.1px solid white"
                  className="d-flex flex-row align-items-center justify-content-center"
                  height="35px"
                  onClick={() => {
                    setTabFlag(true);
                  }}
                >
                  Prompts
                </Wrapper>
              </Wrapper> */}

              {/* New Way to display Data  */}
              <Wrapper
                style={{ overflow: "auto" }}
                height={isResponsive ? "76vh" : "73vh"}
              >
                {tabNo === 1 && !tabFlag && (
                  <Wrapper id="recent-chats" className="mb-3">
                    <Wrapper>
                      <ControlledAccordions
                        data={displayRecent}
                        title={"Recent Chats"}
                        mode="recent"
                      />
                    </Wrapper>
                  </Wrapper>
                )}
                {tabNo === 2 && !tabFlag && (
                  <Wrapper id="dall-e" className="mb-3">
                    <Wrapper>
                      <ControlledAccordions
                        data={displayImageGen}
                        title={"Image Gen"}
                        mode="image"
                      />
                    </Wrapper>
                  </Wrapper>
                )}
                {tabFlag && (
                  <Wrapper id="prompts" className="mb-3">
                    <Wrapper>
                      <ControlledAccordions
                        data={displayPrompt}
                        title={"Prompts"}
                        mode="prompts"
                      />
                    </Wrapper>
                  </Wrapper>
                )}
              </Wrapper>
            </Wrapper>

            {/* <Wrapper
              id="bottom"
              className="d-flex flex-column align-items-center justify-content-end gap-2"
            >
              <Wrapper bg="gray" width="100%" height="1px"></Wrapper>
              <Wrapper
                height="50px"
                width="220px"
                className="d-flex flex-row align-items-center justify-content-between"
              >
                <Wrapper className="d-flex flex-row align-items-center gap-2">
                  <Image
                    src="/assets/profile.webp"
                    alt="profile"
                    width="30px"
                    height="30px"
                  />
                  <P className="mb-0" fontSize="14px">
                    Abdul Wahab
                  </P>
                </Wrapper>
                <Wrapper pointer={true}>
                  <Tooltip title="more">
                    <MoreHorizIcon style={{ fontSize: "14px" }} />
                  </Tooltip>
                </Wrapper>
              </Wrapper>
            </Wrapper> */}
          </Wrapper>
        </>
      ) : (
        <>
          {/* <Wrapper
            style={{ zIndex: 100 }}
            position="fixed"
            top="20px"
            left="20px"
          >
            <PrimaryButton
              border="1px solid gray"
              hover=" #444444"
              fontColor="white"
              width="auto"
              style={{
                maxWidth: "42px",
                maxHeight: "42px",
                minWidth: "42px",
                minHeight: "42px",
              }}
              onClick={() => {
                setOpenSideBar(true);
              }}
            >
              <MenuIcon style={{ fontSize: "14px" }} />
            </PrimaryButton>
          </Wrapper> */}
        </>
      )}
    </>
  );
};

export default Sidebar;
