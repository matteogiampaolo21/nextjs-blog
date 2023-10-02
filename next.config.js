/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    webpack: (config, { isServer }) => {
        config.resolve.alias['@'] = path.join(__dirname,"src");
        return config
    },
    images:{
        domains:["firebasestorage.googleapis.com"]
    }
}

module.exports = nextConfig
