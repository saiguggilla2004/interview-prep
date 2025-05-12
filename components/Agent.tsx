"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

// Define missing interfaces
interface AgentProps {
  userName: string;
  userId: string;
  type: string;
  interviewId: string;
  questions?: string[];
}

interface Message {
  type: string;
  role: "user" | "assistant" | "system";
  transcript?: string;
  transcriptType?: "final" | "interim";
}

interface SavedMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const Agent = ({ userName, userId, type ,interviewId,questions}: AgentProps) => {
  const router = useRouter();
  console.log("Workflow ID:", process.env.NEXT_PUBLIC_VAPI_WORK_FLOW_ID);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (
        message.type === "transcript" &&
        message.transcriptType === "final" &&
        message.transcript
      ) {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onError = (error: any) => {
      console.error("Vapi error:", error?.message || error);
    };

    // Set up event listeners
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    // Clean up event listeners
    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);


const handleGenerateFeedback = async (messages: SavedMessage[]) => {

  console.log("Generate Feedback here....");


  const {success,feedbackId:id}=await createFeedback({
    interviewId:interviewId!,
    userId:userId!,
    transcript:messages,
  })

  if(success && id)
  {
    router.push(`/interview/${interviewId}/feedback`);
  }
  else{
    console.log("error saving the feedback..");
    router.push("/");
  }
}

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED){
      if(type==="generate")
      {
        router.push("/")
      }
      else{
     handleGenerateFeedback(messages);
      }
    }
      // if (callStatus === CallStatus.FINISHED) {
      //   router.push("/");
      // }
  }, [callStatus, router,messages,userId,type]);




  const handleCall = async () => {
    try {
      setCallStatus(CallStatus.CONNECTING);



      const overrides = {
        clientMessages: [],
        serverMessages: [],
        variableValues: {
          username: userName,
          userid: userId ?? "unknown",
        },
      };

     if(type==="generate")
     {
      console.log("Calling vapi.start with:", overrides);
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORK_FLOW_ID!, overrides);
     }
     else{
       let formattedQuestions="";

       if(questions)
       {
        formattedQuestions=questions;
        formattedQuestions=questions.map((question)=>`- ${question}`).join("\n");
       }

       await vapi.start(interviewer, {
         variableValues: {
           questions: formattedQuestions,
         },
       });


     }

      
    } catch (err) {
      console.error("handleCall error:", err);
      setCallStatus(CallStatus.INACTIVE); // fallback to safe state
    }
  };

  const handleDisconnect = () => {
    try {
      vapi.stop();
      setCallStatus(CallStatus.FINISHED);
    } catch (error) {
      console.error("Failed to disconnect call:", error);
    }
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak"></span>}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="object-cover rounded-full size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={latestMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className="relative btn-call"
            onClick={handleCall}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            <span>{isCallInactiveOrFinished ? "Call" : ". . ."}</span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
