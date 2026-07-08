import Link from "next/link"

type Breadcrumb = {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      {items.map((item) =>
        item.href ? (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ) : (
          <span key={item.label}>{item.label}</span>
        )
      )}
    </nav>
  )
}
