import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell flex">
      <Sidebar />
      <main className="app-main w-full">
          {/*<Navbar />*/}
        {children}
      </main>
    </div>
  )
}
