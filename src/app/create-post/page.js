'use client'
import { useState, useEffect } from "react";

import { db } from "../../../firebase/firebase";
import { doc, updateDoc, addDoc, collection,serverTimestamp } from "firebase/firestore";
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

    const createPost = async(e) => {
        if (title === "" || desc === "" || mainBody === "" || price === "0"){
            // alert("Please fill in the fields.");
            return
        }
        e.preventDefault();
        console.log(title,desc,price,difficulty);

        const docRef = await addDoc(collection(db, "posts"), {
            title: title,
            creatorID: currentUser.uid,
            likeCount: {likes: 1, users: [currentUser.uid]},
            description: desc,
            mainBody: mainBody,
            price: parseInt(price),
            createdAt: serverTimestamp(),
            difficulty: difficulty,
            image: "",
        })
        const fileRef = ref(storage, 'posts/' + docRef.id + '.png');

        setLoading(true);
        
        const snapshot = await uploadBytes(fileRef, photo);
        const photoURL = await getDownloadURL(fileRef);

        const postRef = doc(db,"posts", docRef.id);

        await updateDoc(postRef, {
            image: photoURL,
        })
        
        setLoading(false);

        router.push("/posts")

    }
    const handlePicChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target .files[0])
        }
        // document.getElementById("img-label-btn").textContent = "File Uploaded"
    }
    // const uploadImage = async(e) => {
    //     if (e.target.files[0]) {
    //         setPhoto(e.target .files[0])
    //     }
        
    //     const fileRef = ref(storage, 'posts/' + currentUser.uid + '.png');

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
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-black shadow-md p-5 sm:p-10 rounded  xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto mt-10">
                

                <h1 className="text-4xl mb-5">Create a Post</h1>
                <form autoComplete="off" className="flex flex-col">

                    <div className="grid grid-cols-6 gap-x-5">
                        <label className="md:col-span-3 col-span-6 flex flex-col w-full">Title
                            <input required onChange={(e) => {setTitle(e.target.value)}} className="bg-neutral-300 text-black rounded px-2 py-1 text-base mt-2 mb-5  border-neutral-500 border-2 placeholder:text-neutral-500" placeholder="Title" type="text" name="title" id="title" />
                        </label>
                        <label className="flex md:col-span-2 sm:col-span-3 col-span-6 flex-col w-full">Difficulty
                            <select required onChange={(e) => {setDifficulty(e.target.value)}} className="bg-neutral-300 text-black h-9 rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" name="difficulties" id="difficulties">
                                <option value="Beginner">Beginner</option>
                                <option value="Easy">Easy</option>
                                <option value="Normal">Normal</option>
                                <option value="Hard">Hard</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </label>
                        
                        <label className="md:col-span-1 sm:col-span-3 col-span-6 w-full" htmlFor="price"> Price (US$)
                            <input required onChange={(e) => {setPrice(e.target.value)}} className="bg-neutral-300 text-black w-full rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" placeholder="Price" type="number" name="price" id="price" />
                        </label>
                        
                    </div>

                    <label htmlFor="desc">Description</label>
                    <textarea rows={3} required maxLength={150} onChange={(e) => {setDesc(e.target.value)}} className="bg-neutral-300 text-black rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" placeholder="Quick description to attract people. Max 150 characters" type="text" name="desc" id="desc" />

                    {/* <label htmlFor="upload-label" className="mb-2">Image :</label> */}
                    {/* <label id="upload-label" className={`${photo ? "text-indigo-500" : ""} ${isLoading? fileCSSloading : fileCSS} duration-300 px-3 py-1 w-max rounded text-base shadow-sm text-center`}>
                        <input className="hidden" onChange={uploadImage} id="file-input" type="file"/>
                        Upload File
                    </label> */}
                    {/* <Image className="" src={""} alt="" /> */}

                    <label htmlFor="main-body">Body</label>
                    <textarea required onChange={(e) => {setBody(e.target.value)}} className="bg-neutral-300 text-black rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" placeholder="List all the details of the post. Ex. Ingredients, instructions, necessary machinery, etc." type="text" name="main-body" rows={15} id="main-body" />


                    <label htmlFor="image-btn">Image</label> 
                    <label id="img-label-btn" className={`${photo ? "text-indigo-500" : ""} ${isLoading? fileCSSloading : fileCSS} duration-300 px-3 py-1 mt-2 rounded text-lg shadow-sm text-center `}>
                        <input required disabled={isLoading} onChange={handlePicChange} className="hidden" id="file-input" type="file"/>
                        {photo?"File uploaded" : "Upload File"}
                    </label>
                    
                    <button disabled={isLoading} onClick={createPost}  id="image-btn" className="bg-indigo-500 disabled:bg-indigo-300 hover:bg-indigo-600 border-2 border-indigo-600 duration-300 mt-5 w-max text-white px-3 py-1 rounded text-base shadow-sm ">Submit Post</button>
                </form>
            </main>
        </>
    )
}