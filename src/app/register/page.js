

import RegisterForm from "@/components/registerForm";
import { metadata } from "../layout";
export default function Register() {
   
  metadata.title = "Register"

  return (
    <section className="w-1280 mt-10 mx-auto bg-neutral-200 text-black border-2 p-10 rounded border-black">
      <h1 className="text-4xl font-bold mb-3">Register</h1>
      <p className="text-lg mb-5">Already have an account? <a className="text-indigo-500" href="/signin">Sign in</a></p>
      <RegisterForm/>

    </section>
  )
}
