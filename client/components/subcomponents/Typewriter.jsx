/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const useTypewriter = (text, speed = 15) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setTimeout(() => {}, 1000);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
      i = 0;
    };
  }, [text, speed]);
  return displayText;
};

export const Typewriter = ({ text, speed, style }) => {
  const displayText = useTypewriter(text, speed);

  return <p style={style}>{displayText}</p>;
};
