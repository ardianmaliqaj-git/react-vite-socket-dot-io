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

let useKeyCode = (eventType) => {

  let [code, setCode] = useState();
  let [time, setTime] = useState();

  useEffect(() => {
    let updateCode = (event) => {
      setCode(event?.code);
      setTime(event?.timeStamp);
    };
    updateCode();
    window.addEventListener(eventType ?? "keydown", updateCode);
    return () => window.removeEventListener(eventType ?? "keydown", updateCode);
  }, [eventType]);

  return [code, time];
};

export { useClientRect, useKeyCode };
