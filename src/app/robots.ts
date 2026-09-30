import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Static export: this route is rendered once, at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.baseUrl).toString(),
  };
}
