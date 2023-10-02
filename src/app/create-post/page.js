import { metadata } from "../layout";
import CreatePostForm from "../../components/createPostForm";

export default function Create() {
    metadata.title = "Create post"
    return(
        <>
            <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-black shadow-md p-5 sm:p-10 rounded  xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto mt-10">
                <h1 className="text-4xl mb-5">Create a Post</h1>
                <CreatePostForm/>
            </main>
        </>
    )
}