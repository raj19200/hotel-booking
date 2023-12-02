import { useEffect, useRef } from "react";

export function useOutsideClick(close, capturingListener = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      document.addEventListener("click", handleClick, capturingListener);
      return () => {
        document.removeEventListener("click", handleClick, capturingListener);
      };
    },
    [close, capturingListener]
  );
  return ref;
}
