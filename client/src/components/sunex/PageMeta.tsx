import { useEffect } from "react";
import { useLocation } from "wouter";

const defaultImage = "/manus-storage/sunex-partnership-studio_691e7bdd.jpg";

const pageMeta: Record<string, { title: string; description: string; image?: string }> = {
  "/": { title: "SunEx Technologies", description: "SunEx Technologies brings together UrbanTree, SkillConnect, and SunEx Healthcare to create sustainable, practical progress.", image: defaultImage },
  "/about": { title: "About SunEx", description: "Explore SunEx Technologies’ purpose, values, leadership, and work across environmental innovation, education, and healthcare.", image: "/manus-storage/about-hero-bg_bd135a7e.jpg" },
  "/product": { title: "UrbanTree", description: "Explore UrbanTree, SunEx’s advanced bio-mechanical air purification infrastructure for healthier urban environments.", image: "/manus-storage/urbantree-city-clean_b9b26676.png" },
  "/education": { title: "SkillConnect by SunEx", description: "Explore SkillConnect’s industry-oriented technology courses and learning pathways.", image: "/manus-storage/skillconnect-coding-lab_8415e96a.jpg" },
  "/healthcare": { title: "SunEx Healthcare", description: "Explore SunEx Healthcare’s developing medical-tourism journey for international patients.", image: "/manus-storage/healthcare_60e8d462.png" },
  "/contact": { title: "Contact SunEx", description: "Start a guided conversation with SunEx about UrbanTree, SkillConnect, Healthcare, partnerships, or CSR.", image: defaultImage },
  "/faq": { title: "SunEx FAQs", description: "Find answers about UrbanTree, SkillConnect, SunEx Healthcare, and starting a conversation with SunEx.", image: defaultImage },
  "/privacy": { title: "Privacy information", description: "Read SunEx’s plain-language privacy information for website enquiry submissions.", image: defaultImage },
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertStructuredData(id: string, value: Record<string, unknown>) {
  let script = document.head.querySelector(`script[data-sunex-schema="${id}"]`) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.sunexSchema = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(value);
}

export function PageMeta() {
  const [location] = useLocation();

  useEffect(() => {
    const current = pageMeta[location] ?? pageMeta["/"];
    const title = `${current.title} | Powering the Next Clean Future`;
    const url = `${window.location.origin}${location}`;
    const image = `${window.location.origin}${current.image ?? defaultImage}`;

    document.title = title;
    upsertMeta("name", "description", current.description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", current.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", "SunEx Technologies");
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", current.description);
    upsertMeta("name", "twitter:image", image);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    upsertStructuredData("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SunEx Technologies Pvt. Ltd.",
      url: window.location.origin,
      email: "contact@sunextech.com",
      description: "SunEx Technologies brings together UrbanTree, SkillConnect, and SunEx Healthcare to create sustainable, practical progress.",
    });
  }, [location]);

  return null;
}
