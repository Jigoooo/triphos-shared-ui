import { type CompositionEvent, useRef } from 'react';

export function useCompositionRef() {
  const isComposingRef = useRef(false);

  const handleCompositionStart = (_e: CompositionEvent<HTMLTextAreaElement>) => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (_e: CompositionEvent<HTMLTextAreaElement>) => {
    isComposingRef.current = false;
  };

  return {
    isComposingRef,
    handleCompositionStart,
    handleCompositionEnd,
  };
}
