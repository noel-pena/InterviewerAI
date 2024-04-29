import { useState, useEffect } from "react";
import axios from "axios";

export const AI = () => {
  const [initialQuestion, setInitialQuestion] = useState("");

  useEffect(() => {
    const fetchInitialQuestion = async () => {
      try {
        const res = await axios.get("http://localhost:8000/initial_question", {
          withCredentials: false,
        });
        setInitialQuestion(res.data.initial_question);
      } catch (error) {
        console.error("Error fetching initial question:", error);
      }
    };
    fetchInitialQuestion();
  }, []);

  return (
    <>
      <p>{initialQuestion}</p>
    </>
  );
};
