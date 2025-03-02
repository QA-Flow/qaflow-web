import Link from "next/link";

export default function Navbar() {
    const links = [
        { name: "Sign In", href: "/login" },
        { name: "Sign Up", href: "/register" },
    ];

    return (
        <div className="navbar w-full">
            <div className="mx-2 flex-1 px-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    QA Flow
                </span>
            </div>
            <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} className="text-black">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}