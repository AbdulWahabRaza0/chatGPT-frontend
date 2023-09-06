import { useEffect, useState, SyntheticEvent } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Wrapper } from "./Layouts";
import { P } from "./Typography";
import { PrimaryButton } from "./Buttons";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import { RecentState } from "./Context/Recents";
import { PromptState } from "./Context/Prompts";
import { client } from "../services/client";
import { toast } from "react-toastify";
import { PrimaryInput } from "./Inputs";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
interface Props {
  title: any;
  mode: string;
  data: [];
}
export default function ControlledAccordions({ title, data, mode }: Props) {
  const {
    reloadRecent,
    setReloadRecent,
    setAllMessages,
    activeRecent,
    setActiveRecent,
  }: any = RecentState();
  const { openModal, setOpenModal, activePrompt, setActivePrompt }: any =
    PromptState();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjcxNjA4ZWYwMjJhMzRmNzNkZmQzNSIsImlhdCI6MTY5MzkxNDYzMywiZXhwIjoxNjk2NTA2NjMzfQ.Dk89NdzCYURMAcBLGeUpR8zHaDAMAB33uG_4jB0It98`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setEditFlag(false);
        setEditId("");
        setReloadRecent(!reloadRecent);
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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjcxNjA4ZWYwMjJhMzRmNzNkZmQzNSIsImlhdCI6MTY5MzkxNDYzMywiZXhwIjoxNjk2NTA2NjMzfQ.Dk89NdzCYURMAcBLGeUpR8zHaDAMAB33uG_4jB0It98`,
          },
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setReloadRecent(!reloadRecent);
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
  useEffect(() => {
    if (Boolean(activeRecent)) {
      const messages: any = data.filter((val: any) => val._id === activeRecent);
      if (Boolean(messages[0])) {
        setAllMessages(messages[0].messages);
      }
    }
  }, [data]);
  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ background: "rgb(51, 51, 51,0.5)" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
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
        </AccordionSummary>

        <AccordionDetails
          style={{ overflow: "auto", maxHeight: "220px", position: "relative" }}
        >
          {data?.map((val: any, index) => {
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
                        }
                      }}
                    >
                      <Wrapper className="d-flex flex-row align-items-center gap-2">
                        <ChatIcon sx={{ fontSize: "16px" }} />
                        <P className="mb-0">
                          {mode === "recent" ? val.title : val.category}
                        </P>
                      </Wrapper>
                      <Wrapper className="d-flex flex-row align-items-center gap-2">
                        <Wrapper
                          onClick={() => {
                            if (mode === "recent") {
                              setEditId(val._id);
                              setEditFlag(true);
                            } else if ((mode = "prompts")) {
                              setOpenModal(true);
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
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
