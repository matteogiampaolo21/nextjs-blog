import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer'
const inter = Inter({ subsets: ['latin'] })
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";


config.autoAddCss = false;

export const metadata = {
  title: 'Next JS App',
  description: "A blog made with Next.js. View, create and show your posts with anyone. Sign in now!"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
