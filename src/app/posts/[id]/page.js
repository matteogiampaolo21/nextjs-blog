'use client'

import { db } from "../../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
export default function Page({params}) {
    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const getPost = async () => {
            const docRef = doc(db, "posts", params.id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const obj = docSnap.data()
                let date = new Date(docSnap.data().createdAt.toDate())
                obj.postDate = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`
                setPost(obj);
                setLoading(false)
            } else {
                console.log("No such document!");
                alert("This post does not exist.")
                router.push("/posts")
                
            }
        }
        getPost()
    })
    return(
        <>
            {isLoading ?
                <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-black shadow-md p-10 rounded xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto mt-10">
                    <div className="loader"></div>
                </main>
            :
                <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-black shadow-md p-3 sm:p-10 rounded  xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto mt-10"> 
                    <h1 className="text-3xl font-bold mb-2 pt-3 sm:pt-0 flex flex-row items-center justify-between">{post.title}</h1>
                    <p className="text-xl mb-2"><span className="font-bold">Price:</span> ${post.price}</p>
                    <p className="text-neutral-700 mb-2">{post.postDate}</p>
                    <p className={`w-full bg-${post.difficulty} mx-auto my-5 px-5 text-center text-white font-bold text-xl rounded border-2 border-black`}>Difficulty : {post.difficulty}</p>
                    {post.image == "" ? <></> :<Image src={post.image} width={0} height={0} sizes="100vw" priority={true} quality={50} className="w-full h-320 sm:h-640 object-cover rounded mb-5 border-2 border-black"  alt="photo"/>}
                    <p className="whitespace-pre-wrap">{post.mainBody}</p>
                </main>
            }
        </>
    )
}