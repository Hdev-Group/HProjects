/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
      },
      async redirects() {
        return [
          {
            source: '/old-route',
            destination: '/new-route',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
