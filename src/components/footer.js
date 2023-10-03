import React from 'react'

export const Footer = () => {
    const year = new Date().getFullYear();
    return(
        <footer className="xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mx-auto bg-neutral-800 border-2 border-black shadow-md rounded p-5 text-lg my-10 flex flex-col">

            <section className="grid grid-cols-4">

                <article  className='col-span-4 mb-20 lg:col-span-1'>
                    <header className="mb-5 mr-10">
                        <h1 className="border-b-4 border-indigo-400 pb-2 px-3 font-bold text-xl w-max lg:w-full">Company Name</h1>
                    </header>
                    <p className="text-lg lg:text-base pl-3 pr-5 text-neutral-200">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa natus ratione nam temporibus accusamus sed.
                    </p>
                </article>


                <article className='col-span-4 mb-20 lg:mb-0 lg:col-span-1'>
                    <header className="mb-5 mr-10">
                        <h1 className="border-b-4 border-indigo-400 pb-2 px-3 font-bold text-xl w-max lg:w-full">Category</h1>
                    </header>
                    <div className="flex flex-col text-lg lg:text-base gap-5 font-bold pl-3">
                        <p><a href="/">Home</a></p>
                        <p><a href="/register">Register</a></p>
                        <p><a href="/signin">Sign In</a></p>
                    </div>

                </article>


                
                <article className='col-span-4 mb-20 lg:col-span-1'>
                    <header className="mb-5 mr-10">
                        <h1 className="border-b-4 border-indigo-400 pb-2 px-3 font-bold text-xl w-max lg:w-full">Useful links</h1>
                    </header>
                    <div className="flex flex-col text-lg lg:text-base gap-5 font-bold pl-3">
                        <p><a href="/">Your Account</a></p>
                        <p><a href="/">Become an Affiliate</a></p>
                        <p><a href="/">Shipping Rates</a></p>
                        <p><a href="/">Help</a></p>
                    </div>
                </article>


                <article className='col-span-4 lg:col-span-1'>
                    <header className="mb-5 mr-10">
                        <h1 className="border-b-4 border-indigo-400 pb-2 px-3 font-bold text-xl w-max lg:w-full">Contact</h1>
                    </header>
                    <div className="flex flex-col lg:text-base gap-5 font-bold pl-3">
                        <p>Washington D.C, DC 012345, US</p>
                        <p>info@example.com</p>
                        <p>+ 01 234 567 88</p>
                        <p>+ 01 234 567 89</p>
                    </div>
                </article>

            </section>

            <div className=" mx-auto mt-16 text-sm text-center text-indigo-300 pt-5 ">© Copyright {year} | nextjs-site.com | All right reserved.</div>
                
        </footer>
    )
}