'use client'
import React, { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from '../../firebase/firebase';
import { useRouter } from 'next/navigation';

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
        <header className="xl:w-1280 mx-auto bg-neutral-800 border-2 border-black rounded shadow-md p-5 text-lg mt-10 ">
            <nav>
                
                {isLoggedIn ?
                    <ul className="flex flex-row gap-5 items-center h-11">
                        <li><a className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/">Home</a></li>
                        <li><a className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/test">Testing</a></li>
                        <li><a className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/profile">Profile</a></li>
                        <li className='ml-auto'> <button onClick={handleLogOut} className="bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded font-bold duration-300 hover:text-white">Log out</button></li>
                    </ul>
                :
                    <ul className="flex flex-row gap-5 items-center h-11">
                        <li><a className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/">Home</a></li>
                        <li><a className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/register">Register</a></li>
                        <li><a className="hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white" href="/signin">Sign In</a></li>
                    </ul>
                }
            </nav>
        </header>
    )
}