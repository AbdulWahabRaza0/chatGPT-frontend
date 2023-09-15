import { createContext, useContext, useState, useEffect } from "react";

type ContextProps = {
  resIconBar: boolean;
  setResIconBar: any;
  resSideBar: boolean;
  setResSideBar: any;
  isResSideBar: boolean;
  setIsResSideBar: any;
};
const ResponsiveContext = createContext<ContextProps | null>(null);
const ResponsiveProvider = ({ children }: any) => {
  const [resIconBar, setResIconBar] = useState(false);
  const [resSideBar, setResSideBar] = useState(false);
  const [isResSideBar, setIsResSideBar] = useState(false);
  return (
    <>
      <ResponsiveContext.Provider
        value={{
          resIconBar,
          setResIconBar,
          resSideBar,
          setResSideBar,
          isResSideBar,
          setIsResSideBar,
        }}
      >
        {children}
      </ResponsiveContext.Provider>
    </>
  );
};
export const ResponsiveState = () => {
  return useContext(ResponsiveContext);
};

export default ResponsiveProvider;
