import { createContext, useContext, useState, useEffect } from "react";
import { client } from "../../services/client";
import { toast } from "react-toastify";

type ContextProps = {
  allRecents: any;
  allMessages: any;
  setAllMessages: any;
  activeRecent: any;
  setActiveRecent: any;
  reloadRecent: boolean;
  setReloadRecent: any;
  loadingRecent: boolean;
  recordedText: any;
  setRecordedText: any;
  setRecordLoading: any;
  recordLoading: boolean;
};
const RecentContext = createContext<ContextProps | null>(null);
const RecentProvider = ({ children }: any) => {
  const [allRecents, setAllRecents] = useState<any>([]);
  const [activeRecent, setActiveRecent] = useState("");
  const [allMessages, setAllMessages] = useState<any>([]);
  const [reloadRecent, setReloadRecent] = useState(false);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [recordedText, setRecordedText] = useState<any>("");
  const [recordLoading, setRecordLoading] = useState(false);
  const getAllRecent = async (token: string) => {
    try {
      setLoadingRecent(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await client.get("/recent", config);
      setLoadingRecent(false);
      if (res.status === 200) {
        setAllRecents(res.data);
      } else {
        toast.error("Recent not loaded!", {
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
      setLoadingRecent(false);
      console.log("This is error ", e);
    }
  };
  useEffect(() => {
    const item: any = localStorage.getItem("gptToken");
    getAllRecent(item);
  }, [reloadRecent]);
  return (
    <>
      <RecentContext.Provider
        value={{
          allRecents,
          reloadRecent,
          setReloadRecent,
          activeRecent,
          setActiveRecent,
          allMessages,
          setAllMessages,
          loadingRecent,
          setRecordedText,
          recordedText,
          recordLoading,
          setRecordLoading,
        }}
      >
        {children}
      </RecentContext.Provider>
    </>
  );
};
export const RecentState = () => {
  return useContext(RecentContext);
};

export default RecentProvider;
