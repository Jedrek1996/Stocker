"use client";
import { useState } from "react";
import { generateChatResponse } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const StockerAIPage = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate, isPending } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),

    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
    onError: (error) => {
      toast.error("Something went wrong...");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  // console.log("Messages:😳" + messages);

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      {messages.length === 0 && (
        <h1 className="m-auto text-primary text-2xl opacity-45">
          💬 Enter Your Message Below!
        </h1>
      )}
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role == "user" ? "👤" : "🤖";
          const bgBase = role == "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={` ${bgBase} flex py-6 -mx-8 px-8
               text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4 ">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending ? <span className="loading"></span> : null}
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="StockerAI"
            className="join-item input input-bordered w-full text-red-500"
            value={text}
            required
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className="join-item btn btn-primary"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Generating.." : " Ask Away"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockerAIPage;

// // Sending Data:

// mutate(text) triggers the mutation function you defined (generateChatResponse in this case).
// This sends the text (the message) to the backend server.
// Backend Processing:

// The backend processes the message (e.g., generating a response) and returns a result.
// Receiving Data:

// The frontend receives the result from the backend.
// You can then use this result to update the UI or perform other actions.
// So, mutate(text) is the mechanism that initiates communication with the backend, sends the message, and handles the backend response.
