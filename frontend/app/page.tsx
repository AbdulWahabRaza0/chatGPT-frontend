"use client";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "@/Components/Sidebar";
import Chat from "@/Components/Chat";
import { Wrapper } from "@/Components/Layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecentProvider from "@/Components/Context/Recents";
import PromptProvider from "@/Components/Context/Prompts";
export default function Home() {
  return (
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
          <Wrapper className="d-flex flex-row">
            <Sidebar />
            <Chat />
          </Wrapper>
        </PromptProvider>
      </RecentProvider>
    </>
  );
}
