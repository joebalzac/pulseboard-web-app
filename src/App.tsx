import "./App.css";
import AppLayout from "./components/AppLayout";
import { MessageFeed } from "./components/MessageFeed";
import { MessageInput } from "./components/MessageInput";

function App() {
  return (
    <AppLayout>
      <MessageFeed />
      <MessageInput />
    </AppLayout>
  );
}

export default App;
