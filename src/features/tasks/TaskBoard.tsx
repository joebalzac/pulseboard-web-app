import { useAddTask, useTasks, useUpdateTask } from "../../hooks/useTasks";
import { DndContext } from "@dnd-kit/core";
import type { TaskStatus } from "../../hooks/types";
import TaskColumn from "./TaskColumn";

import { v4 as uuid } from "uuid";

const columns: TaskStatus[] = ["backlog", "in-progress", "done"];

export const TaskBoard = () => {
  const { data: tasks = [] } = useTasks();
  const updateTask = useUpdateTask();
  const addTask = useAddTask();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const taskId = active.id;
    const newStatus = over.id as TaskStatus;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    updateTask.mutate({ ...task, status: newStatus });
  };

  const handleAddDummyTask = () => {
    const newTask = {
      id: uuid(),
      title: "New Task " + Math.floor(Math.random() * 1000),
      status: "backlog" as TaskStatus,
      createdAt: new Date().toISOString(),
    };
    addTask.mutate(newTask);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top bar with Add button */}
      <div className="flex justify-between items-center px-6 py-3 bg-white border-b border-gray-200">
        <h1 className="text-lg font-semibold">Tasks</h1>
        <button
          onClick={handleAddDummyTask}
          className="bg-black text-black text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          ➕ Add Dummy Task
        </button>
      </div>

      {/* Task columns */}
      <div className="flex flex-1 overflow-x-auto gap-6 px-6 py-4 bg-[#f9fafb]">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((status) => (
            <TaskColumn
              key={status}
              id={status}
              title={status
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
              tasks={tasks.filter((t) => t.status === status)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};
