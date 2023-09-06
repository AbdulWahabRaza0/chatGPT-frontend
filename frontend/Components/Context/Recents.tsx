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
};
const RecentContext = createContext<ContextProps | null>(null);
const RecentProvider = ({ children }: any) => {
  const [allRecents, setAllRecents] = useState<any>([]);
  const [activeRecent, setActiveRecent] = useState("");
  const [allMessages, setAllMessages] = useState<any>([]);
  const [reloadRecent, setReloadRecent] = useState(false);

  const getAllRecent = async (token: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await client.get("/recent", config);

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
      console.log("This is error ", e);
    }
  };
  useEffect(() => {
    // const item = localStorage.getItem("userInfo");
    // const userData = JSON.parse(item);

    getAllRecent(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjcxNjA4ZWYwMjJhMzRmNzNkZmQzNSIsImlhdCI6MTY5MzkxNDYzMywiZXhwIjoxNjk2NTA2NjMzfQ.Dk89NdzCYURMAcBLGeUpR8zHaDAMAB33uG_4jB0It98"
    );
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
