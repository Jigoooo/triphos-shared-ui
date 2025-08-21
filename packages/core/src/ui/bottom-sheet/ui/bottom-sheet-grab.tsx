import { type DragControls } from 'framer-motion';

import {
  bottomSheetGrabContainerStyle,
  bottomSheetGrabStyle,
} from '../config/bottom-sheet-style.ts';

export function BottomSheetGrab({ dragControls }: { dragControls: DragControls }) {
  return (
    <div
      role='button'
      tabIndex={0}
      aria-label='Drag handle'
      onPointerDown={(e) => {
        e.preventDefault();
        dragControls.start(e);
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown' || e.key === 'Escape') {
          e.preventDefault();
          // Handle keyboard interaction if needed
        }
      }}
      style={bottomSheetGrabContainerStyle}
    >
      <div aria-hidden='true' style={bottomSheetGrabStyle} />
    </div>
  );
}
