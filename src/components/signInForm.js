'use client'
import React, { useState } from 'react'
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';


export const SignInForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            router.push("profile")
        })
        .catch((error) => {
            console.log(error)
            console.log(error.code)
            console.log(error.message)
            alert("Please check your email and password.")
        })
    }
    return (
        <form className="flex flex-col text-lg" >

            <label htmlFor="email">Email :</label>
            <input onChange={(e) => {setEmail(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="email" name="email" id="email" />

            <label htmlFor="password">Password :</label>
            <input onChange={(e) => {setPassword(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="password" name="password" id="password" />

            <button onClick={handleSignIn} id="login-btn" className="bg-indigo-500 hover:bg-indigo-600 duration-300 text-white border-2  border-black rounded w-max px-3 py-1" type="submit">
                <div id="btn-text">Login</div>
                <div id="spinner" className="loader hidden"></div>
            </button>
        </form>
    )
}

