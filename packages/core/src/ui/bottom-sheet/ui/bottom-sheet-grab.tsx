import { type DragControls } from 'framer-motion';

import {
  bottomSheetGrabContainerStyle,
  bottomSheetGrabStyle,
} from '../config/bottom-sheet-style.ts';

export function BottomSheetGrab({ dragControls }: { dragControls: DragControls }) {
  return (
    <div
      onPointerDown={(e) => {
        e.preventDefault();
        dragControls.start(e);
      }}
      style={bottomSheetGrabContainerStyle}
    >
      <div style={bottomSheetGrabStyle} />
    </div>
  );
}
