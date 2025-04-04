"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {cn} from "@/lib/utils";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  CONNECTING = "CONNECTING",
}

interface SavedMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const Agent = ({ userName, userId, interviewId, feedbackId, type, questions }: AgentProps) => {
  const router = useRouter()
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.ACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [lastMessage, setLastMessage] = useState<string>("")

  // useEffect(() => {
  //   const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
  //
  //   const onCallEnd = () => setCallStatus(CallStatus.FINISHED)
  //
  //   const onMessage = (message: Message) => {
  //     if (message.type === "transcript" && message.transcriptType === "final") {
  //       const newMessage = { role: message.role, content: message.transcript };
  //       setMessages(prev => [...prev,newMessage])
  //     }
  //   }
  //
  //   const onSpeechStart = () => setIsSpeaking(true);
  //
  //   const onSpeechEnd = () => setIsSpeaking(false);
  //
  //   const onError = (error:Error) => console.log(`Error: ${error}`);
  // }, [])



  return (
      <>
        <div className="call-view">
          <div className="card-interviewer">
            <div className="avatar">
              <Image src="/ai-avatar.png" alt="vapi" width={65} height={64} className="object-cover"/>
              {isSpeaking && <span className="animate-speak"/>}
            </div>
            <h3>AI Interviewer</h3>
          </div>
          <div className="card-border">
            <div className="card-content">
              <Image src="/user-avatar.png" alt="profile-image" width={539} height={539}
                     className="rounded-full object-cover size-[120px]"/>
              <h3>{userName}</h3>
            </div>
          </div>
        </div>
        {messages.length > 0 && (
            <div className="transcript-border">
              <div className="transcript">
                <p key={lastMessage} className={cn(
                    "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100")}>
                  {lastMessage}
                </p>
              </div>
            </div>
        )}

        <div className="w-full flex justify-center">
          {callStatus != "ACTIVE" ? (
              <button className="relative btn-call">
                <span className={cn("absolute animate-ping rounded-full opacity-75", callStatus !="CONNECTING" && "hidden")}/>
                <span className="relative">
                  {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : ". . ."}
                </span>
              </button>
          ) : (
              <button className="btn-disconnect">End</button>
          )}
        </div>
      </>
  )
};

export default Agent;
