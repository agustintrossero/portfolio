import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/projects";
import { site } from "@/lib/site";

// Static export: this route is rendered once, at build time.
export const dynamic = "force-static";

// Every public page: the home, the about page, the reel and each case study.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about/", "/reel/", ...caseStudies().map((p) => `/work/${p.slug}/`)];
  return paths.map((path) => ({ url: new URL(path, site.baseUrl).toString() }));
}
