import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { usePostMessage } from "../hooks/useMessages";

export const MessageInput = () => {
  const [text, setText] = useState("");
  const { mutate, isPending } = usePostMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    mutate({ text });
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-gray-200 bg-white flex items-center gap-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border text-black border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="text-black p-2 hover:bg-gray-100 rounded-full transition"
        aria-label="Send"
      >
        <IoSendSharp className="text-white" />
      </button>
    </form>
  );
};
