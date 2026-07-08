import Link from "next/link"

export function Navbar() {
  return (
    <header className="app-navbar">
      <div>
        <p className="eyebrow">Workspace</p>
        <h1>Project management</h1>
      </div>
      <Link className="primary-link" href="/project/personal-os/board">
        Open board
      </Link>
    </header>
  )
}
