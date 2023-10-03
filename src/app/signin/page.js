
import { SignInForm } from "../../components/signInForm";
import { metadata } from "../layout"

export default function SignIn() {
    metadata.title = 'Sign in'
    return(
        <section className="xl:w-1280 lg:w-1024 md:w-768 sm:w-640 w-320 mt-10 mx-auto bg-neutral-200 text-black border-2 p-10 rounded border-black">
            <h1 className="text-4xl font-bold mb-3">Sign in</h1>
            <p className="text-lg mb-5">New here? <a className="text-indigo-500" href="/register">Create an account</a></p>
            <SignInForm/>
        </section>
    )
}