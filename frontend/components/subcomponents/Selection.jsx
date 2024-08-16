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
          console.log("Response1:", response.data);
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
        <option label="Select a Category" value="" disabled>
          Select a category
        </option>
        <option label="General" value="General">
          General
        </option>
        <option label="JavaScript" value="JavaScript">
          JavaScript
        </option>
        <option label="SQL" value="SQL">
          SQL
        </option>
        <option label="Computer Science" value="Computer Science">
          Computer Science
        </option>
        <option label="React.js" value="React.js">
          React.js
        </option>
        <option label="Python" value="Python">
          Python
        </option>
        <option label="Java" value="Java">
          Java
        </option>
        <option label="Data Structures" value="Data Structures">
          Data Structures
        </option>
        <option label="Kotlin" value="Kotlin">
          Kotlin
        </option>
      </select>
    </>
  );
};
