"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "@/Components/Sidebar";
import Chat from "@/Components/Chat";
import { Wrapper } from "@/Components/Layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecentProvider from "@/Components/Context/Recents";
import PromptProvider from "@/Components/Context/Prompts";
import ImageGenProvider from "@/Components/Context/ImageGen";
export default function Home() {
  const router = useRouter();
  const [mount, setMount] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("gptToken");
    if (token) {
      setMount(true);
      return;
    } else {
      router.push("/signin");
    }
  }, []);
  return mount ? (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RecentProvider>
        <PromptProvider>
          <ImageGenProvider>
            <Wrapper className="d-flex flex-row m-0">
              <Sidebar />
              <Chat />
            </Wrapper>
          </ImageGenProvider>
        </PromptProvider>
      </RecentProvider>
    </>
  ) : (
    <>
      <Wrapper
        position="fixed"
        top="50%"
        left="50%"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <Wrapper
          className="spinner-border text-success"
          role="status"
        ></Wrapper>
      </Wrapper>
    </>
  );
}
