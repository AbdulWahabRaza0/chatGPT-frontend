import { createContext, useContext, useState, useEffect } from "react";
import { client } from "../../services/client";
import { toast } from "react-toastify";

type ContextProps = {
  allPrompts: any;
  activePrompt: any;
  setActivePrompt: any;
  reloadPrompt: boolean;
  setReloadPrompt: any;
  openModal: boolean;
  setOpenModal: any;
};
const PromptContext = createContext<ContextProps | null>(null);
const PromptProvider = ({ children }: any) => {
  const [allPrompts, setAllPrompts] = useState<any>([]);
  const [activePrompt, setActivePrompt] = useState("");
  const [reloadPrompt, setReloadPrompt] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const getAllPrompt = async (token: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await client.get("/prompt", config);

      if (res.status === 200) {
        setAllPrompts(res.data);
      } else {
        toast.error("Prompts not loaded!", {
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
    }
  };
  useEffect(() => {
    // const item = localStorage.getItem("userInfo");
    // const userData = JSON.parse(item);

    getAllPrompt(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjcxNjA4ZWYwMjJhMzRmNzNkZmQzNSIsImlhdCI6MTY5MzkxNDYzMywiZXhwIjoxNjk2NTA2NjMzfQ.Dk89NdzCYURMAcBLGeUpR8zHaDAMAB33uG_4jB0It98"
    );
  }, [reloadPrompt]);
  return (
    <>
      <PromptContext.Provider
        value={{
          allPrompts,
          reloadPrompt,
          setReloadPrompt,
          activePrompt,
          setActivePrompt,
          openModal,
          setOpenModal,
        }}
      >
        {children}
      </PromptContext.Provider>
    </>
  );
};
export const PromptState = () => {
  return useContext(PromptContext);
};

export default PromptProvider;
