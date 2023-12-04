'use client'
import React, { useState } from 'react'
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';


export const SignInForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cssSpinner, setCSS] = useState("hidden");
    const [isDisabled,setDisabled] =useState(false)

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Set button disable to prevent multiple clicks
        setDisabled(true)

        // To add and remove "register" text. Also make spinner appear.
        const loginText = document.getElementById("btn-text");
        const loginBtn = document.getElementById("login-btn")
        loginText.remove();
        setCSS('');

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            router.push("profile")
        })
        .catch((error) => {
            console.log(error.code)
            console.log(error.message)
            loginBtn.append(loginText)
            setCSS('hidden')
            setDisabled(false)
            alert("Please check your email and password.")
        })
    }
    return (
        <form className="flex flex-col text-lg" >

            <label htmlFor="email">Email :</label>
            <input onChange={(e) => {setEmail(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="email" name="email" id="email" />

            <label htmlFor="password">Password :</label>
            <input onChange={(e) => {setPassword(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="password" name="password" id="password" />

            <button disabled={isDisabled} onClick={handleSignIn} id="login-btn" className="bg-indigo-500 hover:bg-indigo-600 duration-300 text-white border-2  border-black rounded w-max px-3 py-1" type="submit">
                <div id="btn-text">Login</div>
                <div id="spinner" className={`loader-sm ${cssSpinner} `}></div>
            </button>
        </form>
    )
}

