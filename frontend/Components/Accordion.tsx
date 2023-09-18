import { useEffect, useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Wrapper, useMediaQuery } from "./Layouts";
import { P } from "./Typography";
import { PrimaryButton } from "./Buttons";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
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
import { PrimaryInput } from "./Inputs";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
interface Props {
  title: any;
  mode: string;
  data: [];
}
export default function ControlledAccordions({ title, data, mode }: Props) {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });
  const router = useRouter();
  const {
    reloadRecent,
    setReloadRecent,
    setAllMessages,
    activeRecent,
    setActiveRecent,
    loadingRecent,
    tabFlag,
  }: any = RecentState();
  const {
    openModal,
    setOpenModal,
    activePrompt,
    setActivePrompt,
    loadingPrompt,
    reloadPrompt,
    setReloadPrompt,
  }: any = PromptState();
  const {
    loadingImageGen,
    setActiveImageGen,
    activeImageGen,
    reloadImageGen,
    setReloadImageGen,
    setAllMessagesGen,
  }: any = ImageState();
  const { tabNo, setTabNo }: any = SideBarState();
  const [mount, setMount] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [openFlag, setOpenFlag] = useState(false);
  const [activeProps, setActiveProps] = useState("");
  const updateRecent = async (id: any) => {
    if (!editText) {
      return;
    }
    try {
      setLoading(true);
      const res = await client.post(
        "/recent/update",
        {
          id,
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setEditFlag(false);
        setEditId("");
        setReloadRecent(!reloadRecent);
        setEditText("");
        toast.success("Recent Chat Renamed!", {
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
  const updateImageGen = async (id: any) => {
    if (!editText) {
      return;
    }
    try {
      setLoading(true);
      const res = await client.post(
        "/image/update",
        {
          id,
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setEditFlag(false);
        setEditId("");
        setReloadImageGen(!reloadImageGen);
        setEditText("");
        toast.success("Image Gen Renamed!", {
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
  const deleteRecent = async (id: any) => {
    try {
      setLoading(true);
      const res = await client.post(
        "/recent/delete",
        {
          id,
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
        setActiveRecent("");
        toast.success("Recent Chat Deleted!", {
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
  const deleteImageGen = async (id: any) => {
    try {
      setLoading(true);
      const res = await client.post(
        "/image/delete",
        {
          id,
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
        setActiveImageGen("");
        toast.success("Image Gen Deleted!", {
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
  const deletePrompt = async (id: any) => {
    try {
      setLoading(true);
      const res = await client.post(
        "/prompt/delete",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setReloadPrompt(!reloadPrompt);
        setActivePrompt("");
        toast.success("Prompt Deleted!", {
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
    if (tabNo === 1) {
      const tempData = reloadRecentMessageById(data, activeRecent);
      setAllMessages(tempData);
    } else if (tabNo === 2) {
      const tempData = reloadImageMessageById(data, activeImageGen);
      setAllMessagesGen(tempData);
    }
  }, [data, tabNo]);
  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  useEffect(() => {
    const temp = localStorage.getItem("gptToken");
    if (temp) {
      setToken(temp);
      return;
    }
    router.push("/signin");
  }, []);
  return (
    <div>
      {(mode === "recent" && !loadingRecent) ||
      (mode === "prompts" && !loadingPrompt) ||
      (mode === "image" && !loadingImageGen) ? (
        data.length > 0 ? (
          data?.map((val: any, index) => {
            return (
              <>
                <Wrapper className="mb-3" key={index}>
                  {!editFlag || editId !== val?._id ? (
                    <PrimaryButton
                      // bg="rgb(51, 51, 51,0.7)"
                      bg={
                        (mode === "prompts" && activePrompt === val._id) ||
                        (mode === "recent" && activeRecent === val._id) ||
                        (mode === "image" && activeImageGen === val._id)
                          ? "#6785FF"
                          : "#EDF0F9"
                      }
                      width="100%"
                      height={isResponsive ? "90px" : "110px"}
                      fontColor="#cccccc"
                      className="pt-2 pb-2 ps-3 pe-3 d-flex flex-row align-items-start justify-content-between"
                      // border="1px solid gray"
                      borderRadius="7px"
                      hover={
                        (mode === "prompts" && activePrompt === val._id) ||
                        (mode === "recent" && activeRecent === val._id) ||
                        (mode === "image" && activeImageGen === val._id)
                          ? "#6785FF"
                          : "#EDF0F9"
                      }
                      onClick={() => {
                        if (mode === "recent") {
                          setAllMessages(val.messages);
                          setActiveRecent(val._id);
                        } else if (mode === "prompts") {
                          setActivePrompt(val._id);
                        } else if (mode === "image") {
                          setAllMessagesGen(val.messages);
                          setActiveImageGen(val._id);
                        }
                      }}
                    >
                      <Wrapper
                        ps="5px"
                        pt="10px"
                        className="d-flex flex-row align-items-start gap-2"
                      >
                        <ChatIcon
                          sx={{
                            fontSize: "21px",
                            marginTop: "2px",
                            color:
                              (mode === "prompts" &&
                                activePrompt === val._id) ||
                              (mode === "recent" && activeRecent === val._id) ||
                              (mode === "image" && activeImageGen === val._id)
                                ? "white"
                                : "black",
                          }}
                        />
                        <P
                          className="mb-0 text-start"
                          style={{ zIndex: "1" }}
                          ellipsis={true}
                          fontColor={
                            (mode === "prompts" && activePrompt === val._id) ||
                            (mode === "recent" && activeRecent === val._id) ||
                            (mode === "image" && activeImageGen === val._id)
                              ? "white"
                              : "black"
                          }
                          weight="500"
                        >
                          {mode === "recent" || mode === "image"
                            ? val.title
                            : val.category}
                        </P>
                      </Wrapper>
                      <Wrapper
                        position="absolute"
                        right="13px"
                        // bg="rgb(51, 51, 51,0.7)"
                        style={{ zIndex: "10" }}
                        className="d-flex flex-row align-items-center align-self-end gap-2"
                      >
                        <Wrapper
                          onClick={() => {
                            if (mode === "recent") {
                              setEditId(val._id);
                              setEditFlag(true);
                            } else if (mode === "prompts") {
                              setOpenModal(true);
                            } else if (mode === "image") {
                              setEditId(val._id);
                              setEditFlag(true);
                            }
                          }}
                        >
                          <Tooltip title="edit">
                            <EditIcon sx={{ fontSize: "16px" }} />
                          </Tooltip>
                        </Wrapper>
                        <Tooltip title="delete">
                          <DeleteOutlineIcon
                            sx={{ fontSize: "16px", marginTop: "5px" }}
                            onClick={() => {
                              if (mode === "recent") {
                                deleteRecent(val._id);
                              } else if (mode === "prompts") {
                                deletePrompt(val._id);
                              } else if (mode === "image") {
                                deleteImageGen(val._id);
                              }
                            }}
                          />
                        </Tooltip>
                      </Wrapper>
                    </PrimaryButton>
                  ) : (
                    <>
                      <Wrapper width="100%" height="40px" position="relative">
                        <PrimaryInput
                          position="absolute"
                          height="35px"
                          placeholder="rename chat"
                          border="1px solid white"
                          value={editText}
                          onChange={(e) => {
                            setEditText(e.target.value);
                          }}
                        />
                        <Wrapper
                          onClick={() => {
                            if (mode === "recent") {
                              updateRecent(val._id);
                            } else if (mode === "image") {
                              updateImageGen(val._id);
                            }
                          }}
                        >
                          <Tooltip title="done">
                            <DoneIcon
                              style={{
                                color: "black",
                                position: "absolute",
                                top: "12px",
                                right: "40px",
                                fontSize: "18px",
                                cursor: "pointer",
                              }}
                            />
                          </Tooltip>
                        </Wrapper>
                        <Wrapper
                          onClick={() => {
                            setEditFlag(false);
                            setEditId("");
                          }}
                        >
                          <Tooltip title="close">
                            <CloseIcon
                              style={{
                                color: "black",
                                position: "absolute",
                                top: "12px",
                                right: "15px",
                                fontSize: "18px",
                                cursor: "pointer",
                              }}
                            />
                          </Tooltip>
                        </Wrapper>
                      </Wrapper>
                    </>
                  )}
                </Wrapper>
              </>
            );
          })
        ) : (
          <>
            <P fontColor="gray">No Data Found</P>
          </>
        )
      ) : (
        <>
          <div className="spinner-border text-success" role="status"></div>
        </>
      )}
      {/* <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        onClick={() => {
          setOpenFlag(!openFlag);
        }}
        sx={{
          background: "rgb(51, 51, 51,0.5)",
        }}
      >
        <AccordionSummary
          expandIcon={
            <Wrapper>
              <ExpandMoreIcon sx={{ color: "white" }} />
            </Wrapper>
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Wrapper
            width="100%"
            className="d-flex flex-row align-items-center justify-content-between"
          >
            <Typography
              sx={{
                width: "auto",
                flexShrink: 0,
                color: "white",
                fontSize: "14px",
              }}
            >
              {title}
            </Typography>
          </Wrapper>
        </AccordionSummary>

        <AccordionDetails
          style={{ overflow: "auto", maxHeight: "220px", position: "relative" }}
        >
          {(mode === "recent" && !loadingRecent) ||
          (mode === "prompts" && !loadingPrompt) ||
          (mode === "image" && !loadingImageGen) ? (
            data.length > 0 ? (
              data?.map((val: any, index) => {
                return (
                  <>
                    <Wrapper className="mb-3" key={index}>
                      {!editFlag || editId !== val?._id ? (
                        <PrimaryButton
                          bg="rgb(51, 51, 51,0.7)"
                          width="100%"
                          height="40px"
                          fontColor="#cccccc"
                          className="p-3 d-flex flex-row align-items-center justify-content-between"
                          border="1px solid gray"
                          borderRadius="7px"
                          hover="rgb(51, 51, 51,0.1)"
                          onClick={() => {
                            if (mode === "recent") {
                              setAllMessages(val.messages);
                              setActiveRecent(val._id);
                            } else if (mode === "prompts") {
                              setActivePrompt(val._id);
                            } else if (mode === "image") {
                              setAllMessagesGen(val.messages);
                              setActiveImageGen(val._id);
                            }
                          }}
                        >
                          <Wrapper className="d-flex flex-row align-items-center gap-2">
                            <ChatIcon sx={{ fontSize: "16px" }} />
                            <P
                              className="mb-0"
                              style={{ whiteSpace: "nowrap", zIndex: "1" }}
                            >
                              {mode === "recent" || mode === "image"
                                ? val.title
                                : val.category}
                            </P>
                          </Wrapper>
                          <Wrapper
                            position="absolute"
                            right="13px"
                            bg="rgb(51, 51, 51,0.7)"
                            style={{ zIndex: "10" }}
                            className="d-flex flex-row align-items-center gap-2"
                          >
                            <Wrapper
                              onClick={() => {
                                if (mode === "recent") {
                                  setEditId(val._id);
                                  setEditFlag(true);
                                } else if (mode === "prompts") {
                                  setOpenModal(true);
                                } else if (mode === "image") {
                                  setEditId(val._id);
                                  setEditFlag(true);
                                }
                              }}
                            >
                              <Tooltip title="edit">
                                <EditIcon sx={{ fontSize: "16px" }} />
                              </Tooltip>
                            </Wrapper>
                            <Tooltip title="delete">
                              <DeleteOutlineIcon
                                sx={{ fontSize: "16px" }}
                                onClick={() => {
                                  if (mode === "recent") {
                                    deleteRecent(val._id);
                                  } else if (mode === "prompts") {
                                    deletePrompt(val._id);
                                  } else if (mode === "image") {
                                    deleteImageGen(val._id);
                                  }
                                }}
                              />
                            </Tooltip>
                          </Wrapper>
                        </PrimaryButton>
                      ) : (
                        <>
                          <Wrapper
                            width="100%"
                            height="40px"
                            position="relative"
                          >
                            <PrimaryInput
                              position="absolute"
                              height="35px"
                              placeholder="rename chat"
                              border="1px solid white"
                              value={editText}
                              onChange={(e) => {
                                setEditText(e.target.value);
                              }}
                            />
                            <Wrapper
                              onClick={() => {
                                if (mode === "recent") {
                                  updateRecent(val._id);
                                } else if (mode === "image") {
                                  updateImageGen(val._id);
                                }
                              }}
                            >
                              <Tooltip title="done">
                                <DoneIcon
                                  style={{
                                    color: "white",
                                    position: "absolute",
                                    top: "12px",
                                    right: "40px",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip>
                            </Wrapper>
                            <Wrapper
                              onClick={() => {
                                setEditFlag(false);
                                setEditId("");
                              }}
                            >
                              <Tooltip title="close">
                                <CloseIcon
                                  style={{
                                    color: "white",
                                    position: "absolute",
                                    top: "12px",
                                    right: "15px",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip>
                            </Wrapper>
                          </Wrapper>
                        </>
                      )}
                    </Wrapper>
                  </>
                );
              })
            ) : (
              <>
                <P fontColor="gray">No Data Found</P>
              </>
            )
          ) : (
            <>
              <div className="spinner-border text-success" role="status"></div>
            </>
          )}
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
