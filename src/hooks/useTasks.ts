import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loadTasks, saveTasks, type Task } from "./types";

let mockTasks: Task[] = loadTasks();

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      return [...mockTasks];
    },
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: Task) => {
      mockTasks.push(newTask);
      saveTasks(mockTasks);
      return newTask;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatesTask: Task) => {
      mockTasks = mockTasks.map((t) =>
        t.id === updatesTask.id ? updatesTask : t
      );
      saveTasks(mockTasks);
      return updatesTask;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
