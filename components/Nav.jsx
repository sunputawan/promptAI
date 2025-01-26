"use client"

import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders} from "next-auth/react"

const Nav = () => {
    const {data: session} = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, []);


    const handleSignOut = () => {
        // Redirect to the home page
        signOut({ callbackUrl: '/' });
    };

    const handleSignIn = async (providerId) => {
        const result = await signIn(providerId, {
            callbackUrl: "/",
        });
    }
    return (
        <nav className="flex justify-between w-full mt-3 mb-16 max-sm:mb-5 pt-3">
            <Link href="/" className="flex gap-2 justify-center">
                <Image 
                    src="/assets/images/logo.svg"
                    alt="PromptAI Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="mt-1 ml-1 font-satoshi font-semibold text-lg max-sm:text-2xl text-black tracking-wide">
                    PromptAI
                </p>
            </Link>

        

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" 
                        className="rounded-full border border-black bg-black 
                        py-1.5 px-5 text-white transition-all
                        hover:bg-white hover:text-black
                        text-center text-sm font-inter
                        flex items-center justify-center">
                            Create Post
                        </Link>

                        <button type="button" onClick={handleSignOut}
                        className="rounded-full border border-black bg-transparent
                        py-1.5 px-5 text-black transition-all
                        hover:bg-black hover:text-white
                        text-center text-sm font-inter
                        flex items-center justify-center">
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image 
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full cursor-pointer"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ): (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => handleSignIn(provider.id)}
                                className="rounded-full border border-black bg-black
                                py-1.5 px-5 text-white transition-all
                                hover:bg-white hover:text-black
                                text-center text-sm font-inter
                                flex items-center justify-center"
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image 
                            src={session?.user.image}
                            width={45}
                            height={45}
                            className="rounded-full cursor-pointer"
                            alt="profile"
                            onClick={() => settoggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[150px] flex flex-col gap-2 justify-center items-end transition drop-shadow-lg">
                                <Link href="/profile"
                                className="text-sm font-inter text-gray-500 hover:text-gray-700 font-medium"
                                onClick={() => settoggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link href="/create-prompt"
                                className="text-sm font-inter text-gray-500 hover:text-gray-700 font-medium"
                                onClick={() => settoggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button type="button" 
                                onClick={() => {
                                    settoggleDropdown(false);
                                    handleSignOut();
                                }}
                                className="mt-5 w-full black_btn"
                                >
                                    signOut
                                </button>
                            </div>
                        )}
                    </div>
                ): (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={() => handleSignIn(provider.id)}
                            className="rounded-full border border-black bg-black
                            py-1.5 px-5 text-white transition-all
                            hover:bg-white hover:text-black
                            text-center text-sm font-inter
                            flex items-center justify-center"
                        >
                            Sign In
                        </button>
                    ))}
                </>
                )}
            </div>
        </nav>
    )
}

export default Nav