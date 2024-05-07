/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Typewriter } from "./subcomponents/Typewriter";

export const AI = ({ feedback, userInputs, category }) => {
  const [initialQuestion, setInitialQuestion] = useState("");
  const [combinedArray, setCombinedArray] = useState([]);
  const [initialQuestionFetched, setInitialQuestionFetched] = useState(false);

  // Fetch initial question and set initial state
  useEffect(() => {
    if (category && !initialQuestionFetched) {
      const fetchInitialQuestion = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/initial_question?category=${category}`,
            {
              withCredentials: false,
            }
          );
          setInitialQuestion(res.data.initial_question);
          setInitialQuestionFetched(true);
        } catch (error) {
          console.error("Error fetching initial question:", error);
        }
      };
      fetchInitialQuestion();
    }
  }, [category, initialQuestionFetched]);

  // Combine userInputs and responseArray
  useEffect(() => {
    if (feedback) {
      setCombinedArray((prevCombined) => [
        ...prevCombined,
        { content: userInputs[userInputs.length - 1], type: "user" }, // User input with type "user"
        { content: feedback, type: "ai" }, // AI response with type "ai"
      ]);
    }
  }, [feedback, userInputs]);

  // Log combinedArray whenever it changes
  useEffect(() => {
    console.log(combinedArray);
  }, [combinedArray]);

  // useEffect(() => {
  //   if (feedback) {
  //     setInitialQuestionFetched(false);
  //   }
  // }, [feedback]);

  return (
    <div className="container1">
      {/* Render initial question */}
      <div className="AI-responses">
        <Typewriter text={"   " + initialQuestion} />
      </div>

      {/* Render combined inputs */}
      {combinedArray.map((item, index) => (
        <div
          key={index}
          className={item.type === "user" ? "user-responses" : "AI-responses"}
        >
          {item.type === "user" ? (
            <p>{item.content}</p>
          ) : (
            <Typewriter text={"   " + item.content} />
          )}
        </div>
      ))}
    </div>
  );
};
