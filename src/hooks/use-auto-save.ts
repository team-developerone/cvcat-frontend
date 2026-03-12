import { useEffect, useRef, useState } from "react";

interface UseAutoSaveOptions {
  delay?: number; // Delay in milliseconds before auto-saving
  onSave: () => void; // Function to call when auto-saving
  enabled?: boolean; // Whether auto-save is enabled
}

export function useAutoSave({ delay = 1000, onSave, enabled = true }: UseAutoSaveOptions) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDirty = useRef(false);

  const triggerAutoSave = () => {
    if (!enabled) return;
    isDirty.current = true;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (isDirty.current) {
        setIsSaving(true);
        try {
          onSave();
          setLastSaved(new Date());
          isDirty.current = false;
        } finally {
          setIsSaving(false);
        }
      }
    }, delay);
  };

  const saveNow = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isDirty.current) {
      setIsSaving(true);
      try {
        onSave();
        setLastSaved(new Date());
        isDirty.current = false;
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Save any pending changes before unmount
      if (isDirty.current && enabled) {
        onSave();
      }
    };
  }, [enabled, onSave]);

  return {
    triggerAutoSave,
    saveNow,
    isSaving,
    lastSaved,
  };
}
