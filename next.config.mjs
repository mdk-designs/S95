/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Keep legacy WordPress URLs working so existing search rankings carry over.
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/2023/09/08/:slug*", destination: "/blog", permanent: true },
      { source: "/category/:slug*", destination: "/blog", permanent: true },
      { source: "/author/:slug*", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
