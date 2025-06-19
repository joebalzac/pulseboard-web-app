import { useState } from "react";
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
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white px-6 py-4 border-t border-gray-200 flex gap-3"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition"
        >
          {isPending ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};
