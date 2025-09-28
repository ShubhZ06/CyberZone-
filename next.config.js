/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  // Serve Unity WebGL compressed assets with correct headers
  async headers() {
    return [
      // Brotli-encoded Unity assets
      {
        source: '/unity-games/:path*.data.br',
        headers: [
          { key: 'Content-Type', value: 'application/octet-stream' },
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/unity-games/:path*.framework.js.br',
        headers: [
          { key: 'Content-Type', value: 'application/javascript' },
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/unity-games/:path*.wasm.br',
        headers: [
          { key: 'Content-Type', value: 'application/wasm' },
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Gzip-encoded Unity assets
      {
        source: '/unity-games/:path*.data.gz',
        headers: [
          { key: 'Content-Type', value: 'application/octet-stream' },
          { key: 'Content-Encoding', value: 'gzip' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/unity-games/:path*.framework.js.gz',
        headers: [
          { key: 'Content-Type', value: 'application/javascript' },
          { key: 'Content-Encoding', value: 'gzip' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/unity-games/:path*.wasm.gz',
        headers: [
          { key: 'Content-Type', value: 'application/wasm' },
          { key: 'Content-Encoding', value: 'gzip' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Ensure loader .js files are served with proper MIME type
      {
        source: '/unity-games/:path*.loader.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
