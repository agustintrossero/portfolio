import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → plain HTML/CSS, deploy the `out/` folder anywhere (Netlify).
  output: "export",
  images: {
    // Required for static export: we ship pre-optimized images ourselves.
    unoptimized: true,
  },
  // Emit /work/paypal/index.html so clean URLs work on static hosts.
  trailingSlash: true,
};

export default nextConfig;
