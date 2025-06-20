import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loadMessages, saveMessages } from "../utilities/messageStorage";

type Message = {
  id: string;
  text: string;
  createdAt: string;
};

let mockMessages: Message[] = loadMessages();

export const useMessages = () => {
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return [...mockMessages];
    },
    refetchInterval: 2000,
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
      await new Promise((res) => setTimeout(res, 500));
      mockMessages.push(newMsg);
      saveMessages(mockMessages);
      return newMsg;
    },

    onMutate: async ({ text }) => {
      await queryClient.cancelQueries({ queryKey: ["messages"] });

      const previousMessages =
        queryClient.getQueryData<Message[]>(["messages"]) || [];

      const optimisticMsg: Message = {
        id: "temp-" + Date.now(),
        text,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        ["messages"],
        [...previousMessages, optimisticMsg]
      );

      return { previousMessages };
    },

    onError: (err, _, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(["messages"], context.previousMessages);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      mockMessages = mockMessages.filter((msg) => msg.id !== id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
