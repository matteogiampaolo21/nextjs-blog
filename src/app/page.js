import { metadata } from "./layout";
import Link from "next/link";
export default function Home() {
  metadata.title = "Home"
  return (
    <main className='xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto mb-10'>
      <article className='bg-neutral-200 border-2 text-black border-black w-full  mx-auto p-10 rounded shadow-md mt-10'>
        <h1 className='text-4xl mb-5'>Hello there, welcome!</h1>
        <p className="text-neutral-700 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore commodi excepturi quod, reiciendis dicta tempore beatae minima. Laboriosam, repellat!</p>
        <Link href={'/register'} className={'bg-indigo-500 text-white font-bold focus:bg-indigo-300 focus:text-neutral-800 border-black border-2 px-3 py-2 text-lg rounded mt-5 hover:bg-indigo-600 duration-300'}>Register Now!</Link>
      </article>

      <section className='grid grid-cols-2 gap-10 mx-auto mt-10 xl:w-1280'>

        <article className='bg-neutral-200 border-2 col-span-2 border-black text-black  p-10 rounded shadow-lg w-full'>
          <h1 className='text-4xl mb-5'>Secondary Text!</h1>
          <p className='mb-5 text-neutral-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore commodi excepturi quod, reiciendis dicta tempore beatae minima. Laboriosam, repellat!</p>
          <p className='mb-5 text-neutral-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis exercitationem, labore totam expedita dolore ab magni nihil perferendis, architecto dolorum iusto modi sunt rem repellendus ducimus error tempora officiis cum odio ad fugit deleniti!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quia laudantium quis sint nemo. Tempora voluptas excepturi porro, dolorum ducimus sapiente voluptatem. In, blanditiis voluptas ab earum ullam eum odit?</p>
        </article>

        <article  className='bg-neutral-200 border-2 col-span-2 sm:col-span-1 border-black text-black  p-10 rounded shadow-lg w-full'>
          <h1 className='text-2xl mb-1'>Subtle Text 1</h1>
          <p className="text-neutral-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore commodi excepturi quod, reiciendis dicta tempore beatae minima. Laboriosam, repellat!</p>
        </article>

        <article  className='bg-neutral-200 border-2 col-span-2 sm:col-span-1 border-black text-black p-10 rounded shadow-lg w-full'>
          <h1 className='text-2xl mb-1'>Subtle Text 2</h1>
          <p className="text-neutral-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore commodi excepturi quod, reiciendis dicta tempore beatae minima. Laboriosam, repellat!</p>
        </article>

      </section>
      
      
    </main> 
    
  )
}
