import { useState } from "react";
import "./App.css";
import AppLayout from "./components/AppLayout";
import { MessageFeed } from "./components/MessageFeed";
import { MessageInput } from "./components/MessageInput";
import { TaskBoard } from "./features/tasks/TaskBoard";

function App() {
  const [view, setView] = useState<"messages" | "tasks">("messages");

  return (
    <AppLayout onSelectView={setView} activeView={view}>
      {view === "messages" && (
        <>
          <MessageFeed />
          <MessageInput />
        </>
      )}
      {view === "tasks" && <TaskBoard />}
    </AppLayout>
  );
}

export default App;
