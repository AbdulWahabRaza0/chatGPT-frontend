"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryInput } from "@/Components/Inputs";
import { Wrapper, useMediaQuery } from "@/Components/Layouts";
import { PrimaryButton } from "@/Components/Buttons";
import { P } from "@/Components/Typography";
import { Spacer } from "@/Components/Spacer";
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../services/client";
const Signin = () => {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const router = useRouter();
  const [mount, setMount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signin = async () => {
    try {
      setLoading(true);
      const res = await client.post("/user/login", {
        email,
        password,
      });
      setLoading(false);

      if (res.status === 201) {
        localStorage.setItem("gptToken", res.data.token);
        toast.success("Signin Successful", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/");
      } else {
        toast.error("Invalid Credientials!", {
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
      setLoading(false);
      console.log("This si error ", e);
      toast.error("Invalid Error!", {
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
  };
  useEffect(() => {
    const token = localStorage.getItem("gptToken");
    if (token) {
      router.push("/");
    } else {
      setMount(true);
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
      <Wrapper
        className="d-flex flex-row align-items-center justify-content-center"
        height="100vh"
        width="100%"
      >
        <Wrapper
          className="d-flex flex-column align-items-center justify-content-center gap-4"
          height="100vh"
          width={isResponsive ? "80%" : "40%"}
        >
          <P fontSize="41px" weight="600">
            Signin
          </P>
          <Spacer height="20px" />
          <PrimaryInput
            height="50px"
            placeholder="Enter email"
            border="1px solid white"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <PrimaryInput
            height="50px"
            placeholder="Enter password"
            border="1px solid white"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Spacer height="10px" />
          <PrimaryButton onClick={signin} bg="green" hover="rgb(0,255,0,0.2)">
            {loading ? (
              <div className="spinner-border text-success" role="status"></div>
            ) : (
              "Signin"
            )}
          </PrimaryButton>
        </Wrapper>
      </Wrapper>
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
};

export default Signin;
