
import { useEffect, useCallback } from 'react';

type KeyHandler = (e: KeyboardEvent) => void;

/**
 * Hook for binding keyboard shortcuts
 * @param keys String of keys separated by comma (e.g. "ctrl+k, cmd+k")
 * @param callback Function to execute when keys are pressed
 * @param dependencies Optional dependencies array that will trigger rebinding when changed
 */
export function useHotkeys(
  keys: string, 
  callback: KeyHandler,
  dependencies: any[] = []
) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const keyCombinations = keys.toLowerCase().split(',').map(k => k.trim());
    const key = e.key.toLowerCase();
    const ctrlKey = e.ctrlKey;
    const metaKey = e.metaKey; // cmd key on Mac
    
    const matchedCombination = keyCombinations.some(combo => {
      const parts = combo.split('+').map(p => p.trim());
      const hasModifier = parts.length > 1;
      const mainKey = parts[parts.length - 1];
      
      const ctrlRequired = hasModifier && parts.includes('ctrl');
      const metaRequired = hasModifier && parts.includes('cmd');
      
      return mainKey === key && 
             (!ctrlRequired || ctrlKey) && 
             (!metaRequired || metaKey);
    });
    
    if (matchedCombination) {
      callback(e);
    }
  }, [keys, callback]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, ...dependencies]);
}
