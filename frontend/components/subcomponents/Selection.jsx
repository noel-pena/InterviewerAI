import axios from "axios";

// eslint-disable-next-line react/prop-types
export const Selection = ({ onCategoryChange, category }) => {
  const handleCategoryChange = async (e) => {
    e.preventDefault();
    const category = e.target.value;
    onCategoryChange(category);
    console.log("Selected Category:", { category: category }); // Log the selected category
    try {
      const response = await axios.post("/api/send_question", {
        category: category,
      });
      console.log("Response1:", response.data); // Log the response from the backend
    } catch (error) {
      console.error("Error fetching initial question:", error);
    }
  };

  return (
    <>
      <select
        className="selector"
        defaultValue=""
        onChange={handleCategoryChange}
        value={category}
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
