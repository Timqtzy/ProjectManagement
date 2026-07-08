import Link from "next/link"

export default function LoginPage() {
  return (
    <form className="auth-panel">
      <div>
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to ClickDown</h1>
      </div>
      <input aria-label="Email" placeholder="Email" type="email" />
      <input aria-label="Password" placeholder="Password" type="password" />
      <button className="primary-link" type="button">
        Log in
      </button>
      <p>
        Need an account? <Link href="/register">Register</Link>
      </p>
    </form>
  )
}
