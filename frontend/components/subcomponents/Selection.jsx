/* eslint-disable react/prop-types */
import { useEffect } from "react";
import axios from "axios";

export const Selection = ({ onCategoryChange, selectedCategory }) => {
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory);
  };

  useEffect(() => {
    const fetchInitialQuestion = async () => {
      if (selectedCategory !== "") {
        console.log("Selected Category:", { category: selectedCategory });
        try {
          const response = await axios.post("/api/send_question", {
            category: selectedCategory,
          });
          console.log("Response1:", response.data); // Log the response from the backend
        } catch (error) {
          console.error("Error fetching initial question:", error);
        }
      }
    };
    fetchInitialQuestion();
  }, [selectedCategory, onCategoryChange]);

  return (
    <>
      <select
        className="selector"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <option value="" disabled>
          Select a category
        </option>
        <option value="General">General</option>
        <option value="JavaScript">JavaScript</option>
        <option value="SQL">SQL</option>
        <option value="Computer Science">Computer Science</option>
        <option value="React.js">React.js</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        <option value="Data Structures">Data Structures</option>
      </select>
    </>
  );
};
