'use client'
import { db } from '../../firebase/firebase';
import { getDocs, collection, query, where, limit, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function LikePostsCard({userID}) {
    const [likedPosts, setLikedPosts] = useState([])

    useEffect(()=>{

        const getInfo = async () => {

            if (userID){
                const qLikedPosts = query(collection(db, 'posts'), where("likeCount.users","array-contains",userID),where("creatorID","!=",userID),limit(10))
                const querySnapshotLikedPosts = await getDocs(qLikedPosts);
                const tempArrayLikedPosts = [];
                
                querySnapshotLikedPosts.forEach( (doc) => {
                    let tempObj = doc.data();
                    tempObj.id = doc.id;
                    tempArrayLikedPosts.push(tempObj)
                })
                setLikedPosts(tempArrayLikedPosts);
                
                
            }else{
                console.log("Can't find user's ID");
                // router.push("/signin")
            }
        }
        getInfo()
    }, [userID])

    return (
        <main className="flex flex-col bg-neutral-200 text-black border-2 border-black shadow-md p-10 rounded  xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto mt-10">
            <h2 className='text-4xl mb-5'>Liked posts</h2>
            {likedPosts.length === 0 ?
            <p className='text-lg'>You have no liked posts. <a className='text-violet-600 underline underline-offset-2 cursor-pointer hover:text-indigo-500 duration-150' href='/posts'>Click here</a> to discover some!</p>
            :
                likedPosts.map((posts, index) => {
                    return(
                        <article className='border-b-2 border-neutral-300 pb-3 mb-5 ' key={index}>
                            <h3 className='text-2xl cursor-pointer hover:text-violet-700 duration-300 hover:pl-3 mb-1 ' onClick={() => {router.push(`posts/${posts.id}`)}}>{posts.title}</h3>
                            <p className='text-neutral-800 break-words'>{posts.description}</p>
                        </article>
                    )
                })
            }
            
        </main> 
    )
}

export default LikePostsCard