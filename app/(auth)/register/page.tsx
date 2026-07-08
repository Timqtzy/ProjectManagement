import Link from "next/link"

export default function RegisterPage() {
  return (
    <form className="auth-panel">
      <div>
        <p className="eyebrow">Start clean</p>
        <h1>Create your workspace</h1>
      </div>
      <input aria-label="Name" placeholder="Name" />
      <input aria-label="Email" placeholder="Email" type="email" />
      <input aria-label="Password" placeholder="Password" type="password" />
      <button className="primary-link" type="button">
        Register
      </button>
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </form>
  )
}
