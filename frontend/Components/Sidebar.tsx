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
import { styled } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const StyledTab = styled(Tab)({
  "& .MuiTabs-indicator": {},
});
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
  const [search, setSearch] = useState("");

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
  const SearchItem = (value: any) => {
    if (tabNo === 0 && !tabFlag) {
      const temp = allRecents.filter((item: any) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayRecent(temp);
    } else if (tabNo === 1 && !tabFlag) {
      const temp = allImageGens.filter((item: any) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayImageGen(temp);
    } else {
      const temp = allPrompts.filter((item: any) =>
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayPrompt(temp);
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
                  if (tabNo === 1) {
                    addImageGen();
                  } else if (tabNo === 0) {
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
                  <Wrapper
                    color="white"
                    className="spinner-border"
                    role="status"
                  ></Wrapper>
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
            height={isResponsive ? "100vh" : "97vh"}
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
              <Wrapper position="relative">
                <PrimaryInput
                  type="text"
                  style={{ paddingLeft: "40px" }}
                  placeholder="Search"
                  borderRadius="11px"
                  border="1px solid gray"
                  height="40px"
                  position="relative"
                  value={search}
                  onChange={(e: any) => {
                    setSearch(e.target.value);
                    SearchItem(e.target.value);
                  }}
                />
                <SearchIcon
                  style={{ position: "absolute", left: "10px", top: "9.5px" }}
                />
              </Wrapper>
              <Spacer height="10px" />

              <Wrapper>
                <Tabs value={tabFlag ? 1 : 0}>
                  {tabNo === 0 && (
                    <StyledTab
                      onClick={() => {
                        setTabFlag(false);
                      }}
                      label={
                        <span
                          style={{
                            fontSize: isResponsive ? "12px" : "12px",
                            fontWeight: "bold",
                            marginBottom: "-13px",
                          }}
                        >
                          Recent Chats
                        </span>
                      }
                    />
                  )}
                  {tabNo === 1 && (
                    <StyledTab
                      onClick={() => {
                        setTabFlag(false);
                      }}
                      label={
                        <span
                          style={{
                            fontSize: isResponsive ? "12px" : "12px",
                            fontWeight: "bold",
                            marginBottom: "-13px",
                          }}
                        >
                          Recent Images
                        </span>
                      }
                    />
                  )}

                  <StyledTab
                    onClick={() => {
                      setTabFlag(true);
                    }}
                    label={
                      <span
                        style={{
                          fontSize: isResponsive ? "12px" : "12px",
                          fontWeight: "bold",
                          marginBottom: "-13px",
                        }}
                      >
                        Prompts
                      </span>
                    }
                  />
                </Tabs>

                <Spacer height="20px" />

                <Wrapper
                  style={{ overflow: "auto" }}
                  height={isResponsive ? "76vh" : "73vh"}
                >
                  {tabNo === 0 && !tabFlag && (
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
                  {tabNo === 1 && !tabFlag && (
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
            </Wrapper>
          </Wrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Sidebar;
