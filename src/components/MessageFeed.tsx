import { useDeleteMessage, useMessages } from "../hooks/useMessages";

export const MessageFeed = () => {
  const { data: messages, isLoading } = useMessages();
  const { mutate: deleteMessage } = useDeleteMessage();

  if (isLoading) return <div>Loading....</div>;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#f9fafb]">
      {messages?.map((msg) => (
        <div
          key={msg.id}
          className="relative bg-white p-4 rounded-xl shadow-sm"
        >
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xs"
            onClick={() => deleteMessage(msg.id)}
          >
            X
          </button>
          <p className="text-sm text-gray-800">{msg.text}</p>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(msg.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};
