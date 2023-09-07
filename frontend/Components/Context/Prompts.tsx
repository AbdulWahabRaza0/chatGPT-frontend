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
  loadingPrompt: boolean;
};
const PromptContext = createContext<ContextProps | null>(null);
const PromptProvider = ({ children }: any) => {
  const [allPrompts, setAllPrompts] = useState<any>([]);
  const [activePrompt, setActivePrompt] = useState("");
  const [reloadPrompt, setReloadPrompt] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const getAllPrompt = async (token: string) => {
    try {
      setLoadingPrompt(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await client.get("/prompt", config);
      setLoadingPrompt(false);
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
      setLoadingPrompt(false);

      console.log("This is error ", e);
    }
  };
  useEffect(() => {
    const item: any = localStorage.getItem("gptToken");

    getAllPrompt(item);
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
          loadingPrompt,
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
