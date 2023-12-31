'use client'
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';

function RegisterForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cssSpinner, setCSS] = useState("hidden");
    const [isDisabled,setDisabled] =useState(false)
    const defaultProfilePic = 'https://firebasestorage.googleapis.com/v0/b/blog-astro-f0c8b.appspot.com/o/Default_pfp.jpg?alt=media&token=f15fab24-7ab9-4bc5-a16c-830fd2b547d6'

    const handleRegister =  (e) => {
        e.preventDefault();
        // Check all inputs have been filled
        if (!email || !password || !name) {
            return alert(
                "Missing form data."
            );
        }

        // Set button disable to prevent multiple clicks
        setDisabled(true);

        // To add and remove "register" text. Also make spinner appear.
        const loginText = document.getElementById("btn-text");
        const loginBtn = document.getElementById("login-btn")
        loginText.remove();
        setCSS('');


        createUserWithEmailAndPassword(auth, email, password).then(
            (userCred) => {
                updateProfile(userCred.user, {
                    displayName: name,
                    photoURL: defaultProfilePic,
                }).then(
                    router.push("posts")
                ).catch((err) => {
                    console.log(err)
                })
            }
        ).catch((err)=>{
            if (err.code == "auth/email-already-in-use"){
                loginBtn.append(loginText)
                setCSS('hidden')
                alert("This email already exists. Please check again.")
            }else{
                console.log(err)
            }
        })
    }
  return (
    <form className="flex flex-col text-lg" >

        <label htmlFor="name">Name :</label>
        <input required onChange={(e) => {setName(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="text" name="name" id="name" />

        <label htmlFor="email">Email :</label>
        <input required onChange={(e) => {setEmail(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="email" name="email" id="email" />

        <label htmlFor="password">Password :</label>
        <input required onChange={(e) => {setPassword(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="password" name="password" id="password" />
        
        <button disabled={isDisabled} id="login-btn" className="bg-indigo-500 hover:bg-indigo-600 duration-300 text-white border-2  border-black rounded w-max px-3 py-1" type="submit">
          <div onClick={handleRegister} id="btn-text">Register</div>
          <div id="spinner" className={`loader-sm ${cssSpinner}`}></div>
        </button>
      </form>
  )
}

export default RegisterForm