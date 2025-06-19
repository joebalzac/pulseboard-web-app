import { IoCloseSharp } from "react-icons/io5";
import { useDeleteMessage, useMessages } from "../hooks/useMessages";

export const MessageFeed = () => {
  const { data: messages, isLoading } = useMessages();
  const { mutate: deleteMessage } = useDeleteMessage();

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages?.map((msg) => (
        <>
          <div
            key={msg.id}
            className="flex items-end justify-between bg-white p-2 rounded-sm shadow-sm relative"
          >
            <p className="text-sm text-gray-800">{msg.text}</p>

            <div className="flex flex-col items-end">
              <IoCloseSharp
                className=" text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => deleteMessage(msg.id)}
              />
              <div className="text-xs text-gray-400 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
