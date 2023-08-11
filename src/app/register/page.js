'use client'
import React, { useState } from 'react';
import { auth } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';


export default function Register() {
   
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const defaultProfilePic = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(name,email,password)
    if (!email || !password || !name) {
      return alert(
        "Missing form data."
      );
    }

    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
        userCred.user.displayName = name;
        userCred.user.photoURL = defaultProfilePic
        console.log(userCred.user);
        router.push("/signin")
      }
    )
  }

  return (
    <section className="w-1280 mt-10 mx-auto bg-neutral-200 text-black border-2 p-10 rounded border-black">
      <h1 className="text-4xl mb-3">Register</h1>
      <p className="text-lg mb-5">Already have an account? <a className="text-indigo-500" href="/signin">Sign in</a></p>

      <form className="flex flex-col text-lg" >

        <label htmlFor="name">Name :</label>
        <input required onChange={(e) => {setName(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="text" name="name" id="name" />

        <label htmlFor="email">Email :</label>
        <input required onChange={(e) => {setEmail(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="email" name="email" id="email" />

        <label htmlFor="password">Password :</label>
        <input required onChange={(e) => {setPassword(e.target.value)}} className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-black border-2" type="password" name="password" id="password" />
        
        <button id="login-btn" className="bg-indigo-500 hover:bg-indigo-600 duration-300 text-white border-2  border-black rounded w-max px-3 py-1" type="submit">
          <div onClick={handleRegister} id="btn-text">Register</div>
          {/* <div id="spinner" className="loader hidden"></div> */}
        </button>
      </form>
    </section>
  )
}
