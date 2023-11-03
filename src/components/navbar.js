'use client'
import React, { useEffect, useState,memo } from 'react'
import { signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from '../../firebase/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {

    const router = useRouter();
    const [isLoggedIn, setBool] = useState(false);
    const [isHide, setHide] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user){
                setBool(true);
            }else{
                setBool(false);
                return
            }
        })
        if(window.innerWidth > 639){
            setHide(false)
        }else{
            setHide(true)
        }
        window.addEventListener('resize', () => {
            if ( window.innerWidth > 639){
                setHide(false);
            }else{
                setHide(true);
            } 
        })
    },[])

    const handleLogOut = async () => {
        try{
            await signOut(auth)
            router.push("/signin")

        } catch(err){
            console.error(err)
        }
    }
    return (
        <header className="xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto bg-neutral-200 border-2 text-black border-black rounded shadow-md p-5 text-lg mt-10 ">
            <nav>
                <Nav isLoggedIn={isLoggedIn} isHide={isHide} />
            </nav>
        </header>
    )
}

const Nav = memo(function Nav({isLoggedIn, isHide}){
    return (
        <>
            {isLoggedIn ?
                <ul className={`flex  ${isHide ? 'flex-row' : 'flex-col'} sm:flex-row gap-5 sm:items-center h-max sm:h-11`}>
                    <button className='sm:hidden' onClick={() => {setHide(!isHide)}}><FontAwesomeIcon icon={faBars} className="text-black cursor-pointer pl-1 text-2xl" /> </button>
                    <Link className={`${isHide ? 'hidden' : 'mx-auto'} sm:mx-0 hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white active:bg-indigo-700`} href="/">Home</Link>
                    <Link className={`${isHide ? 'hidden' : 'mx-auto'} sm:mx-0 hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white active:bg-indigo-700`} href="/posts">Posts</Link>
                    <Link className={`${isHide ? 'hidden' : 'mx-auto'} sm:mx-0 hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white active:bg-indigo-700`} href="/create-post">Create</Link>
                    <Link className={`${isHide ? 'hidden' : 'mx-auto'} sm:mx-0 hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white active:bg-indigo-700`} href="/profile">Profile</Link>
                    <li className={`${isHide ? 'ml-auto' : 'mx-auto'} sm:mx-0 sm:ml-auto`}> <button onClick={handleLogOut} className="bg-indigo-500 text-white hover:bg-indigo-600 px-3 py-2 rounded font-bold duration-300 border-black border-2">Log out</button></li>
                </ul>
            :
                <ul className={`flex  ${isHide ? 'flex-row' : 'flex-col'} sm:flex-row gap-5 sm:items-center h-max sm:h-11`}>
                    <button className='sm:hidden' onClick={() => {setHide(!isHide)}}><FontAwesomeIcon icon={faBars} className="text-black cursor-pointer pl-1 text-2xl" /> </button>
                    <Link className={`${isHide ? '' : 'mx-auto'} sm:mx-0 hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white active:bg-indigo-700`} href="/">Home</Link>
                    <Link className={`${isHide ? 'hidden' : 'mx-auto'} sm:mx-0 hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white active:bg-indigo-700`} href="/register">Register</Link>
                    <Link className={`${isHide ? 'hidden' : 'mx-auto'} sm:mx-0 hover:bg-indigo-500 px-3 py-2 rounded font-bold duration-300  hover:text-white active:bg-indigo-700`} href="/signin">Sign In</Link>
                </ul>
            }
        </>
    )
})