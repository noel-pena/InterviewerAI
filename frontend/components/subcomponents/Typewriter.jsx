/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const useTypewriter = (text, speed = 5) => {
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

export const Typewriter = ({ text, speed, style, Markdown }) => {
  const displayText = useTypewriter(text, speed);

  return Markdown ? (
    <ReactMarkdown style={style}>{displayText}</ReactMarkdown>
  ) : (
    <p style={style}>{displayText}</p>
  );
};
