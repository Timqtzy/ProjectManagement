import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Navbar />
        {children}
      </main>
    </div>
  )
}
