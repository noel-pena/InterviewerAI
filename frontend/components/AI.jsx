/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Typewriter } from "./subcomponents/Typewriter";

export const AI = ({ feedback, userInputs, category, currentQuestion }) => {
  const [initialQuestion, setInitialQuestion] = useState("");
  const [combinedArray, setCombinedArray] = useState([]);
  const [initialQuestionFetched, setInitialQuestionFetched] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (category && !initialQuestionFetched) {
      const fetchInitialQuestion = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `/api/initial_question?category=${category}`,
            {
              withCredentials: false,
            }
          );
          setInitialQuestion(res.data.current_question);
          setInitialQuestionFetched(true);
        } catch (error) {
          console.error("Error fetching initial question:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchInitialQuestion();
    }
  }, [category, initialQuestionFetched]);

  useEffect(() => {
    if (feedback && currentQuestion) {
      setCombinedArray((prevCombined) => [
        ...prevCombined,
        { content: userInputs[userInputs.length - 1], type: "user" },
        { content: feedback, type: "ai" },
        { content: currentQuestion, type: "AI-question" },
      ]);
      setTimeout(() => {
        const elements = document.querySelectorAll(".AI-question");
        elements.forEach((element) => {
          element.classList.add("show");
        });
      }, 3000);
    }
  }, [feedback, userInputs, currentQuestion]);

  useEffect(() => {
    console.log(combinedArray);
  }, [combinedArray]);

  return (
    <div className="container1">
      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="AI-responses">
          <Typewriter text={"   " + initialQuestion} />
        </div>
      )}

      {combinedArray.map((item, index) => (
        <div
          key={index}
          className={
            item.type === "user"
              ? "user-responses"
              : item.type === "ai"
              ? "AI-responses"
              : "AI-question"
          }
        >
          {item.type === "user" ? (
            <p className="textstyle">{item.content}</p>
          ) : (
            <Typewriter
              className="textstyle"
              text={"   " + item.content}
              Markdown={true}
            />
          )}
        </div>
      ))}
    </div>
  );
};
