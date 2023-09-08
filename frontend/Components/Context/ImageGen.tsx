import { createContext, useContext, useState, useEffect } from "react";
import { client } from "../../services/client";
import { toast } from "react-toastify";

type ContextProps = {
  allImageGens: any;
  allMessagesGen: any;
  setAllMessagesGen: any;
  activeImageGen: any;
  setActiveImageGen: any;
  reloadImageGen: boolean;
  setReloadImageGen: any;
  loadingImageGen: boolean;
};
const ImageGenContext = createContext<ContextProps | null>(null);
const ImageGenProvider = ({ children }: any) => {
  const [allImageGens, setAllImageGens] = useState<any>([]);
  const [activeImageGen, setActiveImageGen] = useState("");
  const [allMessagesGen, setAllMessagesGen] = useState<any>([]);
  const [reloadImageGen, setReloadImageGen] = useState(false);
  const [loadingImageGen, setLoadingImageGen] = useState(false);

  const getAllImageGens = async (token: string) => {
    try {
      setLoadingImageGen(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await client.get("/image", config);
      setLoadingImageGen(false);
      if (res.status === 200) {
        setAllImageGens(res.data);
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
      setLoadingImageGen(false);
      console.log("This is error ", e);
    }
  };
  useEffect(() => {
    const item: any = localStorage.getItem("gptToken");
    getAllImageGens(item);
  }, [reloadImageGen]);
  return (
    <>
      <ImageGenContext.Provider
        value={{
          allImageGens,
          allMessagesGen,
          setAllMessagesGen,
          activeImageGen,
          setActiveImageGen,
          reloadImageGen,
          setReloadImageGen,
          loadingImageGen,
        }}
      >
        {children}
      </ImageGenContext.Provider>
    </>
  );
};
export const ImageState = () => {
  return useContext(ImageGenContext);
};

export default ImageGenProvider;
