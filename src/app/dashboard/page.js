'use client'
import React, { useEffect, useState } from 'react'
import { auth } from '../../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Dashboard() {

    const router = useRouter()
    const [currentUser, setUser] = useState({})

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user){
                setUser(user)
            }else{
                console.log("user not signed in");
                router.push("/signin")
                
            }
        })
    }, [])

    return (
        <>
            <nav id="user-panel" className="flex flex-row justify-between bg-neutral-200 text-black border-2 border-black shadow-md p-10 rounded  w-1280 mx-auto mt-10">

                <section >
                    <h1 className="text-4xl mb-5">Welcome {currentUser.displayName} !</h1>
                    <p className="text-neutral-700 mb-5">We are happy to see you here.</p>

                    <article className="flex flex-row gap-x-5">
                    <input placeholder={currentUser.displayName} className="bg-neutral-300 placeholder:text-neutral-400 text-black rounded p-1 pl-2 text-base mt-2 border-black border-2" type="text" name="name" id="name" />
                    <button className="bg-indigo-500 h-max hover:bg-indigo-600 duration-300 text-white px-3 py-1 rounded text-lg shadow-sm mt-2 ">Change Name</button>
                    </article>

                </section>

                <figure className="flex flex-col justify-center items-center m-5">
                    {/* <img class="rounded-full w-40 shadow border-2 border-neutral-400"  src={currentUser.photoURL} alt=""/> */}
                    <Image loading='lazy' quality={1} width={160} height={160} className="rounded-full w-40 shadow border-2 border-neutral-400"  src={currentUser.photoURL} alt="" />
                    <figcaption className="mt-5 flex flex-col gap-3 ">
                    <label className="bg-neutral-300 hover:bg-neutral-400 duration-300 cursor-pointer px-3 py-1 rounded text-lg shadow-sm text-center">
                        <input className="hidden" id="file-input" type="file"/>
                        Upload File
                    </label>
                    <button id="image-btn" className="bg-indigo-500 hover:bg-indigo-600 duration-300 text-white px-3 py-1 rounded text-lg shadow-sm ">Change Image</button>
                    </figcaption>
                </figure>
                    

                

                
            </nav>

            <main className="flex flex-col">
                
            </main>
        </>
    )
}
