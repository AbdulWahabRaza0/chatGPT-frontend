"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
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
import axios from "axios";

const Signup = () => {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const router = useRouter();
  const [mount, setMount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picUrl, setPicUrl] = useState("");
  const [picMetaData, setPicMetaData] = useState({});
  const signup = async () => {
    try {
      setLoading(true);
      const res = await client.post("/user", {
        name,
        email,
        password,
        picUrl,
        picMetaData,
      });

      if (res.status === 201) {
        localStorage.setItem("gptToken", res.data.token);
        router.push("/");
        setLoading(false);
        toast.success("Registration Successful", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        setLoading(false);
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
  const uploadImage = async (file: any) => {
    setLoading(true);
    if (!file) {
      toast.error("Image not Selected!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      return;
    }
    const formData = new FormData();
    console.log("this is data ", file);
    formData.append("file", file);
    formData.append("cloud_name", "raza123");
    formData.append("upload_preset", "global-gpt-app");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/raza123/image/upload",
        formData
      );

      if (res.status === 200) {
        const data = res.data;
        setPicUrl(data.secure_url);
        setPicMetaData({
          assetId: data.asset_id,
          name: data.original_filename,
          publicId: data.public_id,
          signature: data.signature,
        });
        setLoading(false);
        toast.success("image uploaded!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        setLoading(false);
        toast.error("unable to Select image!", {
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
    } catch (error) {
      setLoading(false);
      console.error(error);
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
          <Wrapper className="text-center">
            <P
              className="mb-0"
              lHeight="17px"
              fontSize="38px"
              weight="600"
              fontColor="#6785FF"
              style={{
                textShadow: "5px 3px 3px rgba(103,133,255,0.3)",
              }}
            >
              Create Account
            </P>
          </Wrapper>

          <Spacer height="20px" />
          <PrimaryInput
            height="50px"
            type="text"
            placeholder="Enter name"
            border="1px solid gray"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
            width="100%"
            className="d-flex flex-row align-items-center justify-content-start"
          >
            <Button sx={{ width: "250px" }} component="span">
              <input
                accept="image/*"
                type="file"
                onChange={(e: any) => {
                  uploadImage(e.target.files[0]);
                }}
              />
            </Button>
          </Wrapper>
          {/* <Spacer height="10px" /> */}
          <PrimaryButton
            onClick={signup}
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
              "Sign up"
            )}
          </PrimaryButton>
          <Wrapper className="d-flex flex-row align-items-center justify-content-center gap-2">
            <P className="mb-0" fontSize="16px">
              Already a member?
            </P>
            <Link href="/signin" className="" style={{ marginBottom: "2px" }}>
              Sign in
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

export default Signup;
