"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryInput } from "@/Components/Inputs";
import { Wrapper, useMediaQuery } from "@/Components/Layouts";
import { PrimaryButton } from "@/Components/Buttons";
import { P } from "@/Components/Typography";
import Link from "next/link";
import { Spacer } from "@/Components/Spacer";
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../services/client";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Signin = () => {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const router = useRouter();
  const [mount, setMount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
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
          width={isResponsive ? "80%" : "480px"}
        >
          <P
            fontSize="41px"
            weight="600"
            fontColor="#6785FF"
            style={{
              textShadow: "5px 3px 3px rgba(103,133,255,0.3)",
            }}
          >
            Account Login
          </P>
          <Spacer height="20px" />
          <PrimaryInput
            height="50px"
            type="email"
            placeholder="Enter email"
            border="1px solid gray"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Wrapper width="100%" position="relative">
            <PrimaryInput
              height="50px"
              placeholder="Enter password"
              type={show ? "text" : "password"}
              border="1px solid gray"
              value={password}
              position="relative"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Wrapper
              position="absolute"
              bottom="13px"
              right="15px"
              pointer={true}
            >
              {show ? (
                <Wrapper
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <VisibilityIcon />
                </Wrapper>
              ) : (
                <Wrapper
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <VisibilityOffIcon />
                </Wrapper>
              )}
            </Wrapper>
          </Wrapper>
          <Wrapper
            mt="-13px"
            width="98%"
            className="d-flex flex-row align-items-center justify-content-end"
          >
            <Link href="#" className="mb-0">
              forget password?
            </Link>
          </Wrapper>
          {/* <Spacer height="10px" /> */}
          <PrimaryButton
            onClick={signin}
            width="300px"
            bg="#6785FF"
            hover="rgba(103,133,255,0.8)"
          >
            {loading ? (
              <Wrapper
                color="white"
                className="spinner-border"
                role="status"
              ></Wrapper>
            ) : (
              "Sign in"
            )}
          </PrimaryButton>
          <Wrapper className="d-flex flex-row align-items-center justify-content-center gap-2">
            <P className="mb-0" fontSize="16px">
              Not a member?
            </P>
            <Link href="/signup" className="" style={{ marginBottom: "2px" }}>
              Sign up
            </Link>
          </Wrapper>
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
          color="#6785FF"
          className="spinner-border"
          role="status"
        ></Wrapper>
      </Wrapper>
    </>
  );
};

export default Signin;
