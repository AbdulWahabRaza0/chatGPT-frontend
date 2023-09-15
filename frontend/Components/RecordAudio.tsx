import { useWhisper } from "@chengsokdara/use-whisper";
import { useState, useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PauseIcon from "@mui/icons-material/Pause";
import { Wrapper, useMediaQuery } from "./Layouts";
import { RecentState } from "./Context/Recents";
const RecordAudio = () => {
  const isResponsive = useMediaQuery({ query: "(max-width: 756px)" });

  const {
    recording,
    speaking,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // YOUR_OPEN_AI_TOKEN
  });
  const [mount, setMount] = useState(false);
  const [pause, setPause] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const {
    recordedText,
    setRecordedText,
    recordLoading,
    setRecordLoading,
  }: any = RecentState();
  useEffect(() => {
    setMount(true);
  }, []);
  useEffect(() => {
    if (Boolean(transcript.text)) {
      setRecordedText(transcript.text);
      setRecordLoading(false);
      setMicOn(false);
    } else {
      setRecordLoading(false);
      setMicOn(false);
    }
    console.log("This is transcript text ", transcript);
  }, [transcript.text]);
  return (
    mount && (
      <>
        {!micOn && !recordLoading && (
          <>
            <Wrapper
              pointer={true}
              onClick={async () => {
                await startRecording();
                setMicOn(true);
              }}
            >
              <MicOffIcon style={{ fontSize: isResponsive ? "16px" : "" }} />
            </Wrapper>
          </>
        )}
        {micOn && (
          <>
            <Wrapper className="d-flex flex-row align-items-center gap-2">
              <Wrapper
                pointer={true}
                onClick={async () => {
                  setRecordLoading(true);
                  await stopRecording();

                  setPause(false);
                }}
              >
                {recordLoading ? (
                  <>
                    {" "}
                    <div
                      style={{
                        fontSize: isResponsive ? "16px" : "18px",
                        width: isResponsive ? "16px" : "18px",
                        height: isResponsive ? "16px" : "18px",
                      }}
                      className="spinner-border text-success"
                      role="status"
                    ></div>
                  </>
                ) : (
                  <MicIcon
                    style={{
                      color: !pause ? "green" : "",
                      fontSize: isResponsive ? "16px" : "",
                    }}
                  />
                )}
              </Wrapper>
              {!recordLoading && (
                <Wrapper
                  pointer={true}
                  onClick={() => {
                    pauseRecording();
                    setPause(true);
                  }}
                >
                  <PauseIcon
                    style={{
                      color: pause ? "green" : "",
                      fontSize: isResponsive ? "16px" : "",
                    }}
                  />
                </Wrapper>
              )}
            </Wrapper>
          </>
        )}

        {/* <p>Transcribed Text: {transcript.text}</p> */}
      </>
    )
  );
};
export default RecordAudio;
