import React, { useState, useEffect } from "react";
import { Wrapper, Image } from "./Layouts";
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
import { RecentState } from "./Context/Recents";
import { PromptState } from "./Context/Prompts";
const Sidebar = () => {
  const { allRecents, reloadRecent, setReloadRecent }: any = RecentState();
  const { allPrompts, openModal, setOpenModal }: any = PromptState();
  const [open, setOpen] = useState(true);
  const [displayRecent, setDisplayRecent] = useState<any>([]);
  const [displayPrompt, setDisplayPrompt] = useState<any>([]);
  const [addRecModal, setAddRecModal] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [loading, setLoading] = useState(false);
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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjcxNjA4ZWYwMjJhMzRmNzNkZmQzNSIsImlhdCI6MTY5MzkxNDYzMywiZXhwIjoxNjk2NTA2NjMzfQ.Dk89NdzCYURMAcBLGeUpR8zHaDAMAB33uG_4jB0It98`,
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

  useEffect(() => {
    setDisplayRecent(allRecents);
  }, [allRecents]);
  useEffect(() => {
    setDisplayPrompt(allPrompts);
  }, [allPrompts]);
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
                onClick={addChat}
                width="auto"
                className="p-4 mt-1"
                bg="green"
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
      {open ? (
        <>
          <Wrapper
            width="260px"
            height="100vh"
            bg="#202123"
            boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
            className="d-flex flex-column justify-content-between align-items-between ps-2 pe-2 pt-3 pb-3"
          >
            <Wrapper id="top">
              <Wrapper
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
              </Wrapper>
              <Spacer height="35px" />
              <Wrapper style={{ overflow: "auto" }} height="75vh">
                <Wrapper id="recent-chats" className="mb-3">
                  <Wrapper>
                    <ControlledAccordions
                      data={displayRecent}
                      title={"Recent Chats"}
                      mode="recent"
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper id="recent-chats" className="">
                  <Wrapper>
                    <ControlledAccordions
                      data={displayPrompt}
                      title={"Prompts"}
                      mode="prompts"
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
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
            </Wrapper>
          </Wrapper>
        </>
      ) : (
        <>
          <Wrapper
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
                setOpen(true);
              }}
            >
              <MenuIcon style={{ fontSize: "14px" }} />
            </PrimaryButton>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Sidebar;
