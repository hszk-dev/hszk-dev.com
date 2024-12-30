import Link from "next/link"

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
                    {links.map(({ href, label }) => (
                        <a key={href} href={href}>{label}</a>
                    ))}
                </ul>
            </nav>
        </header>
    )
}