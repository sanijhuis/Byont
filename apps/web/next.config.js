module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  experimental: {
    appDir: true,
  },
  compiler: {
    removeConsoleLog: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3005",
      },
    ];
  },
};
