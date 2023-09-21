'use client'
import React, { useEffect, useState } from 'react'
import { auth, storage, db } from '../../../firebase/firebase';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDocs, collection, query, where, limit } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";

export default function Profile() {

    const router = useRouter();

    const [currentUser, setUser] = useState({});

    const [nameChange, setNameChange] = useState("")
    const [photo, setPhoto] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [likedPosts, setLikedPosts] = useState([])
    const [posts, setPosts] = useState([]);

    const fileCSSloading = "bg-neutral-400 text-neutral-500";
    const fileCSS = "bg-neutral-300 border-2 border-neutral-400 hover:bg-neutral-400 cursor-pointer";
    
    

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user){
                setUser(user);
                console.log(user.uid)
                const qPosts = query(collection(db, 'posts'), where("creatorID", "==", user.uid));
                const qLikedPosts = query(collection(db, 'posts'), where("likeCount.users","array-contains",user.uid),where("creatorID","!=",user.uid),limit(10))

                const querySnapshotPosts = await getDocs(qPosts);
                const querySnapshotLikedPosts = await getDocs(qLikedPosts);

                const tempArrayPosts = [];
                const tempArrayLikedPosts = [];
                
                querySnapshotPosts.forEach( (doc) => {
                    let tempObj = doc.data();
                    tempObj.id = doc.id;
                    tempArrayPosts.push(tempObj)
                })
                setPosts(tempArrayPosts);

                querySnapshotLikedPosts.forEach( (doc) => {
                    let tempObj = doc.data();
                    tempObj.id = doc.id;
                    tempArrayLikedPosts.push(tempObj)
                })
                setLikedPosts(tempArrayLikedPosts);
            

            }else{
                console.log("user not signed in");
                router.push("/signin")
                
            }
        })
        
        // const getPosts = async () => {
        //     console.log(currentUser.uid)
        //     const q = query(collection(db, 'posts'), where("creatorID", "==", currentUser.uid))
        //     const querySnapshot = await getDocs(q);
          
            
        //     querySnapshot.forEach( (doc) => {
        //         let tempObj = doc.data();
        //         tempObj.id = doc.id;
        //         tempArray.push(tempObj)
        //     })
        //     setPosts(tempArray);
            
        // }
        
    }, [])

    const reload = () => {
        router.refresh();
    }

    const upload = async () => {
        const fileRef = ref(storage, currentUser.uid + '.png');

        setLoading(true);
        
        const snapshot = await uploadBytes(fileRef, photo);
        const photoURL = await getDownloadURL(fileRef);

        await updateProfile(currentUser, {photoURL});
        
        setLoading(false);
        reload();
        alert("Photo changed!");
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
            setPhoto(e.target .files[0])
        }
    }

    console.log(posts)
    
    
    return (
        <>
            <section id="user-panel" className="flex flex-row justify-between bg-neutral-200 text-black border-2 border-black shadow-md p-10 rounded  w-1280 mx-auto mt-10">

                <section >
                    <h1 className="text-4xl mb-5">Welcome {currentUser.displayName} !</h1>
                    <p className="text-neutral-700 mb-5">We are happy to see you here.</p>

                    <article className="flex flex-row gap-x-5">
                    <input onChange={(e) => {setNameChange(e.target.value)}} value={nameChange} placeholder={currentUser.displayName} className="bg-neutral-300 placeholder:text-neutral-400 text-black rounded p-1 pl-2 text-base mt-2 border-black border-2" type="text" name="name" id="name" />
                    <button onClick={handleNameChange} className="bg-indigo-500 h-max hover:bg-indigo-600 duration-300 text-white px-3 py-1 rounded text-lg shadow-sm mt-2 ">Change Name</button>
                    </article>

                </section>

                <figure className="flex flex-col justify-center items-center m-5">
                    {/* <img class="rounded-full w-40 shadow border-2 border-neutral-400"  src={currentUser.photoURL} alt=""/> */}
                    {currentUser.photoURL ? <Image priority src={currentUser.photoURL} quality={30} width={160} height={160} className="rounded-full object-cover w-40 h-40 shadow border-2 border-neutral-400" alt="profile pic" /> : <p>No profile pic.</p>}
                    <figcaption className="mt-5 flex flex-col gap-3 ">
                        <label className={`${photo ? "text-indigo-500" : ""} ${isLoading? fileCSSloading : fileCSS} duration-300 px-3 py-1 rounded text-lg shadow-sm text-center`}>
                            <input disabled={isLoading} onChange={handlePicChange} className="hidden" id="file-input" type="file"/>
                            Upload File
                        </label>
                        <button disabled={isLoading} onClick={upload} id="image-btn" className="bg-indigo-500 disabled:bg-indigo-300 hover:bg-indigo-600 duration-300 text-white px-3 py-1 rounded text-lg shadow-sm ">Change Image</button>
                    </figcaption>
                </figure>
                    

                

                
            </section>

            <main className="flex flex-col bg-neutral-200 text-black border-2 border-black shadow-md p-10 rounded  w-1280 mx-auto mt-10">
                <h2 className='text-4xl mb-10'>Liked posts</h2>
                {likedPosts.map((posts, index) => {
                    return(
                        <article className='border-b-2 border-neutral-300 mb-5 ' key={index}>
                            <h3 className='text-2xl cursor-pointer hover:text-violet-700 duration-300 hover:pl-3 mb-1 ' onClick={() => {router.push(`posts/${posts.id}`)}}>{posts.title}</h3>
                            <p className='text-neutral-800 break-words'>{posts.description}</p>
                        </article>
                    )
                })}
            </main>

            <article className="flex flex-col bg-neutral-200 text-black border-2 border-black shadow-md p-10 rounded  w-1280 mx-auto mt-10">
                <h2 className='text-4xl mb-10'>Your posts</h2>
                {posts.map((post, index) => {
                    return(
                        <article className='border-b-2 border-neutral-300 mb-5 ' key={index}>
                            <h3 className='text-2xl cursor-pointer hover:text-violet-700 duration-300 hover:pl-3 mb-1 ' onClick={() => {router.push(`posts/${post.id}`)}}>{post.title}</h3>
                            <p className='text-neutral-800 break-words'>{post.description}</p>
                        </article>
                    )
                })}
            </article>
        </>
    )
}
