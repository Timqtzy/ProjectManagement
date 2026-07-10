import Link from "next/link"

import { sidebarNavigation } from "@/lib/constants/navigation"

export default function MobileMenu() {
  return (
    <nav className="mobile-menu" aria-label="Mobile">
      {sidebarNavigation.map((item:any) => (
        <Link key={item.href} href={item.href}>
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
