import { useState, useRef, useEffect } from "react";

let useClientRect = () => {
  let element = useRef();
  let [rect, setRect] = useState({});

  useEffect(() => {
    let updateRect = () => {
      let { top, left, right, bottom } =
        element.current.getBoundingClientRect();
      setRect(element && element.current ? { top, left, right, bottom } : {});
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  return [rect, element];
};

export default useClientRect;
