import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import type { Task, TaskStatus } from "../../hooks/types";

export default function TaskColumn({
  id,
  title,
  tasks,
}: {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="w-[300px] flex-shrink-0 bg-gray-100 p-4 rounded-lg shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
