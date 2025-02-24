"use client";

import { auth } from "@/auth";
import { SessionProvider, useSession } from "next-auth/react";

import Link from "next/link";
import { useEffect } from "react";

const DashboardPage = () => {
    const { data: session } = useSession();
    console.log(session);

    useEffect(() => {
        console.log(session);
    }, []);

    return (
            <main>
                <Link className="home-link" href="/">
                    ◄ Home
                </Link>
                <section className="main-container">
                    <h1 className="header-text">This is a Protected Page</h1>
                    <p>Current User username : {session?.user?.email || "None"}</p>
                </section>
            </main>
    );
};

export default DashboardPage;