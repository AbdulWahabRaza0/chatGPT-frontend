import { useWhisper } from "@chengsokdara/use-whisper";
import { useState, useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PauseIcon from "@mui/icons-material/Pause";
import { Wrapper } from "./Layouts";
import { RecentState } from "./Context/Recents";
const RecordAudio = () => {
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
    } else {
      setRecordLoading(false);
    }
    console.log("This is transcript text ", transcript);
  }, [transcript.text]);
  useEffect(() => {
    console.log("This is data for transcript ", transcript);
  }, [transcript]);
  return (
    mount && (
      <>
        {!micOn && (
          <>
            <Wrapper
              pointer={true}
              onClick={async () => {
                await startRecording();
                setMicOn(true);
              }}
            >
              <MicOffIcon />
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
                  setMicOn(false);
                  setPause(false);
                }}
              >
                {recordLoading ? (
                  <>
                    {" "}
                    <div
                      style={{
                        fontSize: "18px",
                        width: "18px",
                        height: "18px",
                      }}
                      className="spinner-border text-success"
                      role="status"
                    ></div>
                  </>
                ) : (
                  <MicIcon style={{ color: !pause ? "green" : "" }} />
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
                  <PauseIcon style={{ color: pause ? "green" : "" }} />
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
