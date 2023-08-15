'use client'
import { useState } from "react";

import { db } from "../../../firebase/firebase"
import { doc, setDoc } from "firebase/firestore"
import Image from "next/image";


export default function Test() {

    const [photo, setPhoto] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [difficulty, setDifficulty] = useState("Beginner");

    const fileCSSloading = "bg-neutral-400 text-neutral-500";
    const fileCSS = "bg-neutral-300 border-2 border-neutral-500 hover:bg-neutral-400 cursor-pointer";

    const handlePicChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target .files[0])
        }
    }
    return(
        <>
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-neutral-500 shadow-md p-10 rounded  w-1280 mx-auto mt-10">
                

                <h1 className="text-4xl mb-5">Create a Recipe</h1>
                <form autoComplete="off" className="flex flex-col">

                    <div className="grid grid-cols-6 gap-x-5">
                        <label className="col-span-3 flex flex-col w-full">Title :
                            <input className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-neutral-500 border-2" type="text" name="title" id="title" />
                        </label>
                        <label className="flex col-span-2 flex-col w-full">Difficulty :
                            <select className="bg-neutral-300 text-black h-9 rounded p-1 text-base mt-2 mb-5 border-neutral-500 border-2" name="difficulties" id="difficulties">
                                <option value="beginner">Beginner</option>
                                <option value="easy">Easy</option>
                                <option value="normal">Normal</option>
                                <option value="hard">Hard</option>
                                <option value="expert">Expert</option>
                            </select>
                        </label>
                        
                        <label className="col-span-1 w-full" htmlFor="price"> Price (US$) :
                            <input className="bg-neutral-300 text-black w-full rounded p-1 text-base mt-2 mb-5 border-neutral-500 border-2" type="number" name="price" id="price" />
                        </label>
                        
                    </div>

                    <label htmlFor="desc">Description :</label>
                    <textarea className="bg-neutral-300 text-black rounded p-1 text-base mt-2 mb-5 border-neutral-500 border-2" type="text" name="desc" id="desc" />

                    <label htmlFor="upload-label" className="mb-2">Image :</label>
                    <label id="upload-label" className={`${photo ? "text-indigo-500" : ""} ${isLoading? fileCSSloading : fileCSS} duration-300 px-3 py-1 w-max rounded text-lg shadow-sm text-center`}>
                        <input className="hidden" onChange={handlePicChange} id="file-input" type="file"/>
                        Upload File
                    </label>
                    <Image className="" src={""} alt="" />
                    
                    <button disabled={isLoading}  id="image-btn" className="bg-indigo-500 disabled:bg-indigo-300 hover:bg-indigo-600 border-2 border-indigo-600 duration-300 mt-8 w-max text-white px-3 py-1 rounded text-lg shadow-sm ">Submit Recipe</button>
                </form>
            </main>
        </>
    )
}