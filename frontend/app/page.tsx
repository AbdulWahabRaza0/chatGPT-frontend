"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import IconBar from "@/Components/IconBar";
import Sidebar from "@/Components/Sidebar";
import ChatComp from "@/Components/ChatComp";
import { Wrapper, useMediaQuery } from "@/Components/Layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecentProvider from "@/Components/Context/Recents";
import PromptProvider from "@/Components/Context/Prompts";
import ImageGenProvider from "@/Components/Context/ImageGen";
import SideBarProvider from "@/Components/Context/SideBar";
import ResponsiveProvider from "@/Components/Context/Responsive";
export default function Home() {
  const router = useRouter();
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

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
      <ResponsiveProvider>
        <RecentProvider>
          <PromptProvider>
            <ImageGenProvider>
              <SideBarProvider>
                <Wrapper
                  className={`d-flex ${
                    isResponsive ? "flex-column" : "flex-row m-3"
                  } align-items-center justify-content-center`}
                >
                  <IconBar />
                  <Sidebar />
                  <ChatComp />
                </Wrapper>
              </SideBarProvider>
            </ImageGenProvider>
          </PromptProvider>
        </RecentProvider>
      </ResponsiveProvider>
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
