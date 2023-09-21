'use client'

import { db } from "../../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Page({params}) {
    const [post, setPost] = useState({})
    useEffect(() => {
        const getPost = async () => {
            const docRef = doc(db, "posts", params.id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setPost(docSnap.data());
            } else {
                console.log("No such document!");
                
            }
        }
        getPost()
    })
    return(
        <>
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-neutral-500 shadow-md p-10 rounded  w-1280 mx-auto mt-10"> 
                <h1 className="text-3xl font-bold mb-2 flex flex-row items-center justify-between">{post.title}</h1>
                <p className="text-xl mb-5"><span className="font-bold">Price:</span> ${post.price}</p>
                <p className={`w-full bg-${post.difficulty} mx-auto my-5 px-5 text-center text-white font-bold text-xl rounded border-2 border-black`}>Difficulty : {post.difficulty}</p>
                {post.image == "" ? <></> :<Image src={post.image} width={0} height={0} sizes="100vw" quality={50} className="w-full h-640 object-cover rounded mb-5 border-2 border-black"  alt="food photo"/>}

                <p className="whitespace-pre-wrap">{post.mainBody}</p>
            </main>
        </>
    )
}