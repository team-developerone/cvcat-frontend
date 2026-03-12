import React, { useRef, useEffect } from 'react';
import { CV } from '@/lib/types';
import { renderCVToHTML } from '@/services/pdf-service';

type CVLayoutStyle =
  | 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive'
  | 'technical' | 'professional' | 'simple-ats' | 'pure-ats' | 'traditional';

interface CVPreviewProps {
  cv: CV;
  template: CVLayoutStyle;
  className?: string;
  style?: React.CSSProperties;
}

const CONTENT_WIDTH = 800;

/**
 * Mobile: scales the 800px CV content to fit the container width.
 * Uses a ref-callback + one-time resize to avoid ResizeObserver loops.
 */
function MobileScaledPreview({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const apply = () => {
      const scale = container.clientWidth / CONTENT_WIDTH;
      inner.style.transform = `scale(${scale})`;
      inner.style.transformOrigin = 'top left';
      inner.style.width = `${CONTENT_WIDTH}px`;
      container.style.height = `${inner.offsetHeight * scale}px`;
    };

    // Apply once after paint so offsetHeight is accurate
    const raf = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(raf);
  }, [html]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div ref={innerRef} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default function CVPreview({ cv, template, className = "", style }: CVPreviewProps) {
  const html = renderCVToHTML(cv, template);
  // Read window width once at render — no hooks, no subscriptions
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-md shadow-sm ${className}`}
      style={{ minHeight: '400px', ...style }}
    >
      {isMobile ? (
        <MobileScaledPreview html={html} />
      ) : (
        <div className="overflow-auto h-full">
          <div style={{ minWidth: CONTENT_WIDTH }} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
  );
}
