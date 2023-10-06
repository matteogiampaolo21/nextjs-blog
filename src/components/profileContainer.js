
'use client'
import React, { useEffect, useState } from 'react'
import { auth, storage } from '../../firebase/firebase';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from 'next/navigation';
import Image from "next/image";

import LikePostsCard from './likePostsCard';
import YourPostsCard from './yourPostsCard';
function ProfileContainer() {
    
    const router = useRouter()

    const [currentUser, setUser] = useState({});
    const [nameChange, setNameChange] = useState("")
    const [photo, setPhoto] = useState(null);
    const [isLoading, setLoading] = useState(false);
    
    const fileCSSloading = "bg-neutral-400 text-neutral-500";
    const fileCSS = "bg-neutral-300 border-2 border-neutral-400 hover:bg-neutral-400 cursor-pointer";

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user){
                setUser(user);
            }else{
                console.log("user not signed in");
                router.push("/signin")
            }
        })
        
    }, [router])
    const reload = () => {
        router.refresh();
    }
    
    const upload = async () => {
        if(!photo){
            alert("Please upload a photo first.")
            return
        }
        // let imageType = (photo.type);
        // imageType = imageType.split("/").pop();
        
        const fileRef = ref(storage,'users/' + currentUser.uid);
        
        setLoading(true);
        
        const snapshot = await uploadBytes(fileRef, photo);
        const photoURL = await getDownloadURL(fileRef);
        
        await updateProfile(currentUser, {photoURL});
        
        setLoading(false);
        alert("Photo changed!");
        reload();
    }

    const handleNameChange = async () => {
        await updateProfile(currentUser, {
            displayName: nameChange,
        }).then(
            setNameChange(""),
            alert("Name changed !")
            ).catch((err) => {
                console.log(err)
            })
            reload();
    }
    const handlePicChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }
    
    return (
        <>
            {currentUser.uid ?
                <>
                    <section id="user-panel" className="flex flex-col-reverse lg:flex-row justify-between bg-neutral-200 text-black border-2 border-black shadow-md p-5 sm:p-10 rounded xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto mt-10">
                        <section >
                            <h1 className="text-4xl mb-5 text-center lg:text-left">Welcome {currentUser.displayName} !</h1>
                            <p className="text-neutral-700 mb-5 text-center lg:text-left">We are happy to see you here.</p>

                            <article className="flex flex-col lg:flex-row gap-x-5 w-max mx-auto">
                            <input onChange={(e) => {setNameChange(e.target.value)}} value={nameChange} placeholder={currentUser.displayName} className="bg-neutral-300 placeholder:text-neutral-400 text-black rounded p-1 pl-2 text-base mt-2 border-black border-2" type="text" name="name" id="name" />
                            <button onClick={handleNameChange} className="bg-indigo-500 h-max hover:bg-indigo-600 duration-300 text-white px-3 py-1 rounded text-lg shadow-sm mt-2 ">Change Name</button>
                            </article>

                        </section>

                        <figure className="flex flex-col justify-center items-center mb-14 sm:mb-0">
                            {currentUser.photoURL ? <Image priority src={currentUser.photoURL} quality={30} width={160} height={160} className="rounded-full object-cover w-48 h-48 sm:w-80 sm:h-80 lg:w-40 lg:h-40 shadow border-2 border-neutral-400" alt="profile pic" /> : <p>No profile pic.</p>}
                            <figcaption className="mt-5 flex flex-col w-full sm:w-max sm:flex-row lg:flex-col gap-3 ">
                                <label className={`${photo ? "text-indigo-500" : ""} ${isLoading? fileCSSloading : fileCSS} duration-300 px-3 py-1 rounded text-lg shadow-sm text-center`}>
                                    <input disabled={isLoading} onChange={handlePicChange} accept='image/*' className="hidden" id="file-input" type="file"/>
                                    Upload File
                                </label>
                                <button disabled={isLoading} onClick={upload} id="image-btn" className="bg-indigo-500 disabled:bg-indigo-300 hover:bg-indigo-600 duration-300 text-white px-3 py-1 rounded text-lg shadow-sm ">Change Image</button>
                            </figcaption>
                        </figure>

                    </section>

                    <LikePostsCard userID={currentUser.uid}/>
                    <YourPostsCard userID={currentUser.uid}/>
                </>
            :
                <></>
            }
            
        </>
    )
}

export default ProfileContainer;