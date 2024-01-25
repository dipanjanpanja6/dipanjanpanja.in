/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
