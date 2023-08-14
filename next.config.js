/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    images:{
        domains:["upload.wikimedia.org","firebasestorage.googleapis.com"]
    }
}

module.exports = nextConfig
