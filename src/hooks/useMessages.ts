import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Message = {
  id: string;
  text: string;
  createdAt: string;
};

let mockMessages: Message[] = [
  {
    id: "1",
    text: "Welcome to Pulseboard!",
    createdAt: new Date().toISOString(),
  },
];

export const useMessages = () => {
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return [...mockMessages];
    },
  });
};

export const usePostMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      const newMsg: Message = {
        id: String(Date.now()),
        text,
        createdAt: new Date().toISOString(),
      };
      mockMessages.push(newMsg);
      return newMsg;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
