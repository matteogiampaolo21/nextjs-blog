'use client'
import { useState, useEffect } from "react";

import { db } from "../../../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { auth, storage } from '../../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";


export default function Recipes() {

    const router = useRouter();
    
    const [isLoading, setLoading] = useState(false);
    const [currentUser, setUser] = useState({});

    const [recipes, setRecipes] = useState([]);



    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user){
                setUser(user);
            }else{
                console.log("user not signed in");
                router.push("/signin")
                
            }
        })

        const getRecipes = async () => {
            const querySnapshot = await getDocs(collection(db,"recipes"));
            const tempArray = []
            querySnapshot.forEach( (doc) => {
                let tempObj = doc.data();
                tempObj.id = doc.id;
                tempArray.push(tempObj)
            })
            setRecipes(tempArray)
            
        }
        getRecipes();
        
    }, [])

    

  
    return(
        <>
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-neutral-500 shadow-md p-10 rounded  w-1280 mx-auto mt-10">
                <h1 className="text-4xl mb-10">Recipes</h1>
                {recipes.map((recipe, index) => {
                    return(
                        <article key={index} className="mb-10 border-b-2 pb-5 border-neutral-300  ">
                            {recipe.image == "" ? <></> :<Image src={recipe.image} width={0} height={0} sizes="100vw" quality={50} className="w-full h-640 object-cover rounded mb-5"  alt="food photo"/>}
                            <h1 className="text-2xl py-1 flex flex-row gap-2 items-center"><span className="cursor-pointer" onClick={() => {router.push(`/recipes/${recipe.id}`)}} >{recipe.title}</span> <span className={`bg-${recipe.difficulty} px-2 rounded text-lg font-bold text-white`}>{recipe.difficulty}</span></h1>
                            <p className="text-neutral-600 mb-2">${recipe.price}</p>
                            <p>{recipe.description}</p>
                        </article>
                    )
                })}
            </main>
        </>
    )
}