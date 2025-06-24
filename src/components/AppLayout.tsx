export default function AppLayout({
  children,
  onSelectView,
  activeView,
}: {
  children: React.ReactNode;
  onSelectView: (view: "messages" | "tasks") => void;
  activeView: "messages" | "tasks";
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f2f5]">
      <div className="w-[1000px] h-[700px] flex shadow-lg border border-gray-200 rounded-xl overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-6">Pulseboard</h2>
          <nav className="space-y-3 text-sm">
            <div
              onClick={() => onSelectView("messages")}
              className={`cursor-pointer ${
                activeView === "messages"
                  ? "text-black font-semibold"
                  : "text-gray-600"
              }`}
            >
              📋 Feed
            </div>
            <div
              onClick={() => onSelectView("tasks")}
              className={`cursor-pointer ${
                activeView === "tasks"
                  ? "text-black font-semibold"
                  : "text-gray-600"
              }`}
            >
              ✅ Tasks
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-[#f9fafb]">{children}</main>
      </div>
    </div>
  );
}
