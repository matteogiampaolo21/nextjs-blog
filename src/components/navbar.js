'use client'
import React, { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from '../../firebase/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export const Navbar = () => {

    const router = useRouter();
    const [isLoggedIn, setBool] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user){
                setBool(true);
            }else{
                setBool(false);
                return
            }
        })
    })

    const handleLogOut = async () => {
        try{
            await signOut(auth)
            router.push("/signin")

        } catch(err){
            console.error(err)
        }
    }
    return (
        <header className="xl:w-1280 mx-auto bg-neutral-200 border-2 text-black border-black rounded shadow-md p-5 text-lg mt-10 ">
            <nav>
                
                {isLoggedIn ?
                    <ul className="flex flex-row gap-5 items-center h-11">
                        <Link className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/">Home</Link>
                        <Link className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/posts">Posts</Link>
                        <Link className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/create-post">Create</Link>
                        <Link className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/profile">Profile</Link>
                        <li className='ml-auto'> <button onClick={handleLogOut} className="bg-indigo-500 text-white hover:bg-indigo-600 px-3 py-2 rounded font-bold duration-300 border-black border-2">Log out</button></li>
                    </ul>
                :
                    <ul className="flex flex-row gap-5 items-center h-11">
                        <Link className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/">Home</Link>
                        <Link className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/register">Register</Link>
                        <Link className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/signin">Sign In</Link>
                    </ul>
                }
            </nav>
        </header>
    )
}