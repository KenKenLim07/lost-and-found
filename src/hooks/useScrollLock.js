// hooks/useScrollLock.js
import { useEffect } from "react";

export default function useScrollLock(active = false) {
  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.dataset.scrollY = scrollY;

    return () => {
      const savedY = document.body.dataset.scrollY || "0";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(savedY));
    };
  }, [active]);
}
