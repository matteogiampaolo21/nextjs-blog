'use client'
import { useState, useEffect } from "react";

import { db } from "../../../firebase/firebase";
import { doc, addDoc, collection } from "firebase/firestore";
import { auth, storage } from '../../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";


export default function Create() {

    const router = useRouter();

    const [photo, setPhoto] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [currentUser, setUser] = useState({});

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [mainBody, setBody] = useState("");
    const [price, setPrice] = useState("0");
    const [difficulty, setDifficulty] = useState("Beginner");

    const fileCSSloading = "bg-neutral-400 text-neutral-500";
    const fileCSS = "bg-neutral-300 border-2 border-neutral-500 hover:bg-neutral-400 cursor-pointer";

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

    const createRecipe = async(e) => {
        e.preventDefault();
        console.log(title,desc,price,difficulty);

        await addDoc(collection(db, "recipes"), {
            title: title,
            description: desc,
            mainBody: mainBody,
            price: parseInt(price),
            difficulty: difficulty,
            image: "",
        })

        router.push("/recipes")
    }

    // const uploadImage = async(e) => {
    //     if (e.target.files[0]) {
    //         setPhoto(e.target .files[0])
    //     }
        
    //     const fileRef = ref(storage, 'recipes/' + currentUser.uid + '.png');

    //     setLoading(true);
        
    //     const snapshot = await uploadBytes(fileRef, photo);
    //     const photoURL = await getDownloadURL(fileRef);

    //     await updateProfile(currentUser, {photoURL});
        
    //     setLoading(false);
    //     reload();
    //     alert("Photo changed!");
    // }
    return(
        <>
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-neutral-500 shadow-md p-10 rounded  w-1280 mx-auto mt-10">
                

                <h1 className="text-4xl mb-5">Create a Recipe</h1>
                <form autoComplete="off" className="flex flex-col">

                    <div className="grid grid-cols-6 gap-x-5">
                        <label className="col-span-3 flex flex-col w-full">Title :
                            <input onChange={(e) => {setTitle(e.target.value)}} className="bg-neutral-300 text-black rounded px-2 py-1 text-base mt-2 mb-5  border-neutral-500 border-2 placeholder:text-neutral-500" placeholder="Title" type="text" name="title" id="title" />
                        </label>
                        <label className="flex col-span-2 flex-col w-full">Difficulty :
                            <select onChange={(e) => {setDifficulty(e.target.value)}} className="bg-neutral-300 text-black h-9 rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" name="difficulties" id="difficulties">
                                <option value="beginner">Beginner</option>
                                <option value="easy">Easy</option>
                                <option value="normal">Normal</option>
                                <option value="hard">Hard</option>
                                <option value="expert">Expert</option>
                            </select>
                        </label>
                        
                        <label className="col-span-1 w-full" htmlFor="price"> Price (US$) :
                            <input onChange={(e) => {setPrice(e.target.value)}} className="bg-neutral-300 text-black w-full rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" placeholder="Price" type="number" name="price" id="price" />
                        </label>
                        
                    </div>

                    <label htmlFor="desc">Description :</label>
                    <textarea maxLength={150} onChange={(e) => {setDesc(e.target.value)}} className="bg-neutral-300 text-black rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" placeholder="Quick description to attract people. Max 150 characters" type="text" name="desc" id="desc" />

                    {/* <label htmlFor="upload-label" className="mb-2">Image :</label> */}
                    {/* <label id="upload-label" className={`${photo ? "text-indigo-500" : ""} ${isLoading? fileCSSloading : fileCSS} duration-300 px-3 py-1 w-max rounded text-base shadow-sm text-center`}>
                        <input className="hidden" onChange={uploadImage} id="file-input" type="file"/>
                        Upload File
                    </label> */}
                    {/* <Image className="" src={""} alt="" /> */}

                    <label htmlFor="main-body">Body :</label>
                    <textarea onChange={(e) => {setBody(e.target.value)}} className="bg-neutral-300 text-black rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" placeholder="List all the details of the recipe. Ex. Ingredients, instructions, necessary machinery, etc." type="text" name="main-body" rows={15} id="main-body" />
                    
                    <button disabled={isLoading} onClick={createRecipe}  id="image-btn" className="bg-indigo-500 disabled:bg-indigo-300 hover:bg-indigo-600 border-2 border-indigo-600 duration-300 mt-5 w-max text-white px-3 py-1 rounded text-base shadow-sm ">Submit Recipe</button>
                </form>
            </main>
        </>
    )
}