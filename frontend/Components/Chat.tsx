import React, { useState, useEffect } from "react";
import { Wrapper, useMediaQuery, Image } from "./Layouts";
import { PrimaryInput, PrimaryTextarea } from "./Inputs";
import SendIcon from "@mui/icons-material/Send";
import { P } from "./Typography";
import Tooltip from "@mui/material/Tooltip";
import ArchiveIcon from "@mui/icons-material/Archive";
import { PrimaryButton } from "./Buttons";
import ModalComp from "./Modal";
import { RecentState } from "./Context/Recents";
import { PromptState } from "./Context/Prompts";
import { ImageState } from "./Context/ImageGen";
import { SideBarState } from "./Context/SideBar";
import {
  reloadRecentMessageById,
  reloadImageMessageById,
} from "./Logic/globalLogic";
import { client } from "../services/client";
import { toast } from "react-toastify";
import RecordAudio from "./RecordAudio";

const Chat = () => {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });
  const {
    allMessages,
    reloadRecent,
    setReloadRecent,
    activeRecent,
    setActiveRecent,
    recordedText,
    setRecordedText,
    recordLoading,
    tabFlag,
    allRecents,
  }: any = RecentState();
  const {
    allPrompts,
    reloadPrompt,
    setReloadPrompt,
    openModal,
    setOpenModal,
    activePrompt,
    setActivePrompt,
  }: any = PromptState();
  const {
    allImageGens,
    activeImageGen,
    allMessagesGen,
    reloadImageGen,
    setReloadImageGen,
    setActiveImageGen,
  }: any = ImageState();
  const { tabNo, setTabNo }: any = SideBarState();
  const [displayMessages, setDisplayMessages] = useState([]);
  const [addProModal, setAddProModal] = useState(false);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptMessage, setPromptMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPromptBtn, setLoadingPromptBtn] = useState(false);
  const [token, setToken] = useState("");
  const [textHeight, setTextHeight] = useState(50);
  const addMessage = async () => {
    if (!message || loading) {
      return;
    }
    try {
      setLoading(true);

      const res = await client.post(
        "/recent/message/add",
        {
          id: activeRecent,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setReloadRecent(!reloadRecent);
        if (res.data.newAddition) {
          setActiveRecent(res.data.saved._id);
        }
        setMessage("");
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
      console.log("This is error ", e);
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
  const addImage = async () => {
    if (!message || loading) {
      return;
    }
    try {
      setLoading(true);

      const res = await client.post(
        "/image/message/add",
        {
          id: activeImageGen,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      if (res.status === 201) {
        setReloadImageGen(!reloadImageGen);

        if (res.data.newAddition) {
          setActiveImageGen(res.data.saved._id);
        }
        setMessage("");
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
      console.log("This is error ", e);
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
  const addPrompt = async () => {
    if (!promptTitle || !promptMessage) {
      toast.error("Fill all the fields!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      setLoadingPromptBtn(true);
      const res = await client.post(
        "/prompt/add",
        {
          category: promptTitle,
          text: promptMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingPromptBtn(false);

      if (res.status === 201) {
        setReloadPrompt(!reloadPrompt);
        setPromptMessage("");
        setPromptTitle("");
        setMessage("");
        setActivePrompt("");
        setAddProModal(false);
        if (openModal) {
          setOpenModal(false);
        }
        toast.success("Prompt Added!", {
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
        toast.error("Prompt already present!", {
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
      setLoadingPromptBtn(false);

      console.log("This is error ", e);
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
  const updatePrompt = async () => {
    if (!promptTitle || !promptMessage) {
      toast.error("Fill all the fields!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      setLoadingPromptBtn(true);

      const res = await client.post(
        "/prompt/update",
        {
          id: activePrompt,
          category: promptTitle,
          text: promptMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingPromptBtn(false);

      if (res.status === 201) {
        setReloadPrompt(!reloadPrompt);
        setPromptMessage("");
        setPromptTitle("");
        setMessage("");
        setActivePrompt("");
        setAddProModal(false);
        if (openModal) {
          setOpenModal(false);
        }
        toast.success("Prompt updated!", {
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
        toast.error("Prompt already present!", {
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
      setLoadingPromptBtn(false);

      console.log("This is error ", e);
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
  const handleEnterPress = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setTextHeight(50);
      const myElement: HTMLElement | null =
        document.getElementById("mainClickToRequest");
      myElement?.click();
    } else if (event.key === "Enter" && event.shiftKey) {
      if (textHeight < 250) {
        setTextHeight(textHeight + 20);
      }
    }
  };
  useEffect(() => {
    if (tabNo === 0) {
      const tempData = reloadRecentMessageById(allRecents, activeRecent);
      setDisplayMessages(tempData);
    } else if (tabNo === 1) {
      const tempData = reloadImageMessageById(allImageGens, activeImageGen);
      setDisplayMessages(tempData);
    }
  }, [allMessages, allMessagesGen, tabNo, allRecents, allImageGens]);
  useEffect(() => {
    if (activePrompt && Boolean(allPrompts)) {
      const prompt: any = allPrompts.filter(
        (val: any) => val._id === activePrompt
      );
      if (Boolean(prompt[0])) {
        setMessage(prompt[0].text);
        setPromptTitle(prompt[0].category);
        setPromptMessage(prompt[0].text);
      }
    }
  }, [activePrompt, openModal]);
  useEffect(() => {
    if (Boolean(recordedText)) {
      setMessage(recordedText);
      setRecordedText("");
    }
  }, [recordedText]);
  useEffect(() => {
    const temp: any = localStorage.getItem("gptToken");
    if (temp) {
      setToken(temp);
      return;
    }
  }, []);
  return (
    <>
      {(addProModal || openModal) && (
        <>
          <ModalComp
            openModal={openModal ? openModal : addProModal}
            setOpenModal={openModal ? setOpenModal : setAddProModal}
            title="Add Prompt"
          >
            <Wrapper className="mt-3 d-flex flex-column align-items-start justify-content-start gap-3">
              <PrimaryInput
                type="text"
                placeholder="Prompt title"
                border="1px solid white"
                value={promptTitle}
                onChange={(e) => {
                  setPromptTitle(e.target.value);
                }}
              />
              <PrimaryInput
                type="text"
                placeholder="Prompt message"
                border="1px solid white"
                value={promptMessage}
                onChange={(e) => {
                  setPromptMessage(e.target.value);
                }}
              />
              <PrimaryButton
                onClick={() => {
                  if (activePrompt && openModal) {
                    updatePrompt();
                    return;
                  }
                  addPrompt();
                }}
                width="auto"
                className="p-4 mt-3"
                fontColor="white"
                hover="#6785FF"
                bg="#6785FF"
              >
                {loadingPromptBtn ? (
                  <Wrapper
                    color="white"
                    className="spinner-border"
                    role="status"
                  ></Wrapper>
                ) : (
                  "Add Prompt"
                )}
              </PrimaryButton>
            </Wrapper>
          </ModalComp>
        </>
      )}

      <Wrapper
        className="d-flex flex-column align-items-center justfy-content-center"
        position="relative"
        width="100%"
        height={isResponsive ? "92vh" : "85vh"}
        borderRadius="17px"
        ps={isResponsive ? "" : "25px"}
        pe={isResponsive ? "" : "40px"}
        mt={isResponsive ? "10px" : ""}
        bg="#EDF0F9"
        // boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
      >
        {(activeRecent || activeImageGen) && (tabNo === 0 || tabNo === 1) ? (
          <Wrapper
            id="messages"
            width="100%"
            className="d-flex flex-column align-items-start"
            height="80vh"
            style={{ overflow: "auto" }}
            pb="150px"
          >
            {displayMessages?.map((val: any, index: any) => {
              return (
                <>
                  <Wrapper
                    key={index}
                    // bg="#202123"
                    height="auto"
                    width="100%"
                    className={
                      isResponsive
                        ? "ps-2 pe-2 pt-4 pb-4"
                        : "pt-4 pb-3 ps-3 pe-4"
                    }
                  >
                    <Wrapper
                      width="100%"
                      className="d-flex flex-row align-items-start justify-content-center"
                    >
                      <Wrapper
                        width={isResponsive ? "100%" : "100%"}
                        className={`d-flex flex-row align-items-center justify-content-start gap-3 ${
                          isResponsive && "me-3"
                        }`}
                      >
                        <Image
                          src="/assets/profile.webp"
                          alt="profile"
                          width={isResponsive ? "35px" : "40px"}
                          height={isResponsive ? "35px" : "40px"}
                          className="img-fluid rounded-5"
                        />
                        <P className="mb-0 mt-1" weight="600" lHeight="27px">
                          {val.message}
                        </P>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    key={val.text}
                    height="auto"
                    width="100%"
                    className={
                      isResponsive
                        ? "ps-2 pe-2 pt-2 pb-3"
                        : "pt-3 pb-4 ps-3 pe-4"
                    }
                  >
                    <Wrapper
                      width="100%"
                      className={`d-flex flex-row align-items-center justify-content-center `}
                    >
                      <Wrapper
                        width={isResponsive ? "100%" : "100%"}
                        className={`d-flex flex-row align-items-start justify-content-start gap-3 ${
                          isResponsive && "me-0"
                        }`}
                      >
                        <Image
                          src="/assets/gpt.jpg"
                          alt="profile"
                          width={isResponsive ? "35px" : "40px"}
                          height={isResponsive ? "35px" : "40px"}
                          className="rounded-5"
                        />
                        <P className="mb-0 mt-1" lHeight="27px">
                          {tabNo === 1 ? (
                            <Image
                              src={val.src}
                              width="200px"
                              height="200px"
                              alt="ai art work"
                              className="img-fluid"
                            />
                          ) : (
                            val.text
                          )}
                        </P>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </>
              );
            })}
            {loading && (
              <Wrapper height="auto" width="100%" className="p-4">
                <Wrapper
                  width="100%"
                  className="d-flex flex-row align-items-start justify-content-center"
                >
                  <Wrapper
                    width={isResponsive ? "100%" : "100%"}
                    className="d-flex flex-row align-items-center justify-content-start gap-3"
                  >
                    <Image src="/assets/profile.webp" alt="profile" />
                    <Wrapper
                      color="#6785FF"
                      className="spinner-border"
                      role="status"
                    ></Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            )}
          </Wrapper>
        ) : (
          <>
            <Wrapper className={isResponsive ? "pt-4" : "pt-5"}>
              <P fontSize={isResponsive ? "31px" : "41px"} weight="600">
                Chat GPT
              </P>

              {loading && (
                <Wrapper
                  position="absolute"
                  top="50%"
                  left="50%"
                  style={{ transform: "translate(-50%,-50%)" }}
                >
                  <Wrapper
                    color="#6785FF"
                    className="spinner-border"
                    role="status"
                  ></Wrapper>
                </Wrapper>
              )}
            </Wrapper>
          </>
        )}
        {(tabNo === 0 || tabNo === 1) && (
          <Wrapper
            width="98%"
            position="absolute"
            bottom={isResponsive ? "5px" : "10px"}
            style={{ zIndex: 20 }}
            className={`pe-2  ${
              isResponsive ? "ps-1 pt-2" : "pt-3 pb-2 ps-2 "
            }`}
            // mb={"-7.5px"}
            bg="#EDF0F9"
          >
            <Wrapper
              className={`d-flex flex-row align-items-end  ${
                isResponsive
                  ? "justify-content-start"
                  : "justify-content-center me-2 ms-2"
              }`}
              // boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
            >
              <Wrapper position="relative" width={isResponsive ? "95%" : "90%"}>
                <PrimaryTextarea
                  id="primaryTextArea"
                  placeholder="Send a message"
                  value={message}
                  border="none"
                  className="pe-5"
                  height={textHeight + "px"}
                  onKeyDown={handleEnterPress}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (e.target.value.length === 0) {
                      setTextHeight(50);
                    }
                  }}
                />

                <Wrapper
                  position="absolute"
                  right={isResponsive ? "15px" : "20px"}
                  bottom={isResponsive ? "22px" : "19px"}
                  pointer={true}
                  className="d-flex flex-row align-items-center gap-2"
                  onClick={() => {
                    if (tabNo === 0) {
                      addMessage();
                    } else if (tabNo === 1) {
                      addImage();
                    }
                  }}
                  id="mainClickToRequest"
                >
                  <Tooltip title="send">
                    <SendIcon
                      style={{ fontSize: isResponsive ? "16px" : "" }}
                    />
                  </Tooltip>
                </Wrapper>
              </Wrapper>

              <Wrapper
                pointer={true}
                border="1px solid white"
                borderRadius="10px"
                className="ms-2 mb-1"
                bg="white"
                // boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
              >
                <PrimaryButton
                  className={`d-flex flex-row align-items-center justify-content-center ${
                    isResponsive ? "gap-2" : "gap-3"
                  }`}
                  height={isResponsive ? "48px" : "50px"}
                  width={isResponsive ? "60px" : "100px"}
                >
                  <Wrapper className="">
                    <RecordAudio />
                  </Wrapper>
                  <Wrapper
                    onClick={() => {
                      setAddProModal(true);
                    }}
                  >
                    <Tooltip title="add to prompts">
                      <ArchiveIcon
                        style={{ fontSize: isResponsive ? "16px" : "" }}
                      />
                    </Tooltip>
                  </Wrapper>
                </PrimaryButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        )}
      </Wrapper>
    </>
  );
};

export default Chat;
