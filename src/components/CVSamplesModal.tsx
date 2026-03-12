import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import CVPreview from "@/components/CVPreview";
import { mockCVData, mockCVVariants } from "@/data/mockCVData";
import { LucideArrowLeft, LucideCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive' | 'technical' | 'professional' | 'simple-ats' | 'pure-ats' | 'traditional';

interface CVSamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVSamplesModal({ isOpen, onClose }: CVSamplesModalProps) {
  const [activeLayout, setActiveLayout] = useState<CVLayoutStyle>("modern");
  const [mobileShowPreview, setMobileShowPreview] = useState(false);
  const isMobile = useIsMobile();

  const layouts = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean, professional design with gold accents and excellent readability",
      bestFor: "Tech, Marketing, Middle Management, Most Corporate Roles",
      features: ["Gold accent colors", "Two-column layout", "Clean typography", "Professional sections"],
      popular: true
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold design with purple accents for creative professionals",
      bestFor: "Design, Arts, Media, Advertising, Entertainment",
      features: ["Purple color scheme", "Creative layout", "Visual elements", "Unique styling"],
      popular: false
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated layout ideal for senior leadership positions",
      bestFor: "Senior Management, C-Suite Executives, Corporate Leadership",
      features: ["Formal presentation", "Executive styling", "Professional hierarchy", "Leadership focus"],
      popular: false
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Clean, simple design with focus on content over decoration",
      bestFor: "Experienced Professionals, Academia, Research, Technical Roles",
      features: ["Minimal styling", "Content focused", "Clean lines", "Simple layout"],
      popular: false
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional format with serif fonts and formal structure",
      bestFor: "Finance, Law, Executive Positions, Traditional Industries",
      features: ["Traditional layout", "Serif typography", "Formal structure", "Conservative design"],
      popular: false
    },
    {
      id: "technical",
      name: "Technical",
      description: "Structured layout ideal for technical and engineering roles",
      bestFor: "Software Engineering, IT, Technical Roles, Engineering",
      features: ["Technical focus", "Structured sections", "Skills emphasis", "Project highlights"],
      popular: false
    },
    {
      id: "professional",
      name: "Professional",
      description: "Two-column layout with clean lines and text-only design",
      bestFor: "Business, Consulting, Finance, Professional Services",
      features: ["Two-column design", "Text-only layout", "Professional styling", "Business focused"],
      popular: false
    },
    {
      id: "simple-ats",
      name: "Simple ATS",
      description: "ATS-friendly single-column layout with blue section headings",
      bestFor: "Job Applications, ATS Systems, Online Applications",
      features: ["ATS optimized", "Single column", "Blue headings", "Scanner friendly"],
      popular: true
    },
    {
      id: "pure-ats",
      name: "Pure ATS",
      description: "Plain text-only layout for maximum ATS compatibility",
      bestFor: "Strict ATS Requirements, Government Jobs, Large Corporations",
      features: ["Plain text only", "Maximum compatibility", "No styling", "Pure content"],
      popular: false
    },
    {
      id: "traditional",
      name: "Traditional",
      description: "Classic centered layout with gray section banners",
      bestFor: "Traditional Industries, Conservative Roles, Formal Applications",
      features: ["Centered layout", "Gray banners", "Traditional styling", "Formal presentation"],
      popular: false
    }
  ];

  const getCVData = (templateId: string) => {
    switch (templateId) {
      case 'creative': return mockCVVariants.creative;
      case 'executive': return mockCVVariants.executive;
      case 'minimalist': return mockCVVariants.minimalist;
      default: return mockCVData;
    }
  };

  const activeLayoutMeta = layouts.find(l => l.id === activeLayout)!;

  const handleSelectTemplate = (id: string) => {
    setActiveLayout(id as CVLayoutStyle);
    if (isMobile) setMobileShowPreview(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); setMobileShowPreview(false); } }}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-white">

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden md:flex flex-col h-full">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
            <DialogTitle className="text-2xl font-bold text-black">CV Template Gallery</DialogTitle>
            <p className="text-gray-600 text-sm mt-1">
              Choose from 10 professionally designed templates. Each uses the exact same rendering system as your CV editor.
            </p>
          </DialogHeader>

          <div className="flex flex-1 min-h-0">
            {/* Sidebar */}
            <div className="w-72 border-r border-gray-200 p-4 overflow-y-auto flex-shrink-0">
              <div className="space-y-2">
                {layouts.map((layout) => (
                  <motion.div
                    key={layout.id}
                    className={cn(
                      "p-3 rounded-lg border-2 cursor-pointer transition-all duration-150",
                      activeLayout === layout.id
                        ? "border-[#DAA520] bg-[#DAA520]/5 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                    onClick={() => setActiveLayout(layout.id as CVLayoutStyle)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-gray-900">{layout.name}</h3>
                      {layout.popular && (
                        <span className="text-xs bg-[#DAA520]/10 text-[#DAA520] px-1.5 py-0.5 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{layout.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Preview area */}
            <div className="flex-1 flex flex-col min-w-0 p-5 overflow-hidden">
              <div className="flex justify-between items-start mb-3 flex-shrink-0">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{activeLayoutMeta.name} Template</h3>
                  <p className="text-sm text-gray-500">{activeLayoutMeta.description}</p>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={onClose} className="border-gray-300 hover:bg-gray-100">
                    Close
                  </Button>
                  <Button size="sm" onClick={onClose} className="bg-black hover:bg-[#DAA520] text-white">
                    Use This Template
                  </Button>
                </div>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden border border-gray-200 rounded-lg">
                <CVPreview
                  cv={getCVData(activeLayout)}
                  template={activeLayout}
                  className="h-full"
                  style={{ minHeight: 'unset' }}
                />
              </div>

              <div className="mt-3 p-3 bg-gray-50 rounded-lg flex-shrink-0">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1.5">Template Features:</h4>
                    <ul className="space-y-1">
                      {activeLayoutMeta.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-xs text-gray-600">
                          <span className="w-1.5 h-1.5 bg-[#DAA520] rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1.5">Recommended For:</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{activeLayoutMeta.bestFor}</p>
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-700">ATS Compatible:</span>
                      <span className="ml-2 text-xs text-green-600 font-medium">✓ Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="flex md:hidden flex-col h-full">
          <AnimatePresence initial={false} mode="wait">
            {!mobileShowPreview ? (
              /* Template list view */
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col h-full"
              >
                <div className="px-4 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
                  <h2 className="text-lg font-bold text-gray-900">Templates</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Tap a template to preview it</p>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                  {layouts.map((layout) => (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={() => handleSelectTemplate(layout.id)}
                      className={cn(
                        "w-full text-left rounded-2xl border px-4 py-3 transition-colors",
                        activeLayout === layout.id
                          ? "border-[#DAA520] bg-[#DAA520]/5"
                          : "border-gray-200 bg-white"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900">{layout.name}</p>
                            {layout.popular && (
                              <span className="text-[10px] bg-[#DAA520]/10 text-[#DAA520] px-1.5 py-0.5 rounded-full font-medium leading-none">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {layout.description}
                          </p>
                        </div>
                        {activeLayout === layout.id && (
                          <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#DAA520] text-white">
                            <LucideCheck className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex-shrink-0 border-t border-gray-100 px-4 py-3 bg-white pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
                  <Button variant="outline" className="w-full rounded-xl" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </motion.div>
            ) : (
              /* Preview view */
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col h-full"
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setMobileShowPreview(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                  >
                    <LucideArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Previewing</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{activeLayoutMeta.name}</p>
                  </div>
                </div>

                {/* CV preview */}
                <div className="flex-1 min-h-0 overflow-hidden p-3">
                  <div className="h-full overflow-hidden rounded-xl border border-gray-200">
                    <CVPreview
                      cv={getCVData(activeLayout)}
                      template={activeLayout}
                      className="h-full border-0 shadow-none rounded-none"
                      style={{ minHeight: 'unset' }}
                    />
                  </div>
                </div>

                {/* Best for strip */}
                <div className="flex-shrink-0 px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                  <span className="font-medium text-gray-700">Best for: </span>
                  {activeLayoutMeta.bestFor}
                </div>

                {/* CTA */}
                <div className="flex-shrink-0 border-t border-gray-100 px-4 py-3 bg-white pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
                  <Button
                    className="w-full rounded-xl bg-black text-white hover:bg-[#DAA520]"
                    onClick={onClose}
                  >
                    Use This Template
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </DialogContent>
    </Dialog>
  );
}
