'use client'
import { useState, useEffect } from "react";

import { db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage } from '../../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";


export default function Recipes() {

    const router = useRouter();
    
    const [isLoading, setLoading] = useState(false);
    const [currentUser, setUser] = useState({});



    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user){
                setUser(user);
            }else{
                console.log("user not signed in");
                router.push("/signin")
                
            }
        })
        
    }, [])

  
    return(
        <>
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-neutral-500 shadow-md p-10 rounded  w-1280 mx-auto mt-10">
                <h1>Hello, this is the recipe page.</h1>
            </main>
        </>
    )
}