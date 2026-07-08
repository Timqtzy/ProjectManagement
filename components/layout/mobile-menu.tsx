import Link from "next/link"

import { dashboardNavigation } from "@/lib/constants/navigation"

export function MobileMenu() {
  return (
    <nav className="mobile-menu" aria-label="Mobile">
      {dashboardNavigation.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
