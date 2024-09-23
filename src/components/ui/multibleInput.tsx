import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { CommunityFormData } from "../elements/community/CreateDialogContent";

const TagInput: React.FC<{
  setFormData: (data: any) => void;
  initialTags?: string[];
}> = ({ setFormData, initialTags }) => {
  const [tags, setTags] = useState<string[]>(initialTags || []);
  const [inputValue, setInputValue] = useState<string>("");

  // Handle key press when typing in the input
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tags.includes(trimmedValue)) {
        setTags([...tags, trimmedValue]);
      }
      setInputValue(""); // Clear input after adding a tag
    }
  };

  // Handle removing a tag
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Handle change in input value
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // @ts-ignore
    setFormData((prev: any) => ({ ...prev, tags }));
  }, [tags]);

  return (
    <div className="border p-4 rounded-lg w-full max-w-md">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-500 text-white rounded-full px-2 py-1"
          >
            <span className="text-sm">{tag}</span>
            <button
              onClick={() => removeTag(index)}
              className="ml-2 flex items-center justify-center bg-red-500 rounded-full w-5 h-5 text-xs text-white"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow border-none outline-none placeholder:text-gray-500 placeholder:text-sm"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter tags..."
        />
      </div>
    </div>
  );
};

export default TagInput;
