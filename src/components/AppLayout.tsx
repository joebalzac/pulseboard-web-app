export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f2f5]">
      <div className="w-[1000px] h-[700px] flex shadow-lg border border-gray-200 rounded-xl overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-6">Pulseboard</h2>
          <nav className="space-y-3 text-sm">
            <div className="text-gray-600 hover:text-black cursor-pointer">
              📋 Feed
            </div>
            <div className="text-gray-600 hover:text-black cursor-pointer">
              ✅ Tasks
            </div>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col bg-[#f9fafb]">{children}</main>
      </div>
    </div>
  );
}
