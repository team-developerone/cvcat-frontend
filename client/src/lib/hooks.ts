import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get stored value from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// Hook for toggling UI states
export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = () => setState(prevState => !prevState);
  return [state, toggle] as const;
}

// Hook for handling forms
export function useFormState<T extends Record<string, any>>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData(initialState);
  };
  
  return { formData, handleChange, setFormData, resetForm };
}
