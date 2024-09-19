import React, { useState } from "react";
import { X } from "react-feather";
import "./customInput.css";

function CustomInput({
  text,
  onSubmit,
  displayClass = "",
  editClass = "",
  placeholder,
  defaultValue = "",
  buttonText = "Add",
}) {
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue);

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      onSubmit(inputText);
      setInputText("");
    }
    setIsCustomInput(false);
  };

  return (
    <div className="custom-input">
      {isCustomInput ? (
        <form
          className={`custom-input-edit ${editClass}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="custom-input-edit-footer">
            <button type="submit">{buttonText}</button>
            <X onClick={() => setIsCustomInput(false)} className="close-icon" />
          </div>
        </form>
      ) : (
        <p
          className={`custom-input-display ${displayClass}`}
          onClick={() => setIsCustomInput(true)}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export default CustomInput;
