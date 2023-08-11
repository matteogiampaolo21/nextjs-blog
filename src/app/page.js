
export default function Home() {
  return (
    <main className='mb-10'>

      <article className='bg-neutral-200 border-2 text-black border-black xl:w-1280 mx-auto p-10 rounded shadow-md mt-10'>
        <h1 className='text-4xl mb-5'>Hello there, welcome!</h1>
        <p className="text-neutral-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore commodi excepturi quod, reiciendis dicta tempore beatae minima. Laboriosam, repellat!</p>
        <button className='bg-indigo-500 text-white font-bold border-black border-2 px-3 py-1 text-lg rounded mt-5 hover:bg-indigo-600 duration-300'>View Page</button>
      </article>

      <section id='home-grid-1' className='grid grid-cols-2 gap-10 mx-auto mt-10 xl:w-1280'>

        <article id='grid-item-1' className='bg-neutral-200 border-2 border-black text-black  p-10 rounded shadow-lg w-full'>
          <h1 className='text-4xl mb-5'>Hello there, welcome!</h1>
          <p className='mb-5 text-neutral-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore commodi excepturi quod, reiciendis dicta tempore beatae minima. Laboriosam, repellat!</p>
          <p className='mb-5 text-neutral-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis exercitationem, labore totam expedita dolore ab magni nihil perferendis, architecto dolorum iusto modi sunt rem repellendus ducimus error tempora officiis cum odio ad fugit deleniti!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quia laudantium quis sint nemo. Tempora voluptas excepturi porro, dolorum ducimus sapiente voluptatem. In, blanditiis voluptas ab earum ullam eum odit?</p>
        </article>

        <article id='grid-item-2' className='bg-neutral-200 border-2 border-black text-black  p-10 rounded shadow-lg w-full'>
          <h1 className='text-4xl mb-3'>Subtle Text 1</h1>
          <p className="text-neutral-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore commodi excepturi quod, reiciendis dicta tempore beatae minima. Laboriosam, repellat!</p>
        </article>

        <article id='grid-item-3' className='bg-neutral-200 border-2 border-black text-black  p-10 rounded shadow-lg w-full'>
          <h1 className='text-4xl mb-3'>Subtle Text 2</h1>
          <p className="text-neutral-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore commodi excepturi quod, reiciendis dicta tempore beatae minima. Laboriosam, repellat!</p>
        </article>

      </section>
      
      
    </main> 
    
  )
}
