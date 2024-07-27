"use client";
import { useState } from "react";
import Chat from "@/components/chat/Chat";

const StockerAIPage = () => {
  const [text, setText] = useState("");
  return (
    <div>
      <Chat />
    </div>
  );
};

export default StockerAIPage;
