'use client'

import { db } from "../../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Page({params}) {
    const [recipe, setRecipe] = useState({})
    useEffect(() => {
        const getRecipe = async () => {
            const docRef = doc(db, "recipes", params.id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setRecipe(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        getRecipe()
    })
    return(
        <>
            <section className={`xl:w-1280 bg-${recipe.difficulty} mx-auto mt-10 mb-5 px-5 text-center font-bold text-xl rounded border-2 `}>Difficulty : {recipe.difficulty}</section>
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-neutral-500 shadow-md p-10 rounded  w-1280 mx-auto"> 
                <h1 className="text-3xl font-bold mb-2 flex flex-row items-center justify-between">{recipe.title}</h1>
                <p className="text-xl mb-5"><span className="font-bold">Price:</span> ${recipe.price}</p>
                {recipe.image == "" ? <></> :<Image src={recipe.image} width={0} height={0} sizes="100vw" quality={50} className="w-full h-640 object-cover rounded mb-5"  alt="food photo"/>}

                <p className="whitespace-pre-wrap">{recipe.mainBody}</p>
            </main>
        </>
    )
}