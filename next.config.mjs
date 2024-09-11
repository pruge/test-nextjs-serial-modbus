/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('modbus-serial')
    return config
  },
}

export default nextConfig
