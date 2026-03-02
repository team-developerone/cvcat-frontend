import React from 'react';
import { CV } from '@/lib/types';
import { renderCVToHTML } from '@/services/pdf-service';

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive' | 'technical' | 'professional' | 'simple-ats' | 'pure-ats' | 'traditional';

interface CVPreviewProps {
  cv: CV;
  template: CVLayoutStyle;
  className?: string;
  style?: React.CSSProperties;
}

export default function CVPreview({ cv, template, className = "", style }: CVPreviewProps) {
  return (
    <div 
      className={`bg-white border border-gray-200 rounded-md shadow-sm overflow-auto ${className}`} 
      style={{ minHeight: '400px', ...style }}
    >
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: renderCVToHTML(cv, template) }}
      />
    </div>
  );
}
