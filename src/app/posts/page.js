
import PostsPage from "@/components/postsPage";
import { metadata } from "../layout";


export default function Posts() {
    metadata.title = 'Posts'
    return(
        <>  
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-black shadow-md px-2 py-5 sm:p-10 rounded w-320 sm:w-640 md:w-768 lg:w-1024  xl:w-1280 mx-auto mt-10">
                <h1 className="text-4xl mb-10 mx-2 sm:mx-0">Posts</h1>
                <PostsPage/>

            </main>
        </>
    )
}