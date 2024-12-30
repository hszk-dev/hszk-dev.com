import Link from "next/link"
import { NavLink } from "./NavLink"

const links = [
    { href: '/', label: 'Home' },
    { href: '/profile', label: 'Profile' },
]

export function Header() {
    return (
        <header>
            <nav className="container flex items-center justify-between py-4 mx-auto">
                <Link href="/">hszk-dev.com</Link>
                <ul className="flex gap-4">
                    {links.map((link) => (
                        <NavLink key={link.href} href={link.href}>
                            {link.label}
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </header>
    )
}