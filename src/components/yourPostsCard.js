'use client'
import { db } from '../../firebase/firebase';
import { getDocs, collection, query, where, limit, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function YourPostsCard({userID}) {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const getInfo = async () => {
            if (userID){
                const qPosts = query(collection(db, 'posts'), where("creatorID", "==", userID),orderBy("createdAt","desc"));
                
                const querySnapshotPosts = await getDocs(qPosts);
                
                const tempArrayPosts = [];
                
                querySnapshotPosts.forEach( (doc) => {
                    let tempObj = doc.data();
                    tempObj.id = doc.id;
                    tempArrayPosts.push(tempObj)
                })
                setPosts(tempArrayPosts);
                
                
                
            }else{
                console.log("Can't find user's ID");
                // router.push("/signin")
                
            }
        }
        getInfo()
        
        
                
    }, [userID])
    return (
        <article className="flex flex-col bg-neutral-200 text-black border-2 border-black shadow-md p-10 rounded xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto mt-10">
            <h2 className='text-4xl mb-10'>Your posts</h2>
            {posts.length === 0 ?
                <p className='text-lg'>You have no posts. <a className='text-violet-600 underline underline-offset-2 cursor-pointer hover:text-indigo-500 duration-150' href='/create-post'>Click here</a> to create them!</p>
            :
                posts.map((post, index) => {
                    return(
                        <article className='border-b-2 border-neutral-300 pb-3 mb-5 ' key={index}>
                            <h3 className='text-2xl cursor-pointer hover:text-violet-700 duration-300 hover:pl-3 mb-1 ' onClick={() => {router.push(`posts/${post.id}`)}}>{post.title}</h3>
                            <p className='text-neutral-800 break-words'>{post.description}</p>
                        </article>
                    )
                })
            }
            
        </article>
    )
}

export default YourPostsCard;