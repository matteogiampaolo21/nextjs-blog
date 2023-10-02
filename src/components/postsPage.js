'use client'
import { useState, useEffect } from "react";

import { db } from "../../firebase/firebase";
import { collection,doc, updateDoc, onSnapshot, query, limit, orderBy, startAfter, where } from "firebase/firestore";
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Image from "next/image";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter, faHeart } from "@fortawesome/free-solid-svg-icons";




function PostsPage() {


    const router = useRouter();
    
    const [isLoading, setLoading] = useState(true);
    const [currentUser, setUser] = useState({});

    const [filterDiff , setFilterDiff] = useState("None");
    const [filterTime , setFilterTime] = useState("All time")
    const [sortBy, setSortBy] = useState("Latest")
    const [updatedValues, setValues] = useState(["None","All time","desc"])

    const [posts, setPosts] = useState([]);


    const yourPostCss = "text-red-500";
    const otherPostCss = "text-neutral-400 cursor-pointer duration-200 hover:text-red-400";
    
    let firebaseQuery = query(collection(db, "posts"),orderBy("createdAt","desc"),limit(10));
    const postsRef = collection(db,"posts");
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user){
                setUser(user);
            }else{
                console.log("user not signed in");
                router.push("/signin")
                
            }
        })

        
        const getPosts = async () => {

            const unsubscribe = onSnapshot(firebaseQuery, async (querySnapshot) => {
                
                // console.log(querySnapshot.docs)
                const tempArray = [];
                querySnapshot.forEach((doc) => {
                    // console.log(doc)
                    let tempObj = doc.data();
                    tempObj.id = doc.id;
                    tempArray.push(tempObj)
                });
                setPosts(tempArray)
                setLoading(false)
            });
            
        }
        getPosts();
        
    }, [firebaseQuery,router])

    const handleLoadMore = async () => {
        const lastPostTime = posts[posts.length-1].createdAt

        let next;
        // console.log(next)
        if (updatedValues[0] === "None" && updatedValues[1] === "All time"){
            next = query(collection(db,"posts"),orderBy("createdAt",updatedValues[2]),startAfter(lastPostTime),limit(10))

        }else if (updatedValues[0] !== "None" && updatedValues[1] == "All time"){
            next = query(postsRef,where("difficulty", "==", updatedValues[0]),orderBy("createdAt",updatedValues[2]),startAfter(lastPostTime),limit(10))
        }else if (updatedValues[0] == "None" && updatedValues[1] !== "All time"){
            console.log(updatedValues)
            next = query(postsRef,where("createdAt",">=",updatedValues[1]),orderBy("createdAt",updatedValues[2]),startAfter(lastPostTime),limit(10))
        }else{
            next = query(postsRef,where("difficulty", "==", updatedValues[0]),where("createdAt",">=",updatedValues[1]),orderBy("createdAt",updatedValues[2]),startAfter(lastPostTime),limit(10))
        }
        const unsubscribe = onSnapshot(next, (querySnapshot) => {
            
            if (querySnapshot.docs.length === 0) {
                alert("There are no more posts. Please try again later.")
                return
            }
            const tempArray = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                let tempObj = doc.data();
                tempObj.id = doc.id;
                tempArray.push(tempObj)
            });
            setPosts(posts.concat(tempArray))
        });
    }
    
    const handleLike = async (postID, userArray, likesNum) => {

        const postRef = doc(db, "posts", postID);
        if (userArray.includes(currentUser.uid)){
            const index = userArray.indexOf(currentUser.uid);
            userArray.splice(index,1)
            await updateDoc(postRef, {
                "likeCount.likes": likesNum - 1,
                "likeCount.users": userArray,
            });

        }else {
            
            await updateDoc(postRef, {
                "likeCount.likes": likesNum + 1,
                "likeCount.users": userArray.concat(currentUser.uid)
            });

        }

    }
    const findUserQuery = (e) => {
        e.preventDefault()
        console.log(filterDiff,filterTime,sortBy);

        let startOfDay = new Date();

        let orderValue;
        if(sortBy === "Latest"){
            orderValue = "desc"
        }else{orderValue = "asc"};

        switch (filterTime) {
            case "Day":
                startOfDay.setDate(startOfDay.getDate() - 1);
                break;
            case "Week":
                startOfDay.setDate(startOfDay.getDate() - 7);
                break;
            case "Month":
                startOfDay.setDate(startOfDay.getDate() - 31);
                break;
            case "Year":
                startOfDay.setDate(startOfDay.getDate() - 365);
                break;
            case "All time":
                startOfDay = "All time"
        }
        console.log(startOfDay)


        if (filterDiff === "None" && filterTime === "All time"){
            firebaseQuery = query(postsRef,orderBy("createdAt",orderValue),limit(10));
            setValues([filterDiff,startOfDay,orderValue])
            
        }else if (filterDiff !== "None" && filterTime == "All time"){
            firebaseQuery = query(postsRef,where("difficulty", "==", filterDiff),orderBy("createdAt",orderValue),limit(10))
            setValues([filterDiff,startOfDay,orderValue])

        }else if (filterDiff == "None" && filterTime !== "All time"){
            firebaseQuery = query(postsRef,where("createdAt",">=",startOfDay),orderBy("createdAt",orderValue),limit(10))
            setValues([filterDiff,startOfDay,orderValue])

        }else{
            firebaseQuery = query(postsRef,where("difficulty", "==", filterDiff),where("createdAt",">=",startOfDay),orderBy("createdAt",orderValue),limit(10))
            setValues([filterDiff,startOfDay,orderValue])

        }
       
        
        onSnapshot(firebaseQuery, async (querySnapshot) => {
                
            // console.log(querySnapshot.docs)
            const tempArray = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc)
                let tempObj = doc.data();
                tempObj.id = doc.id;
                tempArray.push(tempObj)
            });
            setPosts(tempArray)
            // setPosts(tempArray)
        });
    }

  return (
    <>
        <form className="mx-2 sm:mx-0 sm:flex sm:flex-row sm:gap-10">
            <label className="flex flex-col w-max">
                <span className="text-xl"><FontAwesomeIcon icon={faFilter} className="text-neutral-600 pl-1" /> Filters</span>
                <section className="flex flex-row gap-5">
                    <select onChange={(e)=>{setFilterDiff(e.target.value)}} className="bg-neutral-300 text-black h-9 rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" name="difficulties" id="difficulties">
                        <option value="None">None</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Easy">Easy</option>
                        <option value="Normal">Normal</option>
                        <option value="Hard">Hard</option>
                        <option value="Expert">Expert</option>
                    </select>
                    <select defaultValue={"All time"} onChange={(e)=>{setFilterTime(e.target.value)}}   className="bg-neutral-300 text-black h-9 rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" name="times" id="times">
                        <option value="Day">Day</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                        <option value="All time">All time</option>
                    </select>
                </section>
            </label>
            <label className="flex flex-col w-max">
                <span className="text-xl"><FontAwesomeIcon icon={faSort} className="text-neutral-600 pl-1" /> Sort by </span>
                <select onChange={(e)=>{setSortBy(e.target.value)}} className="bg-neutral-300 text-black h-9 rounded px-2 py-1 text-base mt-2 mb-5 border-neutral-500 border-2 placeholder:text-neutral-500" name="orders" id="orders">
                    <option value="Latest">Latest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </label>
            <label className="flex flex-col w-max">
                <span className="text-xl invisible">search-button</span>
                <button onClick={(e) => {findUserQuery(e)}} className="bg-indigo-500 text-white h-9 rounded px-2 py-1 text-base mt-2 mb-5 border-black border-2 hover:bg-indigo-600 duration-300" >
                    Search
                </button>
            </label>
        </form>

        {isLoading ?
            <main className="my-32 ">
                <div className="loader"></div>
            </main>
        :
            <>
            {posts.map((post, index) => {
                let postDate = new Date(post.createdAt.toDate())
                postDate = `${postDate.getDate()} / ${postDate.getMonth()} / ${postDate.getFullYear()}`
                return(
                    <article key={index} className="mb-10 border-b-2 pb-5 border-neutral-300  ">
                        <figure>
                            {post.image == "" ? <></> :
                                <Image loading={index === 0 ? "eager" : "lazy"} priority={index === 0 ? true : false }  src={post.image} width={0} height={0} sizes="100vw" quality={30} className="w-full h-480 lg:h-640 object-cover rounded mb-5 border-2 border-black"  alt="photo"/>
                            }
                            <figcaption className="m-2 sm:m-0">
                                <h1 className="text-2xl  flex flex-row gap-2 items-center break-words"><span className="cursor-pointer hover:text-violet-500 duration-200" onClick={() => {router.push(`/posts/${post.id}`)}} >{post.title}</span> <span className={`bg-${post.difficulty} px-2 rounded hidden sm:block text-lg font-bold text-white`}>{post.difficulty}</span></h1>
                                <p className={`bg-${post.difficulty} sm:hidden px-2 w-max mt-1 mb-2 rounded text-lg font-bold text-white`}>{post.difficulty}</p>
                                <p className="text-neutral-700 my-2">{postDate}</p>
                                <p className="text-neutral-600 mb-2">${post.price}</p>
                                <p>{post.description}</p>
                                <aside className="flex flex-row items-center gap-2 mt-2">
                                    <button onClick={() => {handleLike(post.id,post.likeCount.users,post.likeCount.likes)}} disabled={post.creatorID === currentUser.uid ? true : false}><FontAwesomeIcon icon={faHeart}  className={`${post.likeCount.users.includes(currentUser.uid)? yourPostCss : otherPostCss} text-xl  m-0`} /></button>
                                    <p>{post.likeCount.likes} </p>
                                </aside>
                            </figcaption>
                        </figure>
                    </article>
                )
            })}
            <button onClick={handleLoadMore} className="bg-violet-500 hover:bg-violet-700 text-white duration-300 rounded py-1 text-lg">Load more</button>
            </> 
        }
    </>
  )
}

export default PostsPage