"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import { useFinePointer } from "./ui";

const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);

export default function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const fine = useFinePointer();

  return (
    <ReadyContext.Provider value={ready}>
      {/* reducedMotion="user": si el sistema pide menos movimiento, se respetan solo los fades */}
      <MotionConfig reducedMotion="user">
        {/* En táctiles Lenis deja el scroll nativo (más fluido en móvil) */}
        <ReactLenis root options={{ lerp: 0.1, anchors: { offset: 0 }, syncTouch: false }}>
          <Preloader onDone={() => setReady(true)} />
          {fine && <Cursor />}
          <div className="grain" aria-hidden />
          {children}
        </ReactLenis>
      </MotionConfig>
    </ReadyContext.Provider>
  );
}
