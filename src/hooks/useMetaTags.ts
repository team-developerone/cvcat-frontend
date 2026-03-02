import { useEffect } from 'react';

interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
}

export function useMetaTags(meta: MetaTags) {
  useEffect(() => {
    // Update title
    if (meta.title) {
      document.title = meta.title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      let tag: HTMLMetaElement | null = document.querySelector(
        property ? `meta[property="${property}"]` : `meta[name="${name}"]`
      );
      
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', property);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Update description
    if (meta.description) {
      updateMetaTag('description', meta.description);
      updateMetaTag('description', meta.description, 'og:description');
      updateMetaTag('description', meta.description, 'twitter:description');
    }

    // Update keywords
    if (meta.keywords) {
      updateMetaTag('keywords', meta.keywords);
    }

    // Update OG image
    if (meta.ogImage) {
      updateMetaTag('image', meta.ogImage, 'og:image');
      updateMetaTag('image', meta.ogImage, 'twitter:image');
    }

    // Update OG URL
    if (meta.ogUrl) {
      updateMetaTag('url', meta.ogUrl, 'og:url');
      updateMetaTag('url', meta.ogUrl, 'twitter:url');
    }

    // Update canonical URL
    if (meta.canonicalUrl) {
      let canonical: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', meta.canonicalUrl);
    }

    // Cleanup function to reset to default on unmount
    return () => {
      document.title = 'CVCat - AI-Powered CV Builder | Create Professional Resumes in Minutes';
    };
  }, [meta]);
}
