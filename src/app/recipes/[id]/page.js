export default function Page({params}) {
    return(
        <main className="flex flex-col justify-between bg-neutral-200 text-black border-2 border-neutral-500 shadow-md p-10 rounded  w-1280 mx-auto mt-10"> 
            <p className="text-3xl font-bold ">param = {params.id}</p>
        </main>
    )
}