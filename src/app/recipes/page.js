'use client'
import { useState, useEffect } from "react";

import { db } from "../../../firebase/firebase";
import { getDocs, collection,doc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth } from '../../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Image from "next/image";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";



export default function Recipes() {

    const router = useRouter();
    
    const [isLoading, setLoading] = useState(false);
    const [currentUser, setUser] = useState({});

    const [recipes, setRecipes] = useState([]);

    const yourPostCss = "text-red-500";
    const otherPostCss = "text-neutral-400 cursor-pointer duration-200 hover:text-red-400";


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

    
    const handleLike = async (recipeID, userArray, likesNum) => {

        const recipeRef = doc(db, "recipes", recipeID);
        if (userArray.includes(currentUser.uid)){
            const index = userArray.indexOf(currentUser.uid);
            userArray.splice(index,1)
            await updateDoc(recipeRef, {
                "likeCount.likes": likesNum - 1,
                "likeCount.users": userArray,
            });

        }else {
            
            await updateDoc(recipeRef, {
                "likeCount.likes": likesNum + 1,
                "likeCount.users": userArray.concat(currentUser.uid)
            });

        }

    }
  
    return(
        <>  
            
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-neutral-500 shadow-md p-10 rounded  w-1280 mx-auto mt-10">
                <h1 className="text-4xl mb-10">Recipes</h1>
                {recipes.map((recipe, index) => {
                    return(
                        <article key={index} className="mb-10 border-b-2 pb-5 border-neutral-300  ">
                            {recipe.image == "" ? <></> :<Image loading={index === 0 ? "eager" : "lazy"} src={recipe.image} width={0} height={0} sizes="100vw" quality={50} className="w-full h-640 object-cover rounded mb-5 border-2 border-black"  alt="food photo"/>}
                            <h1 className="text-2xl py-1 flex flex-row gap-2 items-center"><span className="cursor-pointer hover:text-violet-500 duration-200" onClick={() => {router.push(`/recipes/${recipe.id}`)}} >{recipe.title}</span> <span className={`bg-${recipe.difficulty} px-2 rounded text-lg font-bold text-white`}>{recipe.difficulty}</span></h1>
                            <p className="text-neutral-600 mb-2">${recipe.price}</p>
                            <p>{recipe.description}</p>
                            <aside className="flex flex-row items-center gap-2">
                                <button onClick={() => {handleLike(recipe.id,recipe.likeCount.users,recipe.likeCount.likes)}} disabled={recipe.creatorID === currentUser.uid ? true : false}><FontAwesomeIcon icon={faHeart}  className={`${recipe.likeCount.users.includes(currentUser.uid)? yourPostCss : otherPostCss} text-xl  m-0`} /></button>
                                <p>{recipe.likeCount.likes} </p>
                            </aside>
                        </article>
                    )
                })}
            </main>
        </>
    )
}