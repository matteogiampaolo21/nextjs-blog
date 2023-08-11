import React from 'react'

export const Navbar = () => {
    return (
        <header class="xl:w-1280 mx-auto bg-neutral-800 border-2 border-black rounded shadow-md p-5 text-lg mt-10">
            <nav>
                <ul class="flex flex-row gap-5 items-center">
                    <li><a class="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/">Home</a></li>
                    <li><a class="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/register">Register</a></li>
                    <li><a class="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/signin">Sign In</a></li>
                    {/* {isLoggedIn ? 
                        <>
                        <li><a class="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/dashboard">Dashboard</a></li>
                        <li class="ml-auto">
                            <form action="/api/auth/signout">
                                <button class="bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded font-bold duration-300 hover:text-white">Log out</button> 
                            </form>
                        </li>
                        </>
                        : 
                        <>
                        <li><a class="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/register">Register</a></li>
                        <li><a class="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/signin">Sign In</a></li>
                        </>
                    } */}
                </ul>
            </nav>
        </header>
    )
}