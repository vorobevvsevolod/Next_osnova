import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env:{
      API_URL: `${process.env.API_URL}`
    },
    images:{
        remotePatterns:[
            {
                protocol: 'http',
                hostname: '192.168.0.189',
                port: '3500'
            }
        ]
    },

    async rewrites(){
        return [
            {
                source: '/img/:path*',
                destination: `${process.env.API_URL}/:path*` ,
            }
        ]
    }
};


export default nextConfig;
