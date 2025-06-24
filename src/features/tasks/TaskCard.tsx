import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../hooks/types";

export default function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 rounded-md shadow cursor-grab border"
    >
      <p className="text-sm font-medium text-gray-800">{task.title}</p>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
