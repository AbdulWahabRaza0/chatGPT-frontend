import { createContext, useContext, useState, useEffect } from "react";

type ContextProps = {
  openSideBar: boolean;
  setOpenSideBar: any;
  tabNo: number;
  setTabNo: any;
};
const PromptContext = createContext<ContextProps | null>(null);
const SideBarProvider = ({ children }: any) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [tabNo, setTabNo] = useState(0);
  return (
    <>
      <PromptContext.Provider
        value={{
          openSideBar,
          setOpenSideBar,
          tabNo,
          setTabNo,
        }}
      >
        {children}
      </PromptContext.Provider>
    </>
  );
};
export const SideBarState = () => {
  return useContext(PromptContext);
};

export default SideBarProvider;
