import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CV, ChatMessage, backendCVToFrontendCV, frontendCVToBackendData } from "./types";
import { fetchAllCVs, updateCV as apiUpdateCV, createCV as apiCreateCV } from "@/services/api";

interface CVContextType {
  mainCV: CV | null;
  setMainCV: React.Dispatch<React.SetStateAction<CV | null>>;
  tailoredCVs: CV[];
  setTailoredCVs: React.Dispatch<React.SetStateAction<CV[]>>;
  currentCV: CV | null;
  setCurrentCV: React.Dispatch<React.SetStateAction<CV | null>>;
  messages: ChatMessage[];
  addMessage: (message: string, isBot: boolean) => void;
  refreshCVs: () => Promise<void>;
  saveCV: (cv: CV) => Promise<CV>;
  savingCV: boolean;
  cvsLoading: boolean;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const [mainCV, setMainCV] = useState<CV | null>(null);
  const [tailoredCVsList, setTailoredCVs] = useState<CV[]>([]);
  const [currentCV, setCurrentCV] = useState<CV | null>(null);
  const [cvsLoading, setCvsLoading] = useState(true);
  const [savingCV, setSavingCV] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      text: "Meow! I'm your CV Assistant. How can I help you today with your resume?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const refreshCVs = useCallback(async () => {
    setCvsLoading(true);
    try {
      const res = await fetchAllCVs({ limit: 50 });
      const allCVs = res.data.map(backendCVToFrontendCV);

      const base = allCVs.find(cv => !cv.isTailored) || null;
      const tailored = allCVs.filter(cv => cv.isTailored);

      setMainCV(base);
      setTailoredCVs(tailored);
    } catch {
      // If fetch fails (e.g. no CVs yet), leave state empty
      setMainCV(null);
      setTailoredCVs([]);
    } finally {
      setCvsLoading(false);
    }
  }, []);

  const saveCV = useCallback(async (cv: CV): Promise<CV> => {
    setSavingCV(true);
    try {
      const backendData = frontendCVToBackendData(cv);
      const payload = {
        title: cv.title,
        description: cv.description,
        data: backendData,
        isDraft: false,
        cvType: cv.isTailored ? "tailored" as const : "base" as const,
      };

      // If the CV has a backend-style ID (MongoDB ObjectId), update it; otherwise create new
      const isExistingCV = cv.id && cv.id.length === 24 && /^[a-f0-9]+$/.test(cv.id);

      let savedBackendCV;
      if (isExistingCV) {
        const res = await apiUpdateCV(cv.id, payload);
        savedBackendCV = res.data;
      } else {
        const res = await apiCreateCV(payload);
        savedBackendCV = res.data;
      }

      const savedCV = backendCVToFrontendCV(savedBackendCV);

      // Update local state with the saved CV
      if (savedCV.isTailored) {
        setTailoredCVs(prev =>
          prev.some(t => t.id === savedCV.id)
            ? prev.map(t => (t.id === savedCV.id ? savedCV : t))
            : [...prev, savedCV]
        );
      } else {
        setMainCV(savedCV);
      }

      return savedCV;
    } finally {
      setSavingCV(false);
    }
  }, []);

  useEffect(() => {
    refreshCVs();
  }, [refreshCVs]);

  return (
    <CVContext.Provider
      value={{
        mainCV,
        setMainCV,
        tailoredCVs: tailoredCVsList,
        setTailoredCVs,
        currentCV,
        setCurrentCV,
        messages,
        addMessage,
        refreshCVs,
        saveCV,
        savingCV,
        cvsLoading,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
}
