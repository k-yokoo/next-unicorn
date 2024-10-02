/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version } = require('./package.json');
module.exports = () =>{
  const nextConfig = {
    env: {
      version,
    },
  };
  return nextConfig;
}
// export default nextConfig;
