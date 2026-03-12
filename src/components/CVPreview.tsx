import React, { useCallback, useEffect, useRef } from 'react';
import { CV } from '@/lib/types';
import { renderCVToHTML } from '@/services/pdf-service';
import { useIsMobile } from '@/hooks/use-mobile';

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive' | 'technical' | 'professional' | 'simple-ats' | 'pure-ats' | 'traditional';

interface CVPreviewProps {
  cv: CV;
  template: CVLayoutStyle;
  className?: string;
  style?: React.CSSProperties;
}

const CONTENT_WIDTH = 800;

function ScaledCVPreview({ html }: { html: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const applyScale = useCallback(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;
    const scale = wrapper.offsetWidth / CONTENT_WIDTH;
    inner.style.transform = `scale(${scale})`;
    inner.style.transformOrigin = 'top left';
    inner.style.width = `${CONTENT_WIDTH}px`;
    wrapper.style.height = `${inner.scrollHeight * scale}px`;
  }, []);

  useEffect(() => {
    applyScale();
    const ro = new ResizeObserver(applyScale);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [html, applyScale]);

  return (
    <div ref={wrapperRef} className="relative w-full overflow-hidden">
      <div ref={innerRef} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default function CVPreview({ cv, template, className = "", style }: CVPreviewProps) {
  const isMobile = useIsMobile();
  const html = renderCVToHTML(cv, template);

  return (
    <div
      className={`bg-white border border-gray-200 rounded-md shadow-sm ${className}`}
      style={{ minHeight: '400px', ...style }}
    >
      {isMobile ? (
        <ScaledCVPreview html={html} />
      ) : (
        <div className="overflow-auto h-full">
          <div style={{ minWidth: CONTENT_WIDTH }} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
  );
}
