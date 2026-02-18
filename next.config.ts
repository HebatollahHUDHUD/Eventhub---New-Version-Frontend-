import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: { 
    remotePatterns: [
      { 
        protocol: "https", 
        hostname: "**", 
        port: "" 
      },
      { 
        protocol: "http", 
        hostname: "**", 
        port: "" 
      },
      {
        protocol: "https",
        hostname: "apis-eventshubs.hudhud.it.com",
      }
    ] 
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
