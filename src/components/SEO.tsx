import { useEffect } from "react";
import { siteConfig } from "@/config/site";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  schema?: Record<string, unknown>;
}

function setMeta(selector: string, attribute: "content" | "href", value: string) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = selector.startsWith("link")
      ? document.createElement("link")
      : document.createElement("meta");

    if (selector.includes("property=")) {
      element.setAttribute("property", selector.match(/property=\"([^\"]+)\"/)?.[1] || "");
    }
    if (selector.includes("name=")) {
      element.setAttribute("name", selector.match(/name=\"([^\"]+)\"/)?.[1] || "");
    }
    if (selector.startsWith("link")) {
      element.setAttribute("rel", "canonical");
    }
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export function SEO({ title, description, canonical = siteConfig.url, image = "/images/sections/hero-poster.webp", schema }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes("NESMA") ? title : `${title} | ${siteConfig.brand}`;
    const absoluteImage = image.startsWith("http") ? image : `${siteConfig.url}${image}`;
    const absoluteCanonical = canonical.startsWith("http") ? canonical : `${siteConfig.url}${canonical}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", absoluteCanonical);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", absoluteImage);
    setMeta('meta[property="og:url"]', "content", absoluteCanonical);
    setMeta('meta[property="og:type"]', "content", schema ? "product" : "website");
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", absoluteImage);

    const existing = document.getElementById("structured-data");
    existing?.remove();

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "structured-data";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, image, schema]);

  return null;
}
