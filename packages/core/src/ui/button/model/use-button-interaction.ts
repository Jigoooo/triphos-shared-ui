import { type MouseEvent, useRef, useState } from 'react';

export function useButtonInteraction({
  onClick,
  onDoubleClick,
  onMouseDown,
  onMouseLeave,
  onMouseUp,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onDoubleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isInside = (e: MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    }
    return false;
  };

  const handleDoubleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onDoubleClick) {
      onDoubleClick(e);
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPressed(true);

    if (onMouseDown) {
      onMouseDown(e);
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);

    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  const handleMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
    if (isPressed && isInside(e) && onClick) {
      onClick(e);
    }
    setIsPressed(false);

    if (onMouseUp) {
      onMouseUp(e);
    }
  };

  return {
    buttonRef,
    isPressed,
    handleDoubleClick,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
  };
}
