/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Typewriter } from "./subcomponents/Typewriter";

export const AI = ({ feedback, userInputs }) => {
  const [initialQuestion, setInitialQuestion] = useState("");
  const [responseArray, setResponseArray] = useState([]);

  // Fetch initial question and set initial state
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

  // Update response array when feedback changes
  useEffect(() => {
    if (feedback) {
      setResponseArray((prevResponses) => [...prevResponses, feedback]);
    }
  }, [feedback]);

  // Log userInputs whenever it changes
  useEffect(() => {
    console.log("AI:", userInputs);
  }, [userInputs]);

  return (
    <>
      <div className="AI-responses">
        <Typewriter text={"   " + initialQuestion} />
      </div>
      {responseArray.map((response, index) => (
        <div key={index} className="AI-responses">
          <Typewriter text={"  " + response} />
        </div>
      ))}
      {/* Map through userInputs array */}
      {userInputs.map((input, index) => (
        <div key={index} className="AI-responses">
          <Typewriter text={"  " + input} />
        </div>
      ))}
    </>
  );
};
