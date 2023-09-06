import React, { useState, useEffect } from "react";
import { Wrapper, Image } from "./Layouts";
import { PrimaryInput } from "./Inputs";
import SendIcon from "@mui/icons-material/Send";
import { P } from "./Typography";
import Tooltip from "@mui/material/Tooltip";
import ArchiveIcon from "@mui/icons-material/Archive";
import { PrimaryButton } from "./Buttons";
import ModalComp from "./Modal";
import { RecentState } from "./Context/Recents";
import { PromptState } from "./Context/Prompts";
import { client } from "../services/client";
import { toast } from "react-toastify";
const Chat = () => {
  const { allMessages, reloadRecent, setReloadRecent, activeRecent }: any =
    RecentState();
  const {
    allPrompts,
    reloadPrompt,
    setReloadPrompt,
    openModal,
    setOpenModal,
    activePrompt,
    setActivePrompt,
  }: any = PromptState();
  const [displayMessages, setDisplayMessages] = useState([]);
  const [addProModal, setAddProModal] = useState(false);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptMessage, setPromptMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const addMessage = async () => {
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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjcxNjA4ZWYwMjJhMzRmNzNkZmQzNSIsImlhdCI6MTY5MzkxNDYzMywiZXhwIjoxNjk2NTA2NjMzfQ.Dk89NdzCYURMAcBLGeUpR8zHaDAMAB33uG_4jB0It98`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setReloadRecent(!reloadRecent);
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
      const res = await client.post(
        "/prompt/add",
        {
          category: promptTitle,
          text: promptMessage,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjcxNjA4ZWYwMjJhMzRmNzNkZmQzNSIsImlhdCI6MTY5MzkxNDYzMywiZXhwIjoxNjk2NTA2NjMzfQ.Dk89NdzCYURMAcBLGeUpR8zHaDAMAB33uG_4jB0It98`,
          },
        }
      );

      if (res.status === 201) {
        setReloadPrompt(!reloadPrompt);
        setPromptMessage("");
        setPromptTitle("");
        setAddProModal(false);
        if (openModal) {
          setOpenModal(false);
        }
        toast.success("Succeful!", {
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
      const res = await client.post(
        "/prompt/update",
        {
          id: activePrompt,
          category: promptTitle,
          text: promptMessage,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjcxNjA4ZWYwMjJhMzRmNzNkZmQzNSIsImlhdCI6MTY5MzkxNDYzMywiZXhwIjoxNjk2NTA2NjMzfQ.Dk89NdzCYURMAcBLGeUpR8zHaDAMAB33uG_4jB0It98`,
          },
        }
      );

      if (res.status === 201) {
        setReloadPrompt(!reloadPrompt);
        setPromptMessage("");
        setPromptTitle("");
        setAddProModal(false);
        if (openModal) {
          setOpenModal(false);
        }
        toast.success("succefully update!", {
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
    if (event.key === "Enter") {
      const myElement: HTMLElement | null =
        document.getElementById("mainClickToRequest");
      myElement?.click();
    }
  };
  useEffect(() => {
    setDisplayMessages(allMessages);
  }, [allMessages]);
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
                className="p-4 mt-1"
                bg="green"
              >
                Add Prompt
              </PrimaryButton>
            </Wrapper>
          </ModalComp>
        </>
      )}

      <Wrapper
        className="d-flex flex-column align-items-center justfy-content-center"
        position="relative"
        width="100%"
      >
        {activeRecent ? (
          <Wrapper
            id="messages"
            width="100%"
            className="d-flex flex-column align-items-start"
            height="100vh"
            style={{ overflow: "auto" }}
            pb="150px"
          >
            {displayMessages?.map((val: any, index: any) => {
              return (
                <>
                  <Wrapper
                    key={index}
                    bg="#202123"
                    height="auto"
                    width="100%"
                    className="p-4"
                  >
                    <Wrapper
                      width="100%"
                      className="d-flex flex-row align-items-start justify-content-center"
                    >
                      <Wrapper
                        width="60%"
                        className="d-flex flex-row align-items-center justify-content-start gap-3"
                      >
                        <Image src="/assets/profile.webp" alt="profile" />
                        <P className="mb-0 mt-1" lHeight="27px">
                          {val.message}
                        </P>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    key={val.text}
                    height="auto"
                    width="100%"
                    className="p-4"
                  >
                    <Wrapper
                      width="100%"
                      className="d-flex flex-row align-items-center justify-content-center"
                    >
                      <Wrapper
                        width="60%"
                        className="d-flex flex-row align-items-start justify-content-start gap-3"
                      >
                        <Image src="/assets/profile.webp" alt="profile" />
                        <P className="mb-0 mt-1" lHeight="27px">
                          {val.text}
                        </P>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </>
              );
            })}
            {loading && (
              <Wrapper bg="#202123" height="auto" width="100%" className="p-4">
                <Wrapper
                  width="100%"
                  className="d-flex flex-row align-items-start justify-content-center"
                >
                  <Wrapper
                    width="60%"
                    className="d-flex flex-row align-items-center justify-content-start gap-3"
                  >
                    <Image src="/assets/profile.webp" alt="profile" />
                    <div
                      className="spinner-border text-success"
                      role="status"
                    ></div>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            )}
          </Wrapper>
        ) : (
          <>
            <Wrapper className="pt-5">
              <P fontSize="41px" weight="600">
                Chat GPT
              </P>
            </Wrapper>
          </>
        )}

        <Wrapper
          width="100%"
          position="absolute"
          bottom="0px"
          style={{ zIndex: 20 }}
          className="p-2"
          bg="#202123"
        >
          <Wrapper
            className="d-flex flex-row align-items-center justify-content-center"
            boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          >
            <Wrapper position="relative" width="60%">
              <PrimaryInput
                type="text"
                placeholder="Send a message"
                value={message}
                onKeyDown={handleEnterPress}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />

              <Wrapper
                position="absolute"
                right="20px"
                bottom="14px"
                pointer={true}
                className="d-flex flex-row align-items-center gap-2"
                onClick={addMessage}
                id="mainClickToRequest"
              >
                <Tooltip title="send">
                  <SendIcon />
                </Tooltip>
              </Wrapper>
            </Wrapper>

            <Tooltip title="add to prompts">
              <Wrapper
                className="ms-2"
                pointer={true}
                onClick={() => {
                  setAddProModal(true);
                }}
              >
                <ArchiveIcon />
              </Wrapper>
            </Tooltip>
          </Wrapper>
          <Wrapper className="mt-2 text-center">
            <P className="mb-0" fontSize="12px">
              Free Research Preview. ChatGPT may produce inaccurate information
              about people, places, or facts.
            </P>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default Chat;
